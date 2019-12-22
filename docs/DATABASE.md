# Tietokanta

Käytetty tietokanta on PostgreSQL 11.  Apuna on käytetty pg_crypto ja pg_jwt-laajennuksia, joilla autentikaatio on tehty.

## Tietomallit

Tietokannan tietomalli on postgREST backendin haluamassa muodossa.  Tietokannassa on api-skeema ja basic_auth-skeema.  Ensimmäisessä on julkiset tiedot ja toisessa käyttäjätiedot.

### api.news

```
  Column   |           Type           | Nullable |               Default                
-----------+--------------------------+----------+--------------------------------------
 id        | integer                  | not null | nextval('api.news_id_seq'::regclass)  
 headline  | text                     | not null |                                       
 posted    | timestamp with time zone |          | now()                                 
 content   | text                     |          |                                       
 posted_by | integer                  |          |                                       
```

### api.documents

```
   Column    |           Type           | Nullable |                  Default                  
-------------+--------------------------+----------+-------------------------------------------
 id          | integer                  | not null | nextval('api.documents_id_seq'::regclass) 
 headline    | text                     | not null |                                           
 description | text                     |          |                                           
 posted      | timestamp with time zone |          | now()                                     
 posted_by   | integer                  |          |                                           
 filedata    | bytea                    | not null |                                           
 filename    | text                     | not null |                                           
 tag         | integer                  |          |                                           
 category    | text                     |          |                                           
 tags        | integer[]                |          |                                           
```

### api.pages

```
 Column |  Type   | Nullable |                Default                
--------+---------+----------+---------------------------------------
 id     | integer | not null | nextval('api.pages_id_seq'::regclass) 
 name   | text    |          |                                       
 data   | jsonb   |          |                                       
```

### api.tags

```
 Column |  Type   | Nullable |               Default                
--------+---------+----------+--------------------------------------
 id     | integer | not null | nextval('api.tags_id_seq'::regclass) 
 name   | text    | not null |                                      
```

### api.events

```
   Column    |           Type           | Nullable |                Default                 
-------------+--------------------------+----------+----------------------------------------
 id          | integer                  | not null | nextval('api.events_id_seq'::regclass) 
 event_date  | timestamp with time zone | not null |                                        
 headline    | text                     | not null |                                        
 content     | text                     |          |                                        
 location    | text                     |          |                                        
 ics         | bytea                    |          |                                        
 posted_by   | integer                  |          |                                        
 posted_date | timestamp with time zone |          | now()                                  
 ```