import React from 'react';

import { Tabs } from "../../ui/tabs/Tabs"

import { Tab } from "../../ui/tabs/Tab"

import { InfoRow } from "../../components/utils/InfoRow"

import styles from "../views.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LinkList } from '../../ui/lists/LinkList';
import { MemberList } from "../../ui/lists/MemberList"

export function Organization({match}) {
    const { tab } = match.params
    // initialTab corresponds to id, doesn't have to be number
    return (
        <section className={styles.general_row}>
            <section className={styles.general_column}>
                <Tabs currentTab={tab || "pank"}>
                    <Tab id={"pank"} icon={<FontAwesomeIcon icon="download" />} title="Organisaatio">
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
                        <InfoRow infos={{ title: "IBAN", iban: "FI" }} />
                        <InfoRow infos={{ title: "IBAN", iban: "FI" }} />
                        <InfoRow infos={{ title: "IBAN", iban: "FI" }} />
                    </Tab>
                    <Tab id={"members"} icon={<FontAwesomeIcon icon="download" />} title="Jäsenyritykset">
                        <MemberList />
                    </Tab>
                    <Tab id={"links"} icon={<FontAwesomeIcon icon="download" />} title="Linkkejä alan järjestöihin">
                        <LinkList />
                    </Tab>
                </Tabs>
            </section>
        </section>
    );
}

export default Organization;