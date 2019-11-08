import React from 'react';
import EventCalendar from '../../ui/events';

import styles from "../views.module.css"

export function Main() {
    return (
        <section className={styles.general_row}>
            <section className={styles.general_column}>
                <h1>Tervetuloa PANK ryn uudistetuille kotisivuille!</h1>
            </section>
            <section className={styles.general_column_30}>
                <EventCalendar />
            </section>
        </section>
    );
}

export default Main;