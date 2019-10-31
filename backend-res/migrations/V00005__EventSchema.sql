create table api.events (
  id serial primary key,
  event_date timestamptz not null, 
  headline text not null,
  content text,
  location text,
  ics bytea,
  posted_by integer references basic_auth.users(id),
  posted_date timestamptz default now()
);

alter table api.documents add constraint posted_by_fk 
foreign key (posted_by) references basic_auth.users(id);

alter table api.news add constraint posted_by_fk 
foreign key (posted_by) references basic_auth.users(id);

grant select on api.documents to web_anon;
grant select on api.events to web_anon;
grant select on api.news to administrator;
grant select on api.documents to administrator;
grant select on api.events to administrator;

create type basic_auth.user_info as (
  realname text,
  email text
);

-- login should be on your exposed schema
create or replace function
api.user_info(id integer) returns basic_auth.user_info as $$
declare
  result basic_auth.user_info;
begin
  select realname, email from basic_auth.users where users.id = user_info.id into result;
  return result;
end;
$$ language plpgsql security definer;

alter table api.documents alter column posted set default now();
alter table api.documents add filename text not null;