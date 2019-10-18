-- pgcrypto

create extension pgcrypto;

-- pgjwt

create extension pgjwt;

-- Functions for user management via API

-- We put things inside the basic_auth schema to hide
-- them from public view. Certain public procs/views will
-- refer to helpers and tables inside.
create schema if not exists basic_auth;

-- basic user should be activated by an admin
create table if not exists
basic_auth.users (
  id       serial unique,
  realname text not null check (length(realname) < 512),
  email    text primary key check ( email ~* '^.+@.+\..+$' ),
  pass     text not null check (length(pass) < 512),
  role     name not null check (length(role) < 512),
  activated boolean default FALSE,
  password_change_needed boolean default FALSE
);

-- Functions for creating JWT tokens

create type basic_auth.jwt_token as (
  token text
);

-- ROLES


-- Anonymous access to API via web_anon role.
create role web_anon nologin;

grant usage on schema api to web_anon;

create role authenticator noinherit login password 'mysecretpassword';
grant web_anon to authenticator;

-- Non-admin roles

create role new_user noinherit;
grant usage on schema api to new_user;

create role activated_user noinherit;
grant usage on schema api to activated_user;

grant new_user, activated_user to authenticator;

-- Admin roles

create role administrator noinherit;

grant usage on schema api to administrator;
grant administrator to authenticator;

-- FUNCTIONS

create or replace function
basic_auth.check_role_exists() returns trigger as $$
begin
  if not exists (select 1 from pg_roles as r where r.rolname = new.role) then
    raise foreign_key_violation using message =
      'unknown database role: ' || new.role;
    return null;
  end if;
  return new;
end
$$ language plpgsql;

drop trigger if exists ensure_user_role_exists on basic_auth.users;
create constraint trigger ensure_user_role_exists
  after insert or update on basic_auth.users
  for each row
  execute procedure basic_auth.check_role_exists();

-- crypto

create extension if not exists pgcrypto;

create or replace function
basic_auth.encrypt_pass() returns trigger as $$
begin
  if tg_op = 'INSERT' or new.pass <> old.pass then
    new.pass = crypt(new.pass, gen_salt('bf'));
  end if;
  return new;
end
$$ language plpgsql;

drop trigger if exists encrypt_pass on basic_auth.users;
create trigger encrypt_pass
  before insert or update on basic_auth.users
  for each row
  execute procedure basic_auth.encrypt_pass();

-- helper

create or replace function
basic_auth.user_role(email text, pass text) returns name
  language plpgsql
  as $$
begin
  return (
  select role from basic_auth.users
   where users.email = user_role.email
     and users.pass = crypt(user_role.pass, users.pass)
  );
end;
$$;

-- login should be on your exposed schema
create or replace function
api.login(email text, pass text) returns basic_auth.jwt_token as $$
declare
  _role name;
  result basic_auth.jwt_token;
begin
  -- check email and password
  select basic_auth.user_role(email, pass) into _role;
  if _role is null then
    raise invalid_password using message = 'invalid user or password';
  end if;

  select sign(
      row_to_json(r), current_setting('app.jwt_secret')
    ) as token
    from (
      select _role as role, login.email as email,
         extract(epoch from now())::integer + 60*60 as exp
    ) r
    into result;
  return result;
end;
$$ language plpgsql security definer;

-- need auth admin level
create or replace function
api.create_role(new_role name) returns boolean as $$
declare 
    _role name;
    _email text;
begin
    -- check auth is admin
    select current_setting('request.jwt.claim.role') into _role;
    select current_setting('request.jwt.claim.email') into _email;
    if not _role = 'administrator' then
        raise invalid_password using message = 'not authorized';
    end if;
    execute format('create role %I inherit in role activated_user', new_role);
    execute format('grant %I to authenticator', new_role);
    return TRUE;
end;    
$$ language plpgsql security definer;

revoke all privileges on function api.create_role(new_role name) from public;
grant execute on function api.create_role(new_role name) to administrator;

-- REMEMBER TO REVOKE revoke all privileges on function create_role() from public;
-- grant execute on function create_role() to administrator;

-- needs moderator auth
create or replace function
api.activate_user(id int) returns int as $$
declare 
    given_id alias for id;
    _id int;
begin
    select users.id from basic_auth.users where users.id = given_id into _id;
    if _id is null then
        raise invalid_password using message = 'user not found';
    end if;
    update basic_auth.users set activated = TRUE where users.id = given_id;
    return given_id;
end;
$$ language plpgsql security definer;

revoke all privileges on function api.activate_user(id int) from public;
grant execute on function api.activate_user(id int) to administrator;

-- needs auth at least moderator level
create or replace function
api.grant_privileges(id int, new_role name) returns int as $$
declare
    given_id alias for id;
    _id int;
begin
    select users.id from basic_auth.users where users.id = given_id into _id;
    if _id is null then
        raise invalid_password using message = 'user not found';
    end if;
    update basic_auth.users set role = new_role where users.id = given_id;
    return given_id;
end;
$$ language plpgsql security definer; 

revoke all privileges on function api.grant_privileges(id int, new_role name) from public;
grant execute on function api.grant_privileges(id int, new_role name) to administrator;

create or replace function
api.register(usermail text, pass text, realname text) returns text as $$
declare
    _existing_user text;
    result text;
begin
    select users.email as _email from basic_auth.users where users.email = usermail into _existing_user;
    if not _existing_user is null then
        raise unique_violation using message = 'user already exists';
    end if;

    insert into basic_auth.users (realname, email, pass, role) 
    values (realname, usermail, pass, 'new_user'); 
    select users.email from basic_auth.users where users.email = usermail into result;
    return result;     
end;
$$ language plpgsql security definer;

revoke all privileges on function api.register(usermail text, pass text, realname text) from public;
grant execute on function api.register(usermail text, pass text, realname text) to administrator;

-- Initial admin user that must change his password
insert into basic_auth.users (realname, email, pass, role, activated, password_change_needed) values
('Pääkäyttäjä', 'null@dev.com', 'immediatlychangethis', 'administrator', TRUE, TRUE);