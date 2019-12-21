# PostgREST ja bäkki

## Yleistä postgRESTistä

Ohjelmiston kehityksessä on käytetty PostgREST-ohjelmistoa.  Kyseinen ohjelmisto tarjoaa helposti CRUD-rajapinnan, joka luodaan tietokannan api-scheman pohjalta.  Jokainen api-schemasta löytyvä taulu on oma REST-endpoint, jota voi kutsua esim. api.news-taulu on http://backend/news .  Riippuen käytetystä HTTP metodista voidaan suorittaa eri toimenpiteitä, jotka vastaavat SQL kyselyitä.  GET vastaa SELECTiä, POST vastaa INSERTiä, PATCH on UPDATE, DELETE on DELETE.  Nämä kaikki toiminnot luodaan automaattisesti.  

Endpointeja voidaan rajata käyttäjärooleittain GRANTilla.  Rooleille voi määrittää oikeudet vain tiettyihin metodeihin, kuten vaikka sallia GET-kutsut kaikille, mutta POST vain adminille.

Kirjautumiseen ja muuhun käyttäjiin liittyvään toimenpiteisiin on luotu SQL funktioita, jotka löytyvät omasta polustaan `/rpc/<funktio>`.  Funktioilla pääsee käsiksi myös api-skeeman ulkopuolella oleviin tietoihin, joihin sovelluksessa lukeutuvat juuri käyttäjätiedot ja roolit. 

Kehitysympäristössä backend ja tietokanta luodaan `docker-compose -f docker-compose-dev.yml up --build` -komennolla. 

Kanta ja backend luodaan Dockerfile.be ja Dockerfile.db tiedostojen perusteella.

Sovellus ei ole sinällään riippuvainen että valitun backendin pitäisi olla juuri postgREST, vaan sen voi korvata millä tahansa muulla sovelluksella, joka palauttaa oikeanlaista dataa.  

## Bäkin kamat

Backend-res -kansiosta löytyy backendin luontiin käytetyt tiedot.

### /backend-res/json

Testidataa.  Näitä ei suoraan käytetä missään, samat tiedot ovat R__Testidatan INSERTeissä.  Lähinnä ovat olemassa helpomman virheentarkistuksen vuoksi.

### /backend-res/migrations

Tietokannan migraatiot ja schemat, joiden avulla kanta muodostetaan ja joiden lopputuleman perusteella postgrest luo APIn.  Ajettu sisään flywayllä.

### /backend-res/test-binaries

Binäärimuotoista testidataa, tässä kuvia.

### /backend-res/launch-db.sh

Hoitaa alla mainitun setup-jwt.sh:n ajon ennen postgresql:n varsinaista käynnistymistä.  Tämä piti tehdä tässä järjestyksessä jostain hyvästä syystä.

### /backend-res/migrate-and-postgrest.sh

Odottaa 20 sekuntia kantaa ja sit ajaa flywayn ja postgrestin

### /backend-res/setup-jwt.sh

Ajetaan kannan luonnin yhteydessä postgrestin haluamaan paikkaan JWT tokenien luonnissa käytetty salaisuus.

### /backend-res/postgrest.conf

Ei käytetä, postgrest konffataan nykyään env-muuttujilla