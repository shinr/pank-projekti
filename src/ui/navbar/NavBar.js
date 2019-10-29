import React from "react"

import { UserStateProvider, UserStateContext, useUserStateValue } from "../../state/state"
import { userReducer } from "../../state/reducers"
import NavButton from "../../components/navbar/NavButton"
import Login from "../login"

import styles from "./NavBar.module.css"

export const NavBar = ({ children }) => {
    return (
        <nav className={styles.navbar}>
            {children.map((navItem) =>
                <NavButton component={navItem} />)}
            <UserStateProvider initialState={{ user: null, role: null, token: null }} reducer={userReducer}>
            <Login />
            </UserStateProvider>
        </nav>);
}

export default NavBar;