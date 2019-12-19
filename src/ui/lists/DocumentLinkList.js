import React from "react"
import { useAppStateValue } from "../../state/state"
import BaseButton from "../../components/form/BaseButton";

// getOnClickFn: a higher-order function which returns an onClick handler
export const DownloadLinkList = ({ getOnClickFn }) => {
    const [{ documents }, dispatchApp] = useAppStateValue();
    console.log(documents)
return (<div>{documents.map(d => <BaseButton onClick={getOnClickFn(d)} label={`Lisää ${d.filename}`} />)}</div>)
}
