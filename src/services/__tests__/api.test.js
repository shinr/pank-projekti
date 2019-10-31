import { fetchMock } from "../__mocks__/fetch"
import { getNews, login, getUserInfo } from "../api"

it('Makes a fetch for news', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetchMock("getNews"))

    const good = await getNews()

    expect(good).toContainEqual({ headline: "Otsikko", content: "Sisältö" })

    global.fetch.mockClear()
})

it('Attempts login', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetchMock("login"))

    const good = await login("testaaja@testaaja.com", "testisana")
    const bad = await login("wrong@testi.com", "wrongsana")

    expect(good).toEqual({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IlRPS0VOIn0.DbozeWRU75tEHgFJrD4LH3iFyYZC4TL1ww1Tc0AdYWk" })
    expect(bad).toEqual({ bad: true })

    global.fetch.mockClear()
})

it('Gets user info by id', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetchMock("getUserInfo"))

    const good = await getUserInfo(1)
    const bad = await getUserInfo(2)

    expect(good).toEqual({ email: "testiteppo@gmail.com", realname: "Testiteppo Testaaja"})
    expect(bad).toEqual({ bad: true })

    global.fetch.mockClear()
})