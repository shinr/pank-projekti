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

-- TAGIT
insert into api.tags (name) values ('Pöytäkirja');
insert into api.tags (name) values ('Seminaaripaperi');
insert into api.tags (name) values ('Konferenssijulkaisu');

-- UUTISET
insert into api.news (headline, posted_by, content) values
  ('Lisää tiedotteita', 1, 'Nyt on hieno hiihtoreissu tulossa. Mikäli asfaltti kestää, mennään hiihtämään hiihtobussilla hiihtokeskukseen. Jos asfaltin päällysteissä on puutteita, joudutaan ne korjaamaan matkan varrella. Siksi menemme asfalttityökoneella.');
insert into api.news (headline, posted_by, content) values  
  ('Teiden suolaus aiheuttaa muutoksia', 1, 'Teitä suolataan.  Harmillisesti se tapahtui liian suolaisesti. Nyt siis teitä on suolattu liikaa joten lisätään vettä asfaltille.');
insert into api.news (headline, posted_by, content) values  
  ('Asfalttikonferenssi lähestyy', 1, E'Asfalttikonferenssi järjestetään jälleen Oulussa. Tähän hienoon tapahtumaan olemme saaneet tilat Oulun Yliopistolta, joten kokoonnumme Saalastinsalissa tällä kertaa!\nTilaisuutta varten etsitään edelleen puhujia. Mikäli sinulla on jotain uutta ja hienoa, tai miksipä ei vanhaa ja viisasta, jonka haluat jakaa kansainväliselle yleisöllemme, ole yhteydessä konferenssitoimikuntaan! Takaraja esitysten lähettämiselle on ensi kuun viidestoista. Sen jälkeen tulleet esitykset menevät suoraan käsittelemättömien pinon pohjalle.\nNähdään siellä!');


-- TAPAHTUMAT
insert into api.events (headline, content, event_date, posted_by) values
  ('Talvijuhlat', 'Talvijuhlat järjestetään Kaiku-klubilla. Kovaa teknoa luvassa.', date '2019-11-15', 1);
insert into api.events (headline, content, event_date, posted_by) values
  ('Kokous', 'Kokous internet-presensin parantamiseksi', date '2019-11-10', 1);

-- DOKUMENTIT
insert into api.documents (headline, description, posted_by, filedata, filename, tag) values
  ('Pöytäkirja 2019/11', 'Pöytäkirja tuosta jostain kokouksesta', 1, bytea_import('/testdata/cat1.jpg'), 'cat1.jpg', 1);
insert into api.documents (headline, description, posted_by, filedata, filename, tag) values
  ('Pöytäkirja 2019/10', 'Pöytäkirja tuosta jostain kokouksesta viime viikolla', 1, bytea_import('/testdata/cat2.jpg'), 'cat2.jpg', 1);
insert into api.documents (headline, description, posted_by, filedata, filename, tag) values
  ('Pöytäkirja 2019/9', 'Pöytäkirja tuosta jostain kokouksesta syyskuussa', 1, bytea_import('/testdata/cat3.jpg'), 'cat3.jpg', 1);
insert into api.documents (headline, description, posted_by, filedata, filename, tag) values
  ('Asfaltin käyttö nykyaikana', 'Miten nykyään käytetään asfalttia', 1, bytea_import('/testdata/cat1.jpg'), 'cat1.jpg', 2);
insert into api.documents (headline, description, posted_by, filedata, filename, tag) values
  ('Uudet kiinnemateriaalit', 'Ostoslista', 1, bytea_import('/testdata/cat2.jpg'), 'cat2.jpg', 2);
insert into api.documents (headline, description, posted_by, filedata, filename, tag) values
  ('Existing Expertise in Asphalt Reform', 'Osaako se projektiryhmä oikeasti mitään, vai onko kaikki sanahelinää?', 1, bytea_import('/testdata/cat3.jpg'), 'cat3.jpg', 3);
insert into api.documents (headline, description, posted_by, filedata, filename, tag) values
  ('Open Source Asphalt Development - Current Status', 'Kuvaus, miten asfaltin avoin kehitys toimii', 1, bytea_import('/testdata/cat1.jpg'), 'cat1.jpg', 3);
insert into api.documents (headline, description, posted_by, filedata, filename, tag) values
  ('Embedded Asphalt Development Environments', 'Maailman asfalttikonferenssista Hong Kongista', 1, bytea_import('/testdata/cat2.jpg'), 'cat2.jpg', 3);
insert into api.documents (headline, description, posted_by, filedata, filename, tag) values
  ('Asphalt Engineering Research - Systematic Look', 'Varsin kattava katsaus insinöörityön nykytilaan asfaltin saralla', 1, bytea_import('/testdata/cat3.jpg'), 'cat3.jpg', 3);
insert into api.documents (headline, description, posted_by, filedata, filename, tag) values
  ('Pöytäkirja 2019/8', 'Pöytäkirja tuosta jostain kokouksesta', 1, bytea_import('/testdata/cat1.jpg'), 'cat1.jpg', 1);
insert into api.documents (headline, description, posted_by, filedata, filename, tag) values
  ('Päällysteet 2099 - Palaako kaupunki soraan?', 'Tutkimuksen tehnyt K. Reeves päällysteiden tilasta vuonna 2099.', 1, bytea_import('/testdata/cat2.jpg'), 'cat2.jpg', 2);
insert into api.documents (headline, description, posted_by, filedata, filename, tag) values
  ('Temptation Asphalt 6 - Kestääkö päällyste iltanuotion?', 'Kurosen grilli vastaan asfaltti', 1, bytea_import('/testdata/cat3.jpg'), 'cat3.jpg', 2);