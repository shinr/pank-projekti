import React from "react"

import Latoja, { useComponents, useTemplate } from "latoja"

import { useAppStateValue } from "../../state/state"
import { CustomTemplate } from "../../components/templater";

export const StrategyInfoPage = () => {
    const [{ pages }, dispatch] = useAppStateValue()
    const { strategy_and_mission } = pages
    console.log("-", strategy_and_mission)
    return (<div>{strategy_and_mission && <Latoja>
        <CustomTemplate template={strategy_and_mission} />
    </Latoja>}</div>)
}

export default StrategyInfoPage