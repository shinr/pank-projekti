import React from "react"
import NewsItem from "./NewsItem"

export const NewsList = ({news, setNews}) => {
    const _e = news.bad
        ? <div>Tietokannan yhteysvirhe ajankohtaisia asioita haettaessa</div>
        : news.map((e, index) => <NewsItem
            key={`news-item-${index}`}
            index={index}
            posted={e.posted}
            date={e.event_date}
            headline={e.headline}
            content={e.content} />)
    return <div><h1>Ajankohtaista</h1>
        {_e || 'Ei uutisia'}</div>
}

export default NewsList;