import React from "react"

import Latoja, { useComponents, useTemplate } from "latoja"

import { useAppStateValue } from "../../state/state"
import { Paragraph, Section, Title, Subtitle, BulletList } from "../../components/templater";


const CustomTemplate = ({template}) => {
    const components = [{ component: Paragraph,type: "template_paragraph" }, 
    { component: Section, type: "template_section" },
    { component: Title, type: "template_title" },
    { component: Subtitle, type: "template_subtitle" }, 
    { component: BulletList, type: "template_bulletlist" }]
    
    useComponents(...components)
    const template_ = useTemplate(template)
    return <div>{template_}</div>
}

export const StrategyInfoPage = () => {
    const [{ pages }, dispatch] = useAppStateValue()
    const { strategy_and_mission } = pages
    return (<div>{strategy_and_mission && <Latoja>
        <CustomTemplate template={strategy_and_mission} />
    </Latoja>}</div>)
}

export default StrategyInfoPage