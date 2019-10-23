// When implementing new services or APIs, add a mock response for good and bad case, and a function into
// mocks hash map.
const responses = {
    getNews: {
        good: [{ headline: "Otsikko", content: "Sisältö" }],
        bad: { code: "" }
    },
    login: {
        good: { token: "TOKEN" },
        bad: { code: "28P01" }
    }
}

const getMockPromise = (response) => Promise.resolve(response)

// goodCase is some simple function (like () => true) that determines if with given params a good or a bad result should be returned.
const mockFactory = (response, goodCase) => (uri, params) => {
    return getMockPromise({
        ok: goodCase(uri, params) ? true : false,
        json:
            () => getMockPromise(goodCase(uri, params) ? response.good : response.bad)
    })
}

// object of mock interfaces
const mocks = {
    getNews: () => mockFactory(responses.getNews, (uri, params) => true),
    login: () => mockFactory(responses.login, (uri, params) => params.body.email === 'testaaja@testaaja.com')
}

export const fetchMock = (mode) => mocks[mode]()