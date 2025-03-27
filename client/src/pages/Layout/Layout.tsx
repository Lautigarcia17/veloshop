import { Outlet } from "react-router-dom"
import styles from './Layout.module.css'
import NavBar from "../../components/NavBar/NavBar"

function Layout() {
    

    return (
        <div className={styles.container}>
            <NavBar/>
            <Outlet />
        </div>
    )

};

export default Layout