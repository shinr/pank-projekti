import React, { useState, useEffect } from 'react';

import NewsForm from "../../ui/news/NewsForm"
import NewsList from "../../components/news/NewsList"
import { getNews } from '../../services/api';

import { when } from "../../utils/clojure"

import styles from "../views.module.css"
import { useUserStateValue, useAppStateValue } from '../../state/state';
import { payloadAction, actions } from '../../state/actions';

export const News = () => {
    const [{ news, refresh }, dispatchApp] = useAppStateValue()
    const [{ role }, dispatchUser] = useUserStateValue();
    useEffect(() => {
        const getData = async () => {
            const data = await getNews()
            // to stop constant rerendering (and refetching the data), just comparing the lengths should be enough.
            when(news.length !== data.length, () => dispatchApp(payloadAction(actions.SAVE_NEWS, { news: data} )))
        }
        when(refresh.news, () => getData())
    })
    return (
        <section className={styles.general_row}>
            <section className={styles.general_column}>
                {role === "administrator" && <NewsForm />}
                <NewsList news={news} />
            </section>
        </section>
    );
}

export default News;