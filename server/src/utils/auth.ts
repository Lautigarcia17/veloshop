import jwt, { JwtPayload } from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config';

export function verifyTokenHelper(token: string): JwtPayload | null {
    try {
      return jwt.verify(token, TOKEN_SECRET as string) as JwtPayload;
    } catch (error) {
      console.error("Token verification failed:", error);
      return null; 
    }
  }