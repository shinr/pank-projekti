import React, { useState, useEffect } from 'react';

import NewsList from "../../components/news/NewsList"
import { BACKEND_URL } from '../../services/api';

export function News() {
    const [news, setNews] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const result = await fetch(`${BACKEND_URL}/news`)
            const data = await result.json()
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