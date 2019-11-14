import React from 'react';
import EventCalendar from '../../ui/events';

import styles from "../views.module.css"

export function Main() {
    return (
        <section className={styles.general_row}>
            <section className={styles.general_column}>
                <h1>Tervetuloa PANK ryn uudistetuille kotisivuille!</h1>
                <a>Jätä palautteesi klikkaamalla alla olevaa painiketta
                <form action="https://docs.google.com/forms/d/e/1FAIpQLSdwx2K9XKTPbVrL2DRfLZteiAHG6RGT2j6F425fUIXrO4tlRQ/viewform">
                    <input type="submit" value="Anna Palautetta" />
                    </form>
                </a>
            </section>
            <section className={styles.general_column_30}>
                <EventCalendar />
            </section>
        </section>
    );
}

export default Main;
