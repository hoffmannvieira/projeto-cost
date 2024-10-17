import { Outlet } from "react-router-dom"
import styles from "./Container.module.scss"

const Container = (props) => {
    return <div className={`${styles.container} ${styles[props.customClass]}`}>
        <Outlet />
        {props.children}
        </div>
}


export default Container