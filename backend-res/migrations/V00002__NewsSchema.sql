create table api.news (
  id serial primary key,
  headline text not null,
  posted timestamptz
);

grant select on api.news to web_anon;