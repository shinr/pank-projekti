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
insert into api.documents (headline, description, posted_by, filedata, filename, tags) values
  ('Pöytäkirja 2019/11', 'Pöytäkirja tuosta jostain kokouksesta', 1, bytea_import('/testdata/cat1.jpg'), 'cat1.jpg', '{3}');
insert into api.documents (headline, description, posted_by, filedata, filename, tags) values
  ('Pöytäkirja 2019/10', 'Pöytäkirja tuosta jostain kokouksesta viime viikolla', 1, bytea_import('/testdata/cat2.jpg'), 'cat2.jpg', '{2, 1, 3}');
insert into api.documents (headline, description, posted_by, filedata, filename, tags) values
  ('Pöytäkirja 2019/9', 'Pöytäkirja tuosta jostain kokouksesta syyskuussa', 1, bytea_import('/testdata/cat3.jpg'), 'cat3.jpg', '{2, 1}');
insert into api.documents (headline, description, posted_by, filedata, filename, tags) values
  ('Asfaltin käyttö nykyaikana', 'Miten nykyään käytetään asfalttia', 1, bytea_import('/testdata/cat1.jpg'), 'cat1.jpg', '{1}');
insert into api.documents (headline, description, posted_by, filedata, filename, tags) values
  ('Uudet kiinnemateriaalit', 'Ostoslista', 1, bytea_import('/testdata/cat2.jpg'), 'cat2.jpg', '{1}');
insert into api.documents (headline, description, posted_by, filedata, filename, tags) values
  ('Existing Expertise in Asphalt Reform', 'Osaako se projektiryhmä oikeasti mitään, vai onko kaikki sanahelinää?', 1, bytea_import('/testdata/cat3.jpg'), 'cat3.jpg', '{2, 1}');
insert into api.documents (headline, description, posted_by, filedata, filename, tags) values
  ('Open Source Asphalt Development - Current Status', 'Kuvaus, miten asfaltin avoin kehitys toimii', 1, bytea_import('/testdata/cat1.jpg'), 'cat1.jpg', '{1, 3}');
insert into api.documents (headline, description, posted_by, filedata, filename, tags) values
  ('Embedded Asphalt Development Environments', 'Maailman asfalttikonferenssista Hong Kongista', 1, bytea_import('/testdata/cat2.jpg'), 'cat2.jpg', '{2}');
insert into api.documents (headline, description, posted_by, filedata, filename, tags) values
  ('Asphalt Engineering Research - Systematic Look', 'Varsin kattava katsaus insinöörityön nykytilaan asfaltin saralla', 1, bytea_import('/testdata/cat3.jpg'), 'cat3.jpg', '{3}');
insert into api.documents (headline, description, posted_by, filedata, filename, tags) values
  ('Pöytäkirja 2019/8', 'Pöytäkirja tuosta jostain kokouksesta', 1, bytea_import('/testdata/cat1.jpg'), 'cat1.jpg', '{2, 3}');
insert into api.documents (headline, description, posted_by, filedata, filename, tags) values
  ('Päällysteet 2099 - Palaako kaupunki soraan?', 'Tutkimuksen tehnyt K. Reeves päällysteiden tilasta vuonna 2099.', 1, bytea_import('/testdata/cat2.jpg'), 'cat2.jpg', '{2, 1}');
insert into api.documents (headline, description, posted_by, filedata, filename, tags) values
  ('Temptation Asphalt 6 - Kestääkö päällyste iltanuotion?', 'Kurosen grilli vastaan asfaltti', 1, bytea_import('/testdata/cat3.jpg'), 'cat3.jpg', '{2, 1}');


