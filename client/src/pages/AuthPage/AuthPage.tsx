import { useState } from 'react'
import Login from './Login/Login'
import Register from './Register/Register'
import styles from './AuthPage.module.css'


function AuthPage() {
    const [showLogin, setShowLogin] = useState(true);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.card}>
                        {showLogin ? <Login setShowLogin={setShowLogin} /> : <Register setShowLogin={setShowLogin}/>}
                    </div>
                </div>
            </div>
        </>
    )

};

export default AuthPage


