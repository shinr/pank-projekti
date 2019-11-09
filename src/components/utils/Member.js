import React from "react"

export const Member = ({url, name}) => {
    return (<div><a href={url}>{name}</a></div>)
}

export default Member