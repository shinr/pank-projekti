import React, { useReducer, useContext, createContext } from "react"

import { strategyIds, strategy, template } from "../utils/constants"

// TODO: HARDCODING ONLY FOR TESTING remove later
// maybe use in a skeleton sense to hide loading? shouldn't be needed tho as app state is loaded during initial load
// for pages like strategy and mission, the idea is that the data is retrieved from database and then formatted
// dynamically by data
export const initialAppState = {
    tags: [{ id: 1, name: "Pöytäkirjat" }, { id: 2, name: "Seminaaripaperit" }, { id: 3, name: "Tieteelliset julkaisut" }],
    externalLinks: [{ id: 1, title: "Autori", url: "http://www.autori.fi" }, { id: 2, title: "INFRA ry", url: "http://www.infrary.fi" }],
    memberOrganizations: [{ id: 1, name: "Oulun Yliopisto", url: "http://www.oulu.fi/yliopisto" }],
    pankInformation: [],
    strategyAndMission: {
        // mock
        layout: strategyIds, sections: {
            [strategy.mission]: [
                { type: template.title, content: "Missio" },
                { type: template.paragraph, content: "Päällystealan tehtävänä on kehittää ja toteuttaa toimenpiteitä, joiden avulla asfalttipäällysteitä ja muita liikenneväylien pinnoitteita rakennetaan ja ylläpidetään yhteiskunnallisesti mahdollisimman tehokkaasti ja taloudellisesti ottaen huomioon kuljetusten ja henkilöliikenteen asettamat vaatimukset ja ekologiset tarpeet." }],
            [strategy.vision]: [
                { type: template.title, content: "Visio" },
                { type: template.subtitle, content: "Päällystealalla on käytössä" },
                {
                    type: template.bulletlist, content: [
                        "käyttäjälähtöiset palvelutasot",
                        "älykkäät, taloudelliset ja ekologiset",
                        "ratkaisut (tuotteet)",
                        "toimintatavat",
                        "suunnittelumenetelmät ja prosessit"]
                },
                { type: template.subtitle, content: "Visio tarkoittaa, että" },
                {
                    type: template.bulletlist, content: [
                        "päällystealan markkinat toimivat yhteiskunnan ja ympäristön kannalta kokonaisvaltaisilla periaatteilla ja tuotteilla",
                        "päällyste on arvostettu, ympäristömyönteinen tuote, joka käyttökohteessaan vastaa sekä käyttäjän odotuksia että tarpeita",
                        "päällystealalla on positiivinen imago; se on houkutteleva ja arvostettu ala, jonne hakeutuu riittävästi kehityskykyisiä ihmisiä ja jossa on kiinnostavaa ja turvallista työskennellä",
                        "suomalaiset päällysteet ovat huippuluokkaa sekä palvelutasoltaan että teknisiltä ratkaisuiltaan",
                        "hankintamenettelyt ovat kokonaistaloudellisesti edullisia"
                    ]
                }
            ],
            [strategy.currentState]: [
                { type: template.title, content: "Nykytila" },
                { type: template.subtitle, content: "Päällystealan vahvuutena on" },
                {
                    type: template.bulletlist, content: [
                        "hyvä ammattitaito",
                        "korkeatasoiset materiaalit ja niiden kierrätettävyys",
                        "hyvä toiminnan tehokkuus ja kilpailukyky sekä kalusto"
                    ]
                },
                { type: template.subtitle, content: "Päällystealan heikkoutena" },
                {
                    type: template.bulletlist, content: [
                        "ammattitaidon ylläpitäminen",
                        "vanhoillinen urakointikulttuuri",
                        "ratkaisujen suunnittelun yksipuolisuus ja toiminnallisten ratkaisujen puute",
                        "T&K-toiminnan jatkuva heikkeneminen",
                        "yhteydenpito viranomaisiin ja julkisiin päätöksentekijöihin",
                        "imago ja markkinointi"
                    ]
                },
                { type: template.subtitle, content: "Päällysteala kokee uhkina" },
                {
                    type: template.bulletlist, content: [
                        "työmäärien vähenemisen",
                        "ympäristöviranomaisten yksipuolisen toiminnan"
                    ]
                },
            ],
            [strategy.goals]: [
                { type: template.title, content: "Strategiset päämäärät ja menestystekijät" },
                { type: template.subtitle, content: "Strategiset päämäärät:" },
                {
                    type: template.bulletlist, content: [
                        "tehdä päällystealasta houkutteleva ja arvostettu",
                        "tehdä päällysteestä yhteiskunnan odotuksia ja tarpeita vastaava tuote",
                        "toiminta on kannattavaa ja on T&K-toiminta on jatkuvaa",
                        "kestävän kehityksen periaatteiden monipuolinen noudattaminen"]
                },
                { type: template.subtitle, content: "Kriittiset menestystekijät:" },
                {
                    type: template.bulletlist, content: [
                        "alan markkinoiden kokonaisvaltainen toimintatapa",
                        "työvoiman saanti ja korkeatasoinen osaaminen",
                        "asiakaslähtöiset ja esteettiset kokonaisratkaisut",
                        "yhteistyö eri osapuolten kesken",
                        "kansainvälinen kilpailukyky"]
                }
            ],
            [strategy.methods]: [{ type: template.title, content: "Strategiset toimenpiteet" },
            {
                type: template.table, content: {
                    labels: ["Näkökulma", "Tavoitteet", "Toimenpiteet", "Vastuutaho"],
                    rows: [[
                        { type: template.paragraph, content: "Imago" },
                        { type: template.paragraph, content: "Päällysteala on houkutteleva ja arvostettu ala" },
                        {
                            type: template.bulletlist, content: [
                                "Kehitetään alan koulutusjärjestelmiä alalla toimivien tarpeista lähtien",
                                "luodaan toimintatavat, joilla mahdollistetaan alalla olevien suunnitelmallinen urakehitys",
                                "kehitetään toimenpiteitä, joilla vaikutetaan positiivisesti työntekijöiden työympäristön terveyteen ja turvallisuuteen sekä kausiluontoisuuteen"]
                        },
                        { type: template.plainlist, content: ["PANK", "Jäsenet"] }
                    ], [
                        { type: template.paragraph, content: "Kestävä kehitys" },
                        { type: template.paragraph, content: "Päällyste on arvostettu ja ympäristömyönteinen tuote" },
                        {
                            type: template.bulletlist, content: [
                                "Kehitetään uusia tuotteita ja sovelluksia asiakkaiden muuttuviin tarpeisiin",
                                "Kehitetään päällysteiden uusiokäyttöä",
                                "kehitetään teollisuuden sivutuotteiden hyötykäyttöä päällysteissä",
                                "kehitetään energiaa ja ympäristöä säästäviä tuotantoprosesseja",
                                "tuotetaan alalta ympäristöön liittyvää taustamateriaalia ympäristöviranomaisia ja muita sidosryhmiä varten"]
                        },
                        { type: template.plainlist, content: ["Urakoitsijat", "PANK"] }
                    ], [
                        { type: template.paragraph, content: "Laatutaso" },
                        { type: template.paragraph, content: "Suomalaiset päällysteet ovat kansainvälistä huippuluokka. Jokaiseen käyttötarkoitukseen on tarjolla soveltuvat laatutuotteet" },
                        {
                            type: template.bulletlist, content: [
                                "panostetaan laatutietoiseen toimintaan sekä laadun ja palvelutason kehittämiseen",
                                "ylläpidetään alan kansainvälistä yhteistyötä sekä harjoitetaan teknologian siirtoa Suomeen",
                                "laaditaan ja käynnistetään alan T&K-ohjelma"]
                        },
                        { type: template.plainlist, content: ["Tilaajat", "PANK", "Urakoitsijat", "yhdessä rahoittajien kanssa"] }
                    ], [
                        { type: template.paragraph, content: "Prosessit" },
                        { type: template.paragraph, content: "Toiminta on yhteiskunnallisesti ja yritystaloudellisesti kannattavaa" },
                        {
                            type: template.bulletlist, content: [
                                "Kehitetään hankintamenettelyjä kokonaistaloudellisesti edullisimmalla ja kehitystoimintaan kannustavalla tavalla",
                                "kehitetään yhteistyössä viranomaisten ja muiden osapuolten kanssa menettelytapoja, joilla eliminoidaan harmaan talouden toimijat markkinoilta",]
                        },
                        { type: template.plainlist, content: ["Tilaajat", "Urakoitsija ja tilaajat"] }
                    ]]
                }
            }]
        }
    }
}

export const UserStateContext = createContext();
export const AppStateContext = createContext();

export const UserStateProvider = ({ reducer, initialState, children }) => (
    <UserStateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </UserStateContext.Provider>)

export const AppStateProvider = ({ reducer, initialState, children }) => (
    <AppStateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </AppStateContext.Provider>)

export const useUserStateValue = () => useContext(UserStateContext)
export const useAppStateValue = () => useContext(AppStateContext)

export const userState = {
    Context: UserStateContext,
    Provider: UserStateProvider,
    value: useUserStateValue
}

export const appState = {
    Context: AppStateContext,
    Provider: AppStateProvider,
    value: useAppStateValue
}