import { fetchMock } from "../__mocks__/fetch"
import { getNews, login } from "../api"

it('Makes a fetch for news', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetchMock("getNews"))

    const good = await getNews()

    expect(good).toContainEqual({ headline: "Otsikko", content: "Sisältö" })

    global.fetch.mockClear()
})

it('Attempts login', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetchMock("login"))

    const good = await login("testaaja@testaaja.com", "testisana")
    const bad = await login("testi@testi.com", "testisana")

    expect(good).toEqual({ token: "TOKEN" })
    expect(bad).toEqual({ code: "28P01" })

    global.fetch.mockClear()
})
