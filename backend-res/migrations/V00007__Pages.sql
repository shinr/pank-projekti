-- pages are in jsonb which should make using them fairly trivial hopefully

create table api.pages (
    id serial primary key,
    name text unique,
    data jsonb
);

grant select on api.pages to web_anon;
grant select on api.pages to administrator;