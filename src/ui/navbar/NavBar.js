import React from "react"

import NavButton from "../../components/navbar/NavButton"

import styles from "./NavBar.module.css"

export const NavBar = ({ children }) => {
    return (
        <nav className={styles.navbar}>
            {children.map((navItem) =>
                <NavButton component={navItem} />)}
        </nav>);
}

export default NavBar;