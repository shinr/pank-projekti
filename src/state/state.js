import React, { useReducer, useContext, createContext } from "react"

export const UserStateContext = createContext();

export const UserStateProvider = ({ reducer, initialState, children }) => (
    <UserStateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </UserStateContext.Provider>)

export const useUserStateValue = () => useContext(UserStateContext)

export const userState = {
    Context: UserStateContext,
    Provider: UserStateProvider,
    value: useUserStateValue
}