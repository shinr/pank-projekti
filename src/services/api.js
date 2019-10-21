export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const apiHierarchy = {
    news: "news",
    login: { endPoint: "login", identifier: "rpc" }
}

// actual functions that do interactions with the API

const apiCall = async (url, parameters) => {
    const result = await fetch(url, parameters)
    const data = await result.json()
    return data
}

const getHelper = async (apiName, additionalParameters = {}) => {
    const defaultParameters = { method: "GET" }
    const parameters = Object.assign({}, defaultParameters, additionalParameters)
    const url = typeof apiName === "object" ? `${apiName.identifier}/${apiName.endPoint}` : apiName
    return await apiCall(`${BACKEND_URL}/${url}`, parameters)
}

const postHelper = async (apiName, body, additionalParameters = {}) => {
    const defaultParameters = {
        method: "POST",
        body: body
    }
    const parameters = Object.assign({}, defaultParameters, additionalParameters)
    const url = typeof apiName === "object" ? `${apiName.identifier}/${apiName.endPoint}` : apiName
    return await apiCall(`${BACKEND_URL}/${url}`, parameters)
}

// exposed helper functions, just make more

export const getNews = async () => {
    return await getHelper(apiHierarchy.news)
}

export const login = async (email, password) => {
    return await postHelper(apiHierarchy.login, {
        email: email,
        pass: password
    })
}