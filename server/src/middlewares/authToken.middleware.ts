
import { auth} from "../config.js";
import { ERROR_MESSAGES } from '../constants/errorMessages.js'
import { NextFunction, Request, Response } from "express";

export async function authToken(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { token } = req.cookies;

    if (!token) {
      res.status(401).json({
        code: "AUTHORIZATION_DENIED",
        message: "Authorization denied: No token provided",
      });
      return;
    }

    const decodedToken = await auth.verifyIdToken(token, true); 
    if (!decodedToken) {
      res.status(401).json({
        code: "INVALID_TOKEN",
        message: ERROR_MESSAGES.general.INVALID_TOKEN,
      });
      return;
    }

    const user = await auth.getUser(decodedToken.uid);
    if (user.tokensValidAfterTime) {
      const validSince = Math.floor(new Date(user.tokensValidAfterTime).getTime() / 1000);
      if (decodedToken.auth_time < validSince) {
        res.status(401).json({
          code: "TOKEN_EXPIRED",
          message: ERROR_MESSAGES.general.TOKEN_EXPIRED,
        });
        return;
      }
    }

    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    res.status(401).json({
      code: "INVALID_TOKEN",
      message: ERROR_MESSAGES.general.INVALID_TOKEN,
    });
  }
}