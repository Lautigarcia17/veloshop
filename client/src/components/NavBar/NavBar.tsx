import { NavLink } from 'react-router-dom'
import styles from './NavBar.module.css'
import logo from '../../assets/icon.png'

function NavBar() {
    const handleLogout = async () => {
        // await signOut();
        // toast.success(`You have logged out, see you later !!`, { position: 'top-right', duration: 2000 })
    }

    return (
        <>

            <nav className={styles.navbar}>
                <div className={styles.navbarContainer}>


                    <button className={styles.navbarLogo}>
                        <h1 className={styles.textLogo}>V</h1>
                        <img src={logo} className={styles.logo} alt="logo" />
                        <h1 className={styles.textLogo}>LO SHOP</h1>
                    </button>


                    <button className={styles.btnLogout} onClick={handleLogout}>
                        <NavLink to='/auth'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#ffffff" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h7v2zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z" /></svg>
                        </NavLink>
                    </button>

                </div>
            </nav>


        </>
    )
}

export default NavBar