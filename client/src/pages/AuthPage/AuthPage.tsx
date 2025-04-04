import { useEffect, useState } from 'react'
import Login from './Login/Login'
import Register from './Register/Register'
import styles from './AuthPage.module.css'
import { motion, AnimatePresence } from "framer-motion"

function AuthPage() {
    const [showLogin, setShowLogin] = useState(true);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
    setHasMounted(true);
    }, []);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.card}>
                        <AnimatePresence mode='wait'>
                            {showLogin ? (
                                <motion.div
                                style={{ width: "100%", height: "100%" }}
                                    key="login"
                                    initial={ hasMounted ? { opacity: 0, x: 20 } : false}
                                    animate={hasMounted ? { opacity: 1, x: 0 } : false}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Login setShowLogin={setShowLogin} />
                                </motion.div>) : (
                                <motion.div
                                style={{ width: "100%", height: "100%" }}
                                    key="register"
                                    initial={ hasMounted ? { opacity: 0, x: -20 } : false}
                                    animate={hasMounted ? { opacity: 1, x: 0 } : false}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.3 }}
                                >

                                    <Register setShowLogin={setShowLogin} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </>
    )

};

export default AuthPage


