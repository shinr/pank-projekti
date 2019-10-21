import React, { useState, useEffect } from 'react';

import NewsList from "../../components/news/NewsList"
import { getNews } from '../../services/api';

export function News() {
    const [news, setNews] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const data = await getNews()
            setNews(data)
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