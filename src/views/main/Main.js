import React from 'react';
import EventCalendar from '../../ui/events';

import styles from "../views.module.css"
import EventForm from '../../ui/events/EventForm';

export function Main() {
    return (
        <section className={styles.general_row}>
            <section className={styles.general_column}>
                <h1>Hei Tonja ja lapsukaiset, tervetuloa PANK ryn uudistetuille kotisivuille!</h1>
                <EventForm />
            </section>
            <section className={styles.general_column_30}>
                <EventCalendar />
            </section>
        </section>
    );
}

export default Main;
