import React from 'react';

import { Tabs } from "../../ui/tabs/Tabs"
import { Tab } from "../../ui/tabs/Tab"

import styles from "../views.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LinkList } from '../../ui/lists/LinkList';
import { MemberList } from "../../ui/lists/MemberList"
import PANKInfoPage from '../../ui/info/PANKInfoPage';
import StrategyInfoPage from "../../ui/info/StrategyInfoPage"

export function Organization({match}) {
    const { tab } = match.params
    // initialTab corresponds to id, doesn't have to be number
    return (
        <section className={styles.general_row}>
            <section className={styles.general_column}>
                <Tabs currentTab={tab || "pank"}>
                    <Tab id={"pank"} icon={<FontAwesomeIcon icon="download" />} title="Organisaatio">
                        <PANKInfoPage />
                    </Tab>
                    <Tab id={"strategy"} icon={<FontAwesomeIcon icon="calendar" />} title="Strategia ja missio">
                        <StrategyInfoPage />
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