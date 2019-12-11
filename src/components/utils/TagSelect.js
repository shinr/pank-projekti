import React, { useState } from "react"

import { postTag } from "../../services/api";
import { useUserStateValue, useAppStateValue } from "../../state/state"

import BaseButton from "../form/BaseButton";
import TextInputField from "../form/TextInputField";

import styles from "./TagSelect.module.css"

import { Tag } from "./Tag";

export const TagSelect = ({ tags, selected, change }) => {
    const [newTag, createTag] = useState([])
    const [{ token }, dispatchUser] = useUserStateValue(); 
    const [{ fetching }, dispatchApp] = useAppStateValue();
    return <div className={styles.tagselect__tags}>{tags.map(t =>
        <Tag
            id={t.id}
            selected={selected.includes(t.id)}
            name={t.name}
            click={() =>
                change(selected.includes(t.id)
                    ? selected.filter(s => s !== t.id)
                    : [...selected, t.id])} />)}
        <div>
            <TextInputField disabled={fetching} label="Luo uusi tag" blur={newTag => createTag({ name: newTag})} />
            <BaseButton disabled={fetching} label="Tallenna" onClick={() => postTag(newTag, token, dispatchApp)} />
        </div>
    </div>
}

export default TagSelect