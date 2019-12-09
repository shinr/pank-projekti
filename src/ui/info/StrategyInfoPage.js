import React from "react"

import Latoja, { useComponents, useTemplate } from "latoja"

import { useAppStateValue, emptyStateObject } from "../../state/state"
import { CustomTemplate } from "../../components/templater";

export const StrategyInfoPage = () => {
    const [{ pages }, dispatch] = useAppStateValue()
    const { strategy_and_mission } = pages
    const { meta, data } = strategy_and_mission || emptyStateObject
    return (<div>{data && <Latoja>
        <CustomTemplate template={data} />
    </Latoja>}</div>)
}

export default StrategyInfoPage