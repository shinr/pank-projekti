import React, { useState } from "react"

import { postNews } from "../../services/api"

import styles from "./NewsForm.module.css"

import { useUserStateValue, useAppStateValue } from '../../state/state';
import TextInputField from "../../components/form/TextInputField";
import TextAreaField from "../../components/form/TextAreaField";
import BaseButton from "../../components/form/BaseButton";

import { notEmpty, isFormValid } from "../../utils/validation"
import MarkdownEditor from "../editors/MarkdownEditor";

export const NewsForm = () => {
    const [user, dispatch] = useUserStateValue();
    const [app, dispatchApp] = useAppStateValue()
    const [state, setState] = useState({ valid: true, validities: { headline: false, content: false }, preview: false, news: { posted_by: user.id } })
    const { id, role, token } = user
    const { preview, news, valid, validities } = state
    return (<div className={styles.newsform}>
        <h2>Kirjoita uusi uutinen</h2>
        {preview && <>
            <div>{news.headline}</div>
            <div>{news.content.split("\n").map(c => <p>{c}</p>)}</div>
        </>}
        <TextInputField
            valid={valid || validities.headline}
            label="Otsikko"
            blur={(e) => setState({
                ...state,
                validities: {
                    ...state.validities,
                    headline: notEmpty(e)
                },
                news: {
                    ...news,
                    headline: e
                }
            })} />
            <MarkdownEditor value={news.content} onChange={(e) => setState({
                ...state,
                validities: {
                    ...state.validities,
                    content: notEmpty(e)
                },
                news: {
                    ...news,
                    content: e
                }
            })} />
        <div>
            <BaseButton onClick={() => isFormValid(validities)
                ? postNews(news, token, dispatchApp)
                : setState({ ...state, valid: false })} label="Tallenna" />
        </div>
    </div>)
}

export default NewsForm