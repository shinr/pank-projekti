import React, { useState, useEffect } from 'react';

import NewsList from "../../components/news/NewsList"
import { getNews } from '../../services/api';

import { when } from "../../utils/clojure"

import styles from "../views.module.css"

export const News = () => {
    const [news, setNews] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const data = await getNews()
            // to stop constant rerendering (and refetching the data), just comparing the lengths should be enough.
            when(news.length !== data.length, () => setNews(data))
        }
        getData()
    })
    return (
        <>
            <section className={styles.general_row}>
                <section className={styles.general_column}>
                    <NewsList news={news} />
                </section>
                <section className={styles.general_column_30}>
                    Sivujuttu
                </section>
            </section>
            <section className={styles.general_column}>
                <section className={styles.general_row}>
                    Rivi 1
                </section>
                <section className={styles.general_row}>
                Rivi 2
                </section>
                <section className={styles.general_row}>
                Rivi 3
                </section>
            </section>
        </>
    );
}

export default News;