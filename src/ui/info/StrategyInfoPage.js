import React from "react"

import { useAppStateValue } from "../../state/state"
import { templateEngine } from "../../ui/templates/templater"

export const StrategyInfoPage = () => {
    const [{ strategyAndMission }, dispatch] = useAppStateValue()
    return (<div>{ templateEngine(strategyAndMission) }</div>)
}

export default StrategyInfoPage