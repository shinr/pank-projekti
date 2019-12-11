import React, { useState, useEffect } from "react"

import FileInputField from "../../components/form/FileInputField";
import BaseButton from "../../components/form/BaseButton";
import TextInputField from "../../components/form/TextInputField";
import TextAreaField from "../../components/form/TextAreaField";
import TagSelect from "../../components/utils/TagSelect"

import { notEmpty, isFormValid } from "../../utils/validation"
import { useUserStateValue, useAppStateValue } from "../../state/state"

import styles from "./DocumentUploadForm.module.css"
import { postDocument } from "../../services/api";

export const DocumentUploadForm = () => {
    const [state, setState] = useState({ valid: true, validities: { headline: false, description: false, filename: false }, files: { tags: [] } })
    const [user, dispatch] = useUserStateValue();
    const [{ tags }, dispatchApp] = useAppStateValue();
    const { id, role, token } = user

    const { files, valid, validities } = state
    const { filedata, headline, description } = files

    return (<div className={styles.documentuploadform}>
        <FileInputField onChange={e => setState({ ...state, files: { ...files, filedata: e.target.files[0] } })} label="Dokumentti" />
        <TextInputField
            valid={valid || validities.headline}
            label="Otsikko"
            blur={(e) => setState({
                ...state,
                validities: {
                    ...validities,
                    headline: notEmpty(e)
                },
                files: {
                    ...files,
                    headline: e
                }
            })} />
        <TagSelect tags={tags} selected={files.tags} change={e => setState({ ...state, files: { ...files, tags: e } })} />
        <TextAreaField
            valid={valid || validities.content}
            label="Kuvaus"
            blur={(e) => setState({
                ...state,
                validities: {
                    ...state.validities,
                    description: notEmpty(e.target.value)
                },
                files: {
                    ...files,
                    description: e.target.value
                }
            })} />
        <div>
            <BaseButton onClick={e => isFormValid(validities) ? postDocument(filedata, { headline: headline, description: description, posted_by: id, tags: files.tags }, token) : setState({ ...state, valid: false })} label="Tallenna" />
        </div>
    </div>)
}

export default DocumentUploadForm