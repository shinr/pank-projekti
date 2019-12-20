# PostgREST

## Yleistä

Ohjelmiston kehityksessä on käytetty PostgREST-ohjelmistoa.  Kyseinen ohjelmisto tarjoaa helposti CRUD-rajapinnan, joka luodaan tietokannan api-scheman pohjalta.  Jokainen api-schemasta löytyvä taulu on oma REST-endpoint, jota voi kutsua esim. api.news-taulu on http://backend/news .  Riippuen käytetystä HTTP metodista voidaan suorittaa eri toimenpiteitä, jotka vastaavat SQL kyselyitä.  GET vastaa SELECTiä, POST vastaa INSERTiä, PATCH on UPDATE, DELETE on DELETE.  Nämä kaikki toiminnot luodaan automaattisesti.  

Endpointeja voidaan rajata käyttäjärooleittain GRANTilla.  Rooleille voi määrittää oikeudet vain tiettyihin metodeihin, kuten vaikka sallia GET-kutsut kaikille, mutta POST vain adminille.  

Kehitysympäristössä backend ja tietokanta luodaan `docker-compose -f docker-compose-dev.yml up --build` -komennolla. 

Tietoka

## 

Backend-res -kansiosta löytyy backendin luontiin käytetyt tiedot.