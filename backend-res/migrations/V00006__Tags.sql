create table api.tags (
  id serial primary key,
  name text not null
);

alter table api.documents add tag integer;

alter table api.documents add constraint tag_fk 
foreign key (tag) references api.tags(id);

grant select on api.tags to web_anon;
grant select on api.tags to administrator;