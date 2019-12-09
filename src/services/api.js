import { first } from "../utils/clojure"
import { decodePayload, withToken } from "../utils/jwt"
import { urlBuilder } from "../utils/url"
import { isEmpty, toBase64 } from "../utils/general"
import { saveAs } from "file-saver"
import { payloadAction, actions } from "../state/actions"

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

// the api routes - correspond to api/<string> or api/<identifier>/<endPoint> for accessing stored procedures
const apiHierarchy = {
    pages: "pages",
    news: "news",
    login: { endPoint: "login", identifier: "rpc" },
    events: "events",
    documents: "documents",
    upload: { endPoint: "upload", identifier: "rpc" },
    userInfo: { endPoint: "user_info", identifier: "rpc" }
}

// default error handlers, defaultError . can be overriden by supplying
// onError and errorHandler 
const defaultError = err => { throw Error("" + err.status + ": " + err.statusText) }
const defaultHandler = err => {
    console.error("Tehtiin silleen tymästi että tuli ", err)
    return [{ bad: true }]
}
const json = { "Content-Type": "application/json" }

// actual functions that do interactions with the API

const apiCall = async (url, parameters, options) => {
    const { onError, onStart, onEnd } = options
    if (onStart) onStart()
    const result = await fetch(url, parameters)

    if (!result.ok) {
        if (onEnd) onEnd()
        return onError(result)
    }

    const data = await options.blob ? result.blob() : result.json()
    if (onEnd) onEnd()
    return data
}

// GET
const getHelper = async (apiName, urlParameters = {}, additionalParameters = {}, options = {}) => {
    const { errorHandler, onError } = options
    const defaultParameters = { method: "GET" }
    const parameters = Object.assign({}, defaultParameters, additionalParameters)
    const url = typeof apiName === "object" ? `${apiName.identifier}/${apiName.endPoint}` : apiName
    const urlWithParameters = isEmpty(urlParameters) ? url : url.concat(urlBuilder(urlParameters))
    const mergedOptions = Object.assign({}, { onError: onError || defaultError }, options)

    try {
        return await apiCall(`${BACKEND_URL}/${urlWithParameters}`, parameters, mergedOptions)
    } catch (error) {
        return errorHandler ? errorHandler(error) : defaultHandler(error)
    }
}

// POST
const postHelper = async (apiName, body, additionalParameters = {}, options = {}) => {
    const { errorHandler, onError, upsert } = options
    const defaultParameters = {
        method: "POST",
        body: JSON.stringify(body),
        headers: json
    }
    const mergedParameters = Object.assign({}, defaultParameters, additionalParameters)
    const parameters = upsert ? { ...mergedParameters, headers: { ...mergedParameters.headers, "Prefer": "resolution=merge-duplicates" } } : mergedParameters
    const url = typeof apiName === "object" ? `${apiName.identifier}/${apiName.endPoint}` : apiName
    const mergedOptions = Object.assign({}, { onError: onError || defaultError }, options)

    try {
        return await apiCall(`${BACKEND_URL}/${url}`, parameters, mergedOptions)
    } catch (error) {
        return errorHandler ? errorHandler(error) : defaultHandler(error)
    }
}

const BAD_FETCH = "bad"
const returnArrayWhenNotBad = (entities) => first(entities).hasOwnProperty(BAD_FETCH) ? first(entities) : entities
// exposed helper functions, just make more

export const getNews = async () => {
    const news = await getHelper(apiHierarchy.news)
    return news
}

export const login = async (email, password) => {
    const loginData = first(await postHelper(apiHierarchy.login, {
        email: email,
        pass: password
    }))
    const { token, bad } = loginData;
    return bad ? loginData : { ...decodePayload(token), token: token }
}

export const getUserInfo = async (id) => {
    const userData = first(await postHelper(apiHierarchy.userInfo, {
        id: id
    }))
    return userData
}

export const getEvent = async (id) => { }

export const getEvents = async (dispatch) => {
    const events = await getHelper(apiHierarchy.events, {}, {}, {
        onStart: () => dispatch(payloadAction(actions.FETCHING, { fetching: true, refresh: "events" })),
        onEnd: () => dispatch(payloadAction(actions.FETCHING, { fetching: false }))
    })
    // TODO also fetch user info
    //const userData = await getUserInfo()
    return returnArrayWhenNotBad(events)
}

export const getDocument = async (id, fileName, dispatch) => {
    const urlParameters =
    {
        select: "filedata",
        id: { is: id }
    }
    const headers = { "Accept": "application/octet-stream" }
    const blob = await getHelper(apiHierarchy.documents, urlParameters, { headers: headers }, {
        blob: true,
        onStart: () => dispatch(payloadAction(actions.FETCHING, { fetching: true })),
        onEnd: () => dispatch(payloadAction(actions.FETCHING, { fetching: false }))
    })
    saveAs(blob, fileName)
}

export const getDocuments = async (dispatch) => {
    const urlParameters =
    {
        select: ["id", "filename", "headline", "description", "posted", "posted_by"]
    }
    const documents = await getHelper(apiHierarchy.documents, urlParameters, {}, {
        onStart: () => dispatch(payloadAction(actions.FETCHING, { fetching: true, refresh: "documents"  })),
        onEnd: () => dispatch(payloadAction(actions.FETCHING, { fetching: false }))
    })
    return returnArrayWhenNotBad(documents)
}

export const getPage = async (name) => {
    const urlParameters = { name: { is: name } }
    const page = await getHelper(apiHierarchy.pages, urlParameters)
    return returnArrayWhenNotBad(page)
}

export const getPages = async (dispatch) => {
    const pages = await getHelper(apiHierarchy.pages, {}, {}, {
        onStart: () => dispatch(payloadAction(actions.FETCHING, { fetching: true, refresh: "pages"  })),
        onEnd: () => dispatch(payloadAction(actions.FETCHING, { fetching: false }))
    })
    const updated = pages.reduce((acc, p) => {
        return Object.assign(acc, { [p.name]: p.data })
    }, {})
    return updated
}

export const postNews = async (article, token) => {
    const news = await postHelper(apiHierarchy.news, article, { headers: { ...json, ...withToken(token) } })
    return news
}

// backend doesn't support form data se we need to use base64
export const postDocument = async (file, info, token) => {
    const fileDataurl = await toBase64(file)
    const _file = fileDataurl.split(",")[1]
    return await postHelper(apiHierarchy.upload, { ...info, filedata: _file, filename: file.name }, { headers: { ...json, ...withToken(token) } }) // 
}

export const postEvents = async (event, token) => {
    const events = await postHelper(apiHierarchy.events, event, { headers: { ...json, ...withToken(token) } })
    return events
}

export const postLink = async (links, token, dispatch) => {
    const done = await postHelper(apiHierarchy.pages, links, { headers: { ...json, ...withToken(token) } }, {
        upsert: true,
        onStart: () => dispatch(payloadAction(actions.FETCHING, { fetching: true })),
        onEnd: () => dispatch(payloadAction(actions.FETCHING, { fetching: false }))
    })
    return done
}