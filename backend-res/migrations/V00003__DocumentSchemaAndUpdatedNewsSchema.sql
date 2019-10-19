create table api.documents (
  id serial primary key,
  headline text not null,
  description text,
  posted timestamptz,
  posted_by integer,
  filedata bytea not null
);

alter table api.news add column content text; 
alter table api.news add column posted_by integer;
alter table api.news alter column posted set default now();