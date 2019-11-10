import React from "react"

import { template } from "../../utils/constants"
import { Template } from "./Template"
import { Section } from "./Section"

const componentBuilder = (component) => {
    switch (component.type) {
        case template.title:
            return <h1>{component.content}</h1>
        case template.bulletlist:
            return <ul>{component.content.map(k => <li>{k}</li>)}</ul>
        case template.paragraph:
            return <p>{component.content}</p>
        case template.subtitle:
            return <h2>{component.content}</h2>
        case template.table:
            return <table>
                <thead>
                    <tr>{component.content.labels.map(l =>
                        <th>{l}</th>)}
                    </tr>
                </thead>
                <tbody>{component.content.rows.map(r =>
                    <tr>{r.map(k =>
                        <td>{typeof k === "object" ? componentBuilder(k) : k}</td>)}</tr>)}
                </tbody>
            </table>
        case template.plainlist:
            return <div>{ component.content.map(k => <p>{k}</p>)}</div>
        default:
            return <></>
    }
}

const sectionBuilder = (section) => {
    return <Section>{section.map(c => componentBuilder(c))}</Section>
}

export const templateEngine = (templateData) => {
    const { layout, sections } = templateData
    return <Template>{layout.map(s => sectionBuilder(sections[s]))}</Template>
}

export const useTemplate = (template) => {
    return
}