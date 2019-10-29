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
      select _role as role, login.email as email, ba.realname as realname, ba.activated as activated, ba.password_change_needed as password_change_needed,
         extract(epoch from now())::integer + 60*60 as exp from basic_auth.users as ba where ba.email = login.email
    ) r
    into result;
  return result;
end;
$$ language plpgsql security definer;