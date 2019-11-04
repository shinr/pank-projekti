import React from "react"

import styles from "./Footer.module.css"

export const Footer = () => {
    return (<footer className={styles.footer}>
    {process.env.REACT_APP_DEVELOPMENT
            ? <div>DEVELOPMENTAL VERSION</div>
            : <div>TEST VERSION</div>}
    </footer>)
}

export default Footer;