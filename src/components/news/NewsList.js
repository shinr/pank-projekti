import React from "react"
import NewsItem from "./NewsItem"

export const NewsList = ({news, setNews}) => {
    return (<section>
        { news.map((m) => <NewsItem headline={m.headline} posted={m.posted} />) }
    </section>)
}

export default NewsList;