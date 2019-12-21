# ReactJS ja Frontend

## Kirjastot

* react
* react-router - sovelluksen reititys
* file-saver - tiedostojen lataamisen toteutus js:llä
* react-calendar - kalenterikomponentti
* react-markdown - markdownin renderöinti
* react-mde - markdown editori
* latoja - staattisen sisällön formatointi
  
## Sovelluksen arkkitehtuuri

Sovelluksen arkkitehtuurista

### Tilanhallinta

`/src/state/` -kansio.

Tilanhallinta on toteutettu Reactin Hookseilla ja Context APIlla.  Käytössä on kaksi tilaa, User ja App.  Providerit määritellään sovelluksen juuressa.  User-tilan käyttötarkoitus on hallita käyttäjän tilaa, App-statessa sovelluksen (esim. onko fetchaus käynnissä, pitäisikö refreshata jokin sisältö), mutta App-state sisältää myös kaiken staattisen sisällön, joka noudetaan asynkronisesti bäkiltä.  

Tilaa pääsee käyttämään kutsumalla esim useApp/UserStateValue, josta palautuu 2-elementtinen Array `[ state: Object, dispatch: Fn ]`. State-objektissa on sen hetkinen tila ja dispatchilla lähetetään tilaa muokkaavia actioneita, jotka prosessoidaan kummankin tilan omalla reducerilla.  Reducerista sitten palautetaan ulos uusi tila.  Reduxin käyttäjille tuttua.  Actionit ovat olleet muotoa `{ type: string, payload: object }`, jossa type määrittää mitä tehdään ja payload on uutta tietoa, mutta tämä ei ole mikään kiveenhakattu totuus.

### API-kutsut

`/src/services/api.js`

API-kutsut sijaitsevat täällä. Moduulissa kutsuputki jossa post ja get-metodeille omat funktiot. Moduulista on exportattu sitten eri tilanteissa käytettäviä apufunktioita, esim. getEvents()

### Visuaaliset komponentit

Jaettu kolmeen kansioon: `/src/ui, /src/views, /src/components`

Jako lähinnä merkittävyyden mukaan. Components-kansiossa pienimmät komponentit, kuten napit yms elementit, jotka ovat selkeästi yksittäisiä. UI sisältää isompia kokonaisuuksia, esim erilaiset lomakkeet.  Views yleisnäkymiä, kuten yläsivut Tietopankki, Ajankohtaista, jne.

Muutamia huomionarvoisia komponentteja

#### Templater.js /src/components/templater

Sisältää templaten ja komponentit, joiden avulla luodaan latojalla staattisia sivuja.  Latojan idea on ottaa json-muotoista dataa ja renderöidä se käyttäen custom-komponentteja.  Latojan sisällä annetaan Template-komponentti, joka kutsuu latojan useComponents ja useTemplate-hookkeja.  useComponentsille annetaan objekteja, joissa on `{ component: Component, type: String }` joissa component on react -komponentti ja type mielellään uniikki id.

useTemplatelle annetaan json, josta mallia löytyy backend-res/json -kansiosta.  Näitä json-tiedostoja ei käytetä muuten mihinkään, ovat vain mallina.  Käytännössä formaatti on Array, jossa on objekteja.  Objektit määrittelevät komponentit, ja niillä voi olla propsit joita käytetään renderöinnissä, sekä lapsia.  Muoto on `{ <komponentin type, sama kuin useComponentsin objektin type>: { props: { ...propsit tyyliin, label: "Label" }, children: [ ...array saman formaatin objekteja ] } }` links.json ja strategy.json selventänevät miten tämä on tehty.  Tämä hyödyntää bäkin puolella postgreSQLn json-formaattia.  Tarvittaessa, jos toteutettu malli on liian vaikea tai kömpelö, kannattaa ehkä toteuttaa erillä tavalla, kun tuo latoja on aika lailla kehityksen alla vielä.

#### Tabs.js /src/ui/tabs

Tabitusjärjestelmä, joka tekee näppärästi tabitettuja sivuja.  Ei sinällään mitenkään erityisen huikea, mut toimi sen verta kivasti et tuli hyvä mieli.

#### Downloader.js /src/ui/tabs

Spesiaaliview, joka hoitaa tiedostojen downloadauksen.  Oma route.  Mahdollista linkittää, urlissa annetaan tiedoston id ja base64-koodattu tiedostonimi.  Käyttää filesaveria itse latausikkunan muodostamiseen.  Tää koko homma on vähän kikkakolmonen, kun bytea-datan lataaminen postgrest rajapinnasta haluaa custom headerin, mutta toimiva sellainen.

#### DocumentBrowser.js /src/ui/documents/DocumentBrowser.js

Ei mitenkään erityisen ihmeellinen, mutta hyvä tiedostaa nuo filtteröinnit.  Propsina voi antaa useTag, jolle annetaan tagin id.  Jos näin on tehty, ekana documents-listasta filtteröidään eka sen id:n perusteella.  Tätä ei voi muuttaa.  Sitten on tägifiltteri ja freetext-filtteri.  Filtterit itse on määritelty `/src/utils/filters.js`

## Muuta

### Nginx

Ohjelmistoa kehittäessä käytettiin testiympäristössä nginxää Azuressa reverse proxynä portissa 80.  Käytetyt konffit ovat /nginx -kansiossa.  Multi-container sovelluksessa Azure exposaa App Servicessä oletuksena portissa 80 majailevan containerin, mutta ei muita, jonka takia bäkkiin menevät kutsut piti proxata frontin kautta.  Tehtiin siis, että /api -polkua fronttipalvelimella kutsuttaessa kutsut välitetään bäkille ja samalla pathista siivotaa pois tuo /api -osa eli `http://frontend/api/news -> http://backend/news` 

Ohjelmisto ei kuitenkaan ole riippuvainen nginx:stä mitenkään, vaan se toimii mainiosti myös ilman sitä.