-- PAGES
insert into api.pages (name, data) values ('members', '[
    {
        "template_section": {
            "children": [
                {
                    "template_title": {
                        "props": {
                            "content": "Jäsenyritykset"
                        }
                    }
                },
                {
                    "template_member": {
                        "props": {
                            "url": "http://www.oulu.fi/yliopisto",
                            "name": "Oulun yliopisto"
                        }
                    }
                },
                {
                    "template_member": {
                        "props": {
                            "url": "http://www.aalto.fi",
                            "name": "Aalto-yliopisto"
                        }
                    }
                },
                {
                    "template_member": {
                        "props": {
                            "url": "http://www.infrary.fi",
                            "name": "INFRA ry"
                        }
                    }
                },
                {
                    "template_member": {
                        "props": {
                            "url": "http://www.finavia.fi",
                            "name": "Finavia Oy"
                        }
                    }
                }
            ]
        }
    }
]');
insert into api.pages (name, data) values ('links', '[
    {
        "template_section": {
            "children": [
                {
                    "template_title": {
                        "props": {
                            "content": "Linkkejä alan järjestöihin"
                        }
                    }
                }, {
                    "template_link": {
                        "props": {
                            "url": "http://www.eurobitume.eu",
                            "label": "Eurobitume, the European Bitumen Association"
                        }
                    }
                }, {
                    "template_link": {
                        "props": {
                            "url": "http://www.infrary.fi",
                            "label": "INFRA ry"
                        }
                    }
                }, {
                    "template_link": {
                        "props": {
                            "url": "http://www.eapa.org",
                            "label": "European Asphalt Pavement Association"
                        }
                    }
                }, {
                    "template_link": {
                        "props": {
                            "url": "http://www.ptl.fi",
                            "label": "Pohjoismaiden tie- ja liikennefoorumi"
                        }
                    }
                }
            ]
        }
    }
]');
insert into api.pages (name, data) values ('strategy_and_mission', '[
    {
        "template_section": {
            "children": [
                {
                    "template_title": {
                        "props": {
                            "content": "Missio"
                        }
                    }
                },
                {
                    "template_paragraph": {
                        "props": {
                            "content": "Päällystealan tehtävänä on kehittää ja toteuttaa toimenpiteitä, joiden avulla asfalttipäällysteitä ja muita liikenneväylien pinnoitteita rakennetaan ja ylläpidetään yhteiskunnallisesti mahdollisimman tehokkaasti ja taloudellisesti ottaen huomioon kuljetusten ja henkilöliikenteen asettamat vaatimukset ja ekologiset tarpeet."
                        }
                    }
                }
            ]
        }
    },
    {
        "template_section": {
            "children": [
                {
                    "template_title": {
                        "props": {
                            "content": "Visio"
                        }
                    }
                },
                {
                    "template_subtitle": {
                        "props": {
                            "content": "Päällystealalla on käytössä"
                        }
                    }
                },
                {
                    "template_bulletlist": {
                        "props": {
                            "content": [
                                "käyttäjälähtöiset palvelutasot",
                                "älykkäät, taloudelliset ja ekologiset",
                                "ratkaisut (tuotteet)",
                                "toimintatavat",
                                "suunnittelumenetelmät ja prosessit"
                            ]
                        }
                    }
                },
                {
                    "template_subtitle": {
                        "props": {
                            "content": "Visio tarkoittaa, että"
                        }
                    }
                },
                {
                    "template_bulletlist": {
                        "props": {
                            "content": [
                                "päällystealan markkinat toimivat yhteiskunnan ja ympäristön kannalta kokonaisvaltaisilla periaatteilla ja tuotteilla",
                                "päällyste on arvostettu, ympäristömyönteinen tuote, joka käyttökohteessaan vastaa sekä käyttäjän odotuksia että tarpeita",
                                "päällystealalla on positiivinen imago; se on houkutteleva ja arvostettu ala, jonne hakeutuu riittävästi kehityskykyisiä ihmisiä ja jossa on kiinnostavaa ja turvallista työskennellä",
                                "suomalaiset päällysteet ovat huippuluokkaa sekä palvelutasoltaan että teknisiltä ratkaisuiltaan",
                                "hankintamenettelyt ovat kokonaistaloudellisesti edullisia"
                            ]
                        }
                    }
                }
            ]
        }
    },
    {
        "template_section": {
            "children": [
                {
                    "template_title": {
                        "props": {
                            "content": "Nykytila"
                        }
                    }
                },
                {
                    "template_subtitle": {
                        "props": {
                            "content": "Päällystealan vahvuutena on"
                        }
                    }
                },
                {
                    "template_bulletlist": {
                        "props": {
                            "content": [
                                "hyvä ammattitaito",
                                "korkeatasoiset materiaalit ja niiden kierrätettävyys",
                                "hyvä toiminnan tehokkuus ja kilpailukyky sekä kalusto"
                            ]
                        }
                    }
                },
                {
                    "template_subtitle": {
                        "props": {
                            "content": "Päällystealan heikkoutena"
                        }
                    }
                },
                {
                    "template_bulletlist": {
                        "props": {
                            "content": [
                                "ammattitaidon ylläpitäminen",
                                "vanhoillinen urakointikulttuuri",
                                "ratkaisujen suunnittelun yksipuolisuus ja toiminnallisten ratkaisujen puute",
                                "T&K-toiminnan jatkuva heikkeneminen",
                                "yhteydenpito viranomaisiin ja julkisiin päätöksentekijöihin",
                                "imago ja markkinointi"
                            ]
                        }
                    }
                },
                {
                    "template_subtitle": {
                        "props": {
                            "content": "Päällysteala kokee uhkina"
                        }
                    }
                },
                {
                    "template_bulletlist": {
                        "props": {
                            "content": [
                                "työmäärien vähenemisen",
                                "ympäristöviranomaisten yksipuolisen toiminnan"
                            ]
                        }
                    }
                }
            ]
        }
    },
    {
        "template_section": {
            "children": [
                {
                    "template_title": {
                        "props": {
                            "content": "Strategiset päämäärät ja menestystekijät"
                        }
                    }
                },
                {
                    "template_subtitle": {
                        "props": {
                            "content": "Strategiset päämäärät:"
                        }
                    }
                },
                {
                    "template_bulletlist": {
                        "props": {
                            "content": [
                                "tehdä päällystealasta houkutteleva ja arvostettu",
                                "tehdä päällysteestä yhteiskunnan odotuksia ja tarpeita vastaava tuote",
                                "toiminta on kannattavaa ja on T&K-toiminta on jatkuvaa",
                                "kestävän kehityksen periaatteiden monipuolinen noudattaminen"
                            ]
                        }
                    }
                },
                {
                    "template_subtitle": {
                        "props": {
                            "content": "Kriittiset menestystekijät:"
                        }
                    }
                },
                {
                    "template_bulletlist": {
                        "props": {
                            "content": [
                                "alan markkinoiden kokonaisvaltainen toimintatapa",
                                "työvoiman saanti ja korkeatasoinen osaaminen",
                                "asiakaslähtöiset ja esteettiset kokonaisratkaisut",
                                "yhteistyö eri osapuolten kesken",
                                "kansainvälinen kilpailukyky"
                            ]
                        }
                    }
                }
            ]
        }
    },
    {
        "template_section": {
            "children": [
                {
                    "template_title": {
                        "props": {
                            "content": "Strategiset toimenpiteet"
                        }
                    }
                },
                {
                    "template_table": {
                        "props": {
                            "labels": [
                                "Näkökulma",
                                "Tavoitteet",
                                "Toimenpiteet",
                                "Vastuutaho"
                            ],
                            "rows": [
                                [
                                    {
                                        "content": "Imago"
                                    },
                                    {
                                        "content": "Päällysteala on houkutteleva ja arvostettu ala"
                                    },
                                    {
                                        "content": [
                                            "Kehitetään alan koulutusjärjestelmiä alalla toimivien tarpeista lähtien",
                                            "luodaan toimintatavat, joilla mahdollistetaan alalla olevien suunnitelmallinen urakehitys",
                                            "kehitetään toimenpiteitä, joilla vaikutetaan positiivisesti työntekijöiden työympäristön terveyteen ja turvallisuuteen sekä kausiluontoisuuteen"
                                        ]
                                    },
                                    {
                                        "content": [
                                            "PANK",
                                            "Jäsenet"
                                        ]
                                    }
                                ],
                                [
                                    {
                                        "content": "Kestävä kehitys"
                                    },
                                    {
                                        "content": "Päällyste on arvostettu ja ympäristömyönteinen tuote"
                                    },
                                    {
                                        "content": [
                                            "Kehitetään uusia tuotteita ja sovelluksia asiakkaiden muuttuviin tarpeisiin",
                                            "Kehitetään päällysteiden uusiokäyttöä",
                                            "kehitetään teollisuuden sivutuotteiden hyötykäyttöä päällysteissä",
                                            "kehitetään energiaa ja ympäristöä säästäviä tuotantoprosesseja",
                                            "tuotetaan alalta ympäristöön liittyvää taustamateriaalia ympäristöviranomaisia ja muita sidosryhmiä varten"
                                        ]
                                    },
                                    {
                                        "content": [
                                            "Urakoitsijat",
                                            "PANK"
                                        ]
                                    }
                                ],
                                [
                                    {
                                        "content": "Laatutaso"
                                    },
                                    {
                                        "content": "Suomalaiset päällysteet ovat kansainvälistä huippuluokka. Jokaiseen käyttötarkoitukseen on tarjolla soveltuvat laatutuotteet"
                                    },
                                    {
                                        "content": [
                                            "panostetaan laatutietoiseen toimintaan sekä laadun ja palvelutason kehittämiseen",
                                            "ylläpidetään alan kansainvälistä yhteistyötä sekä harjoitetaan teknologian siirtoa Suomeen",
                                            "laaditaan ja käynnistetään alan T&K-ohjelma"
                                        ]
                                    },
                                    {
                                        "content": [
                                            "Tilaajat",
                                            "PANK",
                                            "Urakoitsijat",
                                            "yhdessä rahoittajien kanssa"
                                        ]
                                    }
                                ],
                                [
                                    {
                                        "content": "Prosessit"
                                    },
                                    {
                                        "content": "Toiminta on yhteiskunnallisesti ja yritystaloudellisesti kannattavaa"
                                    },
                                    {
                                        "content": [
                                            "Kehitetään hankintamenettelyjä kokonaistaloudellisesti edullisimmalla ja kehitystoimintaan kannustavalla tavalla",
                                            "kehitetään yhteistyössä viranomaisten ja muiden osapuolten kanssa menettelytapoja, joilla eliminoidaan harmaan talouden toimijat markkinoilta"
                                        ]
                                    },
                                    {
                                        "content": [
                                            "Tilaajat",
                                            "Urakoitsija ja tilaajat"
                                        ]
                                    }
                                ]
                            ]
                        }
                    }
                }
            ]
        }
    }
]')