# PANK-projekti

## Stack

Ohjelmisto on kehitetty seuraavilla työkaluilla

### Frontend

* react [https://www.reactjs.org]
    * create-react-app [https://github.com/facebook/create-react-app]
* react-router [https://reacttraining.com/react-router/]
* react-fontawesome [https://github.com/FortAwesome/react-fontawesome]
* react-markdown [https://github.com/rexxars/react-markdown]
* filesaver [https://www.npmjs.com/package/file-saver]

### Backend

* postgREST v5 [http://www.postgrest.org]
* postgreSQL 11 [https://www.postgresql.org]

### Muuta

* nginx [https://www.nginx.com]
* flyway [https://flywaydb.org]
* docker [https://www.docker.com]

Frontendiä on kehitysympäristössä ajettu suoraan npm:n työkaluilla ja testausympäristössä nginxin päällä docker-kontissa. Nginx-palvelin on toiminut reverse proxynä backendiin.

Backendiä on ajettu docker-konteissa, joista tietokanta on ollut omassaan ja postgrest omassaan. Migraatiot ajetaan postgrest-kontin käynnistyksen yhteydessä flywayllä.

PostgReST luo postgresql db:n schemasta REST-rajapinnan. Tietenkään varsinaisessa ympäristössä ei ole pakko käyttää esimerkiksi postgrestiä, vaan backendin voi tarvittaessa implementoida halutulla tavalla, käyttäen vapaasti valittavaa backend-teknologiaa. Tällöin vain pitää muokata api.js -tiedoston rajapintafunktiot.

## Devaus

Devataan omissa brancheissa ja kamat viedään pull requestin kautta masteriin Githubissa. Eli siis git pull uusin versio masterista, luodaan oma branch, tehdään muutokset, haetaan vielä varalle uusin master ja rebasetetaan oma branchi sen päälle. Sitten pushataan kamppeet remoteen ja tehdään pull request. Pullarin yhteydessä pyörähtää testit ja kunhan ne menevät läpi, voidaan mergettää. Mergestä sitten pyörähtää läpi deployment, joka ajaa uusimmat muutokset sitten Azuren testiympäristöön.

Frontendin koodaustyyli on pyritty pitämään mahdollisimman funktionaalisena, luokkakomponentteja yms on vältetty mahdollisimman paljon.

## API

Seuraavat rajapinnat on tarjolla muodossa `/rpc/<api>` ja toimivat POST-sanomilla.

### Anonyymit

#### /login
`{email: string, pass: string}`
Kirjaa käyttäjän

### Authin vaativat

#### /register
`{email: string, pass: string, realname: string}`
Luo uuden käyttäjän annetuilla tiedoilla

#### /create_role
`{new_role: string}`
Luo käyttäjätason roolin ilman oikeuksia

#### /activate_user
`{id: integer}`
Aktivoi käyttäjän

#### /grant_privileges
`{id: integer, new_role: string}`
Antaa käyttäjälle <id> roolin <new_role>, jos sellainen on olemassa

#### /change_password
`not implemented`

### Sisältö

Seuraavat rajapinnat sisällön hakemiseen, GET-kutsut toimivat anonyymisti, muut kutsut vaativat autentikoinnin JWT-tokeneilla. Muodossa `/api/<api>` ja toimivat GET/POST-sanomilla. GET hakuun ja POST uuden sisällön luomiseen. Myös muut toiminnot ovat mahdollisia, lisätietoa queryjen tekemiseen löytyy (PostgRESTin nettisivuilta)[http://www.postgrest.org] 
`/documents`
Tietopankin tiedostot ja dokumentit

`/tags` 
Tietopankin tagit

`/pages`
Staattisien sivujen datamuotoiset templatet

`/events`
Tapahtumat

`/news`
Uutiset

## Ympäristöt

Testiympäristöä on ajettu Azuressa. Azuren konfiguraatiotiedostoja ei tässä repossa ole, koska ne sisältävät salaisuuksia. Tarvittaessa niitä voi toki kysellä. Palvelun pykääminen muualle onnistuu kyllä, mutta vaatinee duunia.

## FE komentoja

### `npm start`

Ajaa frontin paikallisessa kehitysympäristössä hot reloadin kanssa.

### `npm test`

Testit

### `npm run build`

Buildaa projektin ja muodostaa tarvittavat staattiset resurssit, jotta frontendia voidaan ajaa halutulla palvelimella.
