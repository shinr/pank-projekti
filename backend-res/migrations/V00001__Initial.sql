create table api.news (
  id serial primary key,
  headline text not null,
  posted timestamptz
);

insert into api.news (task) values
  ('Hallituksen kokous'), ('Tiedote tärkeästä asiasta');

create role web_anon nologin;

grant usage on schema api to web_anon;
grant select on api.news to web_anon;

create role authenticator noinherit login password 'mysecretpassword';
grant web_anon to authenticator;
