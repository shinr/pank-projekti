import React from "react"
import Latoja, { useComponents, useTemplate } from "latoja"
import LinkItem from "../utils/LinkItem";
import Member from "../utils/Member";

export const Link = ({ url, label }) => <LinkItem title={label} url={url} />

export const Paragraph = ({ children, content }) => <p>{content}{children}</p>

export const Section = ({ children }) => <div>{children}</div>

export const Title = ({ content }) => <h1>{content}</h1>

export const Subtitle = ({ content }) => <h2>{content}</h2>

export const BulletList = ({ content }) => <ul>{content.map(k => <li>{k}</li>)}</ul>

export const Table = ({ labels, rows }) => (
    <table>
        <thead>
            <tr>
                {labels.map(h =>
                    <th>{h}</th>)}
            </tr>
        </thead>
        <tbody>
            {rows.map(r =>
                <tr>{r.map(c =>
                    <td>{Array.isArray(c.content)
                        ? <ul>{c.content.map(l =>
                            <li>{l}</li>)}
                        </ul>
                        : c.content}
                    </td>)}
                </tr>)}
        </tbody>
    </table>)

export const CustomTemplate = ({ template }) => {
    const components = [{ component: Paragraph, type: "template_paragraph" },
    { component: Section, type: "template_section" },
    { component: Title, type: "template_title" },
    { component: Subtitle, type: "template_subtitle" },
    { component: BulletList, type: "template_bulletlist" },
    { component: Table, type: "template_table" },
    { component: Link, type: "template_link"},
    { component: Member, type: "template_member"}]

    useComponents(...components)
    const template_ = useTemplate(template)
    return <div>{template_}</div>
}
