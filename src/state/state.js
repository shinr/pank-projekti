import React, { useReducer, useContext, createContext } from "react"

export const initialAppState = {
    tags: [{id: 1, name: "Pöytäkirjat"}, {id: 2, name: "Seminaaripaperit"}, {id: 3, name: "Tieteelliset julkaisut"}]
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