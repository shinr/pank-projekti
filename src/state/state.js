import React, { useReducer, useContext, createContext } from "react"

// TODO: HARDCODING ONLY FOR TESTING remove later
// maybe use in a skeleton sense to hide loading? shouldn't be needed tho as app state is loaded during initial load
// for pages like strategy and mission, the idea is that the data is retrieved from database and then formatted
// dynamically by data
export const initialAppState = {
    tags: [{ id: 1, name: "Pöytäkirjat" }, { id: 2, name: "Seminaaripaperit" }, { id: 3, name: "Tieteelliset julkaisut" }],
    externalLinks: [{ id: 1, title: "Autori", url: "http://www.autori.fi" }, { id: 2, title: "INFRA ry", url: "http://www.infrary.fi" }],
    memberOrganizations: [{ id: 1, name: "Oulun Yliopisto", url: "http://www.oulu.fi/yliopisto" }],
    pankInformation: [],
    strategyAndMission: {},
    pages: [],
    fetching: false,
    documents: [],
    events: [],
    news: [],
    refresh: {
        documents: true,
        events: true,
        pages: true,
        news: true
    }
}

export const UserStateContext = createContext();
export const AppStateContext = createContext();

export const UserStateProvider = ({ reducer, initialState, children }) => (
    <UserStateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </UserStateContext.Provider>)

export const AppStateProvider = ({ reducer, initialState, children }) => (
    <AppStateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </AppStateContext.Provider>)

export const useUserStateValue = () => useContext(UserStateContext)
export const useAppStateValue = () => useContext(AppStateContext)

export const userState = {
    Context: UserStateContext,
    Provider: UserStateProvider,
    value: useUserStateValue
}

export const appState = {
    Context: AppStateContext,
    Provider: AppStateProvider,
    value: useAppStateValue
}