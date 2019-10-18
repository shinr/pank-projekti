import React from "react"

import styles from "./NavButton.module.css"

export const NavButton = ({ component }) => {
    return (
        <div className={styles.navbutton}>
            {component}
        </div>)
}

export default NavButton;