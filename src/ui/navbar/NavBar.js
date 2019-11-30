import React from "react"

import NavButton from "../../components/navbar/NavButton"
import Login from "../login"
import Logo from "../../images/logo2.jpg"

import styles from "./NavBar.module.css"

export const NavBar = ({ children }) => {
    return (
        <nav className={styles.navbar}>
            <img className={styles.pank_logo} src={Logo}></img>
            {children.map((navItem) =>
                <NavButton component={navItem} />)}
            <Login />
        </nav>);
}

export default NavBar;
