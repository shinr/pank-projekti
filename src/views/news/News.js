import React, { useState, useEffect } from 'react';

import NewsList from "../../components/news/NewsList"
import { getNews } from '../../services/api';

import { when } from "../../utils/clojure"

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
        <section>
            <NewsList news={news} />
        </section>
    );
}

export default News;