import React, { useState } from "react"

import { postEvent } from "../../services/api"

import styles from "./EventForm.module.css"

import { useUserStateValue, useAppStateValue } from '../../state/state';
import TextInputField from "../../components/form/TextInputField";
import BaseButton from "../../components/form/BaseButton";

import { notEmpty, isFormValid } from "../../utils/validation"
import MarkdownEditor from "../editors/MarkdownEditor";
import CalendarWrapper from "../../components/utils/CalendarWrapper";

export const EventForm = () => {
    const [user, dispatch] = useUserStateValue();
    const [app, dispatchApp] = useAppStateValue()
    const { id, role, token } = user
    const [state, setState] = useState({
        valid: true,
        validities: {
            headline: false,
            content: false,
            location: false,
            event_date: false
        },
        preview: false,
        event: { posted_by: id }
    })
    const { event, valid, validities } = state
    console.log(state)
    return (<div className={styles.newsform}>
        <h2>Kirjoita uusi tapahtuma</h2>
        <TextInputField
            valid={valid || validities.headline}
            label="Tapahtuman nimi"
            blur={(e) => setState({
                ...state,
                validities: {
                    ...state.validities,
                    headline: notEmpty(e)
                },
                event: {
                    ...event,
                    headline: e
                }
            })} />
        <TextInputField
            valid={valid || validities.location}
            label="Tapahtuman paikka"
            blur={(e) => setState({
                ...state,
                validities: {
                    ...state.validities,
                    location: notEmpty(e)
                },
                event: {
                    ...event,
                    location: e
                }
            })} />
        <CalendarWrapper onChange={date => setState({
                ...state,
                validities: {
                    ...state.validities,
                    event_date: notEmpty(date)
                },
                event: {
                    ...event,
                    event_date: date
                }
            })}
            value={event.event_date} />
        <MarkdownEditor
            label="Tapahtuman kuvaus"
            value={event.content}
            onChange={(e) => setState({
                ...state,
                validities: {
                    ...state.validities,
                    content: notEmpty(e)
                },
                event: {
                    ...event,
                    content: e
                }
            })} />
        <div>
            <BaseButton onClick={() => isFormValid(validities)
                ? postEvent(event, token, dispatchApp)
                : setState({ ...state, valid: false })} label="Tallenna" />
        </div>
    </div>)
}

export default EventForm