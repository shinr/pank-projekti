import { first } from "../utils/clojure"
import { decodePayload, withToken } from "../utils/jwt"
import { urlBuilder } from "../utils/url"
import { isEmpty } from "../utils/general"
import { saveAs } from "file-saver"

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

// the api routes - correspond to api/<string> or api/<identifier>/<endPoint> for accessing stored procedures
const apiHierarchy = {
    pages: "pages",
    news: "news",
    login: { endPoint: "login", identifier: "rpc" },
    events: "events",
    documents: "documents",
    userInfo: { endPoint: "user_info", identifier: "rpc" }
}

// default error handlers, defaultError . can be overriden by supplying
// onError and errorHandler 
const defaultError = err => { throw Error("" + err.status + ": " + err.statusText) }
const defaultHandler = err => {
    console.error("Tehtiin silleen tymästi että tuli ", err)
    return [{ bad: true }]
}

// actual functions that do interactions with the API

const apiCall = async (url, parameters, options) => {
    const { onError } = options
    const result = await fetch(url, parameters)

    if (!result.ok) {
        return onError(result)
    }

    const data = await options.blob ? result.blob() : result.json()
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

const json = { "Content-Type": "application/json" }

// POST
const postHelper = async (apiName, body, additionalParameters = {}, options = {}) => {
    const { errorHandler, onError } = options
    const defaultParameters = {
        method: "POST",
        body: JSON.stringify(body),
        headers: json
    }
    const parameters = Object.assign({}, defaultParameters, additionalParameters)
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

export const getEvents = async () => {
    const events = await getHelper(apiHierarchy.events)
    // TODO also fetch user info
    //const userData = await getUserInfo()
    return returnArrayWhenNotBad(events)
}

export const getDocument = async (id, fileName) => {
    const urlParameters =
    {
        select: "filedata",
        id: { is: id }
    }
    const headers = { "Accept": "application/octet-stream" }
    const blob = await getHelper(apiHierarchy.documents, urlParameters, { headers: headers }, { blob: true })
    saveAs(blob, fileName)
}

export const getDocuments = async () => {
    const documents = await getHelper(apiHierarchy.documents)
    return returnArrayWhenNotBad(documents)
}

export const getPage = async (name) => {
    const urlParameters = { name: { is: name } }
    const page = await getHelper(apiHierarchy.pages, urlParameters)
    return returnArrayWhenNotBad(page)
}

export const getPages = async () => {
    const pages = await getHelper(apiHierarchy.pages)
    const updated = pages.reduce((acc, p) => {
        return Object.assign(acc, { [p.name]: p.data })
    }, {})
    return updated
}

export const postNews = async (article, token) => {
    const news = await postHelper(apiHierarchy.news, article, { headers: { ...json, ...withToken(token) } })
    return news
}

export const postEvents = async (event, token) => {
    const events = await postHelper(apiHierarchy.events, event, { headers: { ...json, ...withToken(token) } })
    return events
}