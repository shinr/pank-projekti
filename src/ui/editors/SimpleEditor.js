import React, { useState } from "react"

// [{ name, submit }]

export const SimpleEditor = ({ fields, submit }) => {
    const [state, setState] = useState({ ...fields.reduce((acc, f) => ({ ...acc, [f]: ""}), {})})
    console.log("state", state)
    return (<div>
        {fields.map(f => <label>{f}<input onBlur={e => setState({...state, [f]: e.target.value })} type="text" /></label>)}
        <button onClick={() => submit(state)}>Lähetä</button>
    </div>)
}