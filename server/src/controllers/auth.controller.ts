import { auth, db } from '../config';
import { ERROR_MESSAGES } from '../constants/errorMessages'
import { Request, Response } from 'express';
import { User } from '../types/interfaces/user';
import axios from 'axios';

export class AuthController {

    static async register(req: Request, res: Response): Promise<void> {
        try {
            const { email, password, rol, name, surname } = req.body;

            const userAuth = await auth.getUserByEmail(email).catch(() => null);
            if (userAuth) {
                res.status(400).json({
                    code: 'EMAIL_IN_USE',
                    message: ERROR_MESSAGES.auth.EMAIL_IN_USE,
                });
                return;
            }

            const firebaseResponse = await axios.post(
                `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.FIREBASE_API_KEY}`,
                { email, password, returnSecureToken: true }
            );
            const { idToken, localId } = firebaseResponse.data;


            const userRol = rol === 'admin' ? 'admin' : 'customer';
            const newUser: User = {
                id: localId,
                email: email ?? '',
                rol: userRol,
                name: name,
                surname: surname
            };

            try {
                await db.collection('users').doc(newUser.id).set(newUser);
            } catch (error) {
                await auth.deleteUser(newUser.id);
                res.status(500).json({
                    code: 'DB_SAVE_FAILED',
                    message: 'Error guardando el usuario en la base de datos.',
                });
                return;
            }


            res.cookie("token", idToken, {
                httpOnly: process.env.NODE_ENV !== "development",
                secure: true,
                sameSite: "none",
                maxAge: 24 * 60 * 60 * 1000, // 1 día
            });

            res.status(201).json(newUser);

        } catch (error) {
            console.error(error);
            res.status(500).json({
                code: 'INTERNAL_SERVER_ERROR',
                message: ERROR_MESSAGES.general.INTERNAL_SERVER_ERROR,
            });
        }
    }




    static async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;


            const firebaseResponse = await axios.post(
                `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`,
                { email, password, returnSecureToken: true }
            );

            const { idToken, localId } = firebaseResponse.data;

            const decodedToken = await auth.verifyIdToken(idToken);
            if (!decodedToken) {
                res.status(401).json({ code: "INVALID_TOKEN", message: "Invalid token" });
                return;
            }

            const userDoc = await db.collection("users").doc(localId).get();
            const rol = userDoc.exists ? userDoc.data()?.rol : "customer";

            res.cookie("token", idToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                // sameSite: "none",
                sameSite: "lax",
                maxAge: 24 * 60 * 60 * 1000, 
            });

            res.status(200).json({
                message: "Login successful!",
                id: localId,
                email: decodedToken.email,
                rol: rol
            });
        } catch (error: any) {
            console.error("Login Error:", error?.response?.data || error.message);

            if (error.response?.data?.error) {
                const firebaseError = error.response.data.error.message;

                let errorMessage = ERROR_MESSAGES.auth.INVALID_CREDENTIALS;
                let errorCode = "INVALID_CREDENTIALS";

                if (firebaseError.includes("INVALID_PASSWORD")) {
                    errorMessage = ERROR_MESSAGES.auth.INCORRECT_PASSWORD;
                    errorCode = "INCORRECT_PASSWORD";
                } else if (firebaseError.includes("EMAIL_NOT_FOUND")) {
                    errorMessage = ERROR_MESSAGES.auth.EMAIL_NOT_FOUND;
                    errorCode = "EMAIL_NOT_FOUND";
                }

                res.status(400).json({ code: errorCode, message: errorMessage });
                return;
            }

            res.status(500).json({
                code: "INTERNAL_SERVER_ERROR",
                message: ERROR_MESSAGES.general.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async logout(req: Request, res: Response): Promise<void> {
        try {

            const uid = req.user?.uid;
    
            await auth.revokeRefreshTokens(uid);

            res.clearCookie("token", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            });
    
            res.json({ message: "Logged out successfully" });
        } catch (error) {
            console.error("Logout Error:", error);
            res.status(500).json({
                code: "LOGOUT_ERROR",
                message: ERROR_MESSAGES.general.LOGOUT_ERROR,
            });
        }
    }

    static async getAuthenticatedUser(req: Request, res: Response): Promise<void> {
        res.json({
            id: req.user?.id,
            email: req.user?.email,
            role: req.user?.rol ?? "customer",
            name: req.user?.name,
            surname: req.user?.surname
          });
    }


}