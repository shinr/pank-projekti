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

Tilaa pääsee käyttämään kutsumalla esim useApp/UserStateValue, josta palautuu 2-elementtinen Array [ state: Object, dispatch: Fn ]. State-objektissa on sen hetkinen tila ja dispatchilla lähetetään tilaa muokkaavia actioneita, jotka prosessoidaan kummankin tilan omalla reducerilla.  Reducerista sitten palautetaan ulos uusi tila.  Reduxin käyttäjille tuttua.  Actionit ovat olleet muotoa { type: string, payload: object }, jossa type määrittää mitä tehdään ja payload on uutta tietoa, mutta tämä ei ole mikään kiveenhakattu totuus.

### API-kutsut

`/src/services/api.js`

API-kutsut sijaitsevat täällä. Moduulissa kutsuputki jossa post ja get-metodeille omat funktiot. Moduulista on exportattu sitten eri tilanteissa käytettäviä apufunktioita, esim. getEvents()

### Visuaaliset komponentit

Jaettu kolmeen kansioon: `/src/ui, /src/views, /src/components`

Jako lähinnä merkittävyyden mukaan. Components-kansiossa pienimmät komponentit, kuten napit yms elementit, jotka ovat selkeästi yksittäisiä. UI sisältää isompia kokonaisuuksia, esim erilaiset lomakkeet.  Views yleisnäkymiä, kuten yläsivut Tietopankki, Ajankohtaista, jne.

Muutamia huomionarvoisia komponentteja

#### Templater.js /src/components/templater

## Muuta

### Nginx

Ohjelmistoa kehittäessä käytettiin testiympäristössä nginxää Azuressa reverse proxynä portissa 80.  Käytetyt konffit ovat /nginx -kansiossa.  Multi-container sovelluksessa Azure exposaa App Servicessä oletuksena portissa 80 majailevan containerin, mutta ei muita, jonka takia bäkkiin menevät kutsut piti proxata frontin kautta.  Tehtiin siis, että /api -polkua fronttipalvelimella kutsuttaessa kutsut välitetään bäkille ja samalla pathista siivotaa pois tuo /api -osa eli http://frontend/api/news -> http://backend/news 

Ohjelmisto ei kuitenkaan ole riippuvainen nginx:stä mitenkään, vaan se toimii mainiosti myös ilman sitä.
