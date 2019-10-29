import { first } from "../utils/clojure"
import { decodePayload } from "../utils/jwt"

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const apiHierarchy = {
    news: "news",
    login: { endPoint: "login", identifier: "rpc" }
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

    const data = await result.json()
    return data
}

const getHelper = async (apiName, additionalParameters = {}, options = {}) => {
    const { errorHandler, onError } = options
    const defaultParameters = { method: "GET" }
    const parameters = Object.assign({}, defaultParameters, additionalParameters)
    const url = typeof apiName === "object" ? `${apiName.identifier}/${apiName.endPoint}` : apiName
    try {
        return await apiCall(`${BACKEND_URL}/${url}`, parameters, { onError: onError || defaultError })
    } catch (error) {
        return errorHandler ? errorHandler(error) : defaultHandler(error)
    }
}

const postHelper = async (apiName, body, additionalParameters = {}, options = {}) => {
    const { errorHandler, onError } = options
    const defaultParameters = {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
    }
    const parameters = Object.assign({}, defaultParameters, additionalParameters)
    const url = typeof apiName === "object" ? `${apiName.identifier}/${apiName.endPoint}` : apiName
    try {
        return await apiCall(`${BACKEND_URL}/${url}`, parameters, { onError: onError || defaultError })
    } catch (error) {
        return errorHandler ? errorHandler(error) : defaultHandler(error)
    }
}

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
    return bad ? loginData : { ...decodePayload(token), token:token }
}