import React from "react"
import ReactMarkdown from "react-markdown"

import { newsTimestamp } from "../../utils/date"

import styles from "./NewsItem.module.css"

export const NewsItem = ({headline, posted, content}) => 
<div className={styles.newsitem}>
    <h3><span>{headline}</span> <span>{newsTimestamp(posted)}</span></h3>
    <div>{content.split('\n').map((c, i) => <p key={`news-paragraph-${i}`}>{<ReactMarkdown source={c} />}</p>)}</div>
</div>

export default NewsItem;