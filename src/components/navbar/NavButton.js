import React from "react"

import styles from "./NavButton.module.css"

export const NavButton = ({ component, children, classes = [] }) => {
    const additionalStyles = classes.join(" ")
    return (
        <div className={`${styles.navbutton} ${additionalStyles}`}>
            {component || children}
        </div>)
}

export default NavButton;