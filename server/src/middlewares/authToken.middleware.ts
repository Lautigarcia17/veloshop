
import { auth, db} from "../config.js";
import { ERROR_MESSAGES } from '../constants/errorMessages.js'
import { NextFunction, Request, Response } from "express";

export async function authToken(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { token } = req.cookies;

    if (!token) {
      res.status(401).json({ code: "NO_TOKEN_PROVIDED", message: "No token provided" });
      return;
    }

    const decodedToken = await auth.verifyIdToken(token, true);

    const userDoc = await db.collection("users").doc(decodedToken.uid).get();
    if (!userDoc.exists) {
      res.status(404).json({ code: "USER_NOT_FOUND", message: "User not found in database" });
      return;
    }

    req.user = userDoc.data();

    next();
  } catch (error: any) {
    console.error("Auth Middleware Error:", error);

    if (error.code === "auth/id-token-expired") {
      res.status(401).json({ code: "TOKEN_EXPIRED", message: "Session expired, please log in again" });
      return;
    }

    res.status(401).json({ code: "INVALID_TOKEN", message: "Invalid token" });
  }
}