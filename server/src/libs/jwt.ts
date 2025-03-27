import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config";
import { JwtPayload } from "../types/interfaces/jwtPayload";


export async function createAccessToken(payload : JwtPayload) {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, TOKEN_SECRET as string, { expiresIn: "1d" }, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });
  }
