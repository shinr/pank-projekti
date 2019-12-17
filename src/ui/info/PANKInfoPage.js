import React from "react"

import { InfoRow } from "../../components/utils/InfoRow"

export const PANKInfoPage = () => {
    return (
        <>
            <h1>Organisaatio</h1>
            <h2>PANK ry - PÄÄLLYSTEALAN NEUVOTTELUKUNTA</h2>
            <h3>Käynti- ja postitusosoite</h3>
            <InfoRow infos={{ title: "Osoite", osoite: "PANK ry, c/o INFRA ry, Unioninkatu 14, 4 krs. 00130 Helsinki" }} />
            <InfoRow infos={{ title: "Y-tunnus", ytunnus: "1494555-8" }} />
            <h3>Pankkiyhteystiedot</h3>
            <InfoRow infos={{
                title: "Ålandsbanken",
                account: "660100-1177609"
            }}
                order={["title", "account"]} />
            <InfoRow infos={{ title: "IBAN", iban: "FI7766010001177609" }} />
            <InfoRow infos={{ title: "BIC", bic: "AABAFI22" }} />
            <InfoRow infos={{ title: "OVT-tunnus", ovt: "003714945558" }} />
        </>)
}

export default PANKInfoPage
