import { urlBuilder } from "../url"

it('Builds a simple select by id url', () => {
    const urlParameters = {
        id: {
            is: 1
        }
    }
    const goodResult = "?id=eq.1"

    const good = urlBuilder(urlParameters)

    expect(good).toEqual(goodResult)
})

it('Builds a simple select with two parameters', () => {
    const urlParameters = {
        id: {
            is: 1
        },
        posted_by: {
            is: 2
        }
    }
    const goodResult = "?id=eq.1&posted_by=eq.2"

    const good = urlBuilder(urlParameters)

    expect(good).toEqual(goodResult)
})

it('Builds a url that selects a bytea field by id', () => {
    const urlParameters = 
    { select: "filedata",
    id: { is: 1 } }

    const goodResult = "?select=filedata&id=eq.1"

    const good = urlBuilder(urlParameters)

    expect(good).toEqual(goodResult)
})
