-- testidatan importtausfunkkari

create or replace function bytea_import(p_path text, p_result out bytea)
language plpgsql as $$
declare
  l_oid oid;
begin
  select lo_import(p_path) into l_oid;
  select lo_get(l_oid) into p_result;
  perform lo_unlink(l_oid);
end;$$;

-- UUTISET
insert into api.news (headline, posted_by, content) values
  ('Lisää tiedotteita', 1, 'Nyt on hieno hiihtoreissu tulossa. Mikäli asfaltti kestää, mennään hiihtämään hiihtobussilla hiihtokeskukseen. Jos asfaltin päällysteissä on puutteita, joudutaan ne korjaamaan matkan varrella. Siksi menemme asfalttityökoneella.'), ('Teiden suolaus aiheuttaa muutoksia', 1, 'Teitä suolataan.  Harmillisesti se tapahtui liian suolaisesti. Nyt siis teitä on suolattu liikaa joten lisätään vettä asfaltille.');


-- TAPAHTUMAT
insert into api.events (headline, content, event_date, posted_by) values
  ('Talvijuhlat', 'Talvijuhlat järjestetään Kaiku-klubilla. Kovaa teknoa luvassa.', date '2019-11-15', 1);
insert into api.events (headline, content, event_date, posted_by) values
  ('Kokous', 'Kokous internet-presensin parantamiseksi', date '2019-11-10', 1);

-- DOKUMENTIT
insert into api.documents (headline, description, posted_by, filedata, filename) values
  ('Pöytäkirja 1', 'Pöytäkirja tuosta jostain kokouksesta', 1, bytea_import('/testdata/cat1.jpg'), 'cat1.jpg');
insert into api.documents (headline, description, posted_by, filedata, filename) values
  ('Pöytäkirja 2', 'Pöytäkirja tuosta jostain kokouksesta viime viikolla', 1, bytea_import('/testdata/cat2.jpg'), 'cat2.jpg');
insert into api.documents (headline, description, posted_by, filedata, filename) values
  ('Pöytäkirja 3', 'Pöytäkirja tuosta jostain kokouksesta syyskuussa', 1, bytea_import('/testdata/cat3.jpg'), 'cat3.jpg');