import React from "react"

export const TextInputField = ({password, change}) => {
    return (<input onChange={change} type={password ? "password" : "text"} />)
}

export default TextInputField;
