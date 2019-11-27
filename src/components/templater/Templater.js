import React from "react"

export const Paragraph = ({ children, content }) => <p>{content}{children}</p>

export const Section = ({ children }) => <div>{children}</div>

export const Title = ({content}) => <h1>{content}</h1>

export const Subtitle = ({content}) => <h2>{content}</h2>

export const BulletList = ({ content }) => <ul>{ content.map(k => <li>{k}</li>)}</ul>