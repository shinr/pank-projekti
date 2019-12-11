import React, { useState } from "react"
import ReactMde from "react-mde"
import ReactMarkdown from "react-markdown"
import 'react-mde/lib/styles/css/react-mde-all.css';
import styles from "./MarkdownEditor.module.css"

export const MarkdownEditor = ({ onChange, value, label = "" }) => {
    const [mode, setMode] = useState("write")
    return (<div>
        <label>{label}</label>
        <ReactMde
            value={value}
            l18n={{write: "Kirjoita", preview: "Esikatsele"}}
            onChange={onChange}
            selectedTab={mode}
            onTabChange={setMode}
            generateMarkdownPreview={md => Promise.resolve(<ReactMarkdown source={md} />)}
        />
    </div>)
}

export default MarkdownEditor