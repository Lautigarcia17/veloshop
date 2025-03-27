import dotenv from "dotenv"
import admin from 'firebase-admin'

dotenv.config();



admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
  });


export const PORT = process.env.PORT || 3000;
export const TOKEN_SECRET = process.env.TOKEN_SECRET;
export const MONGODB_URL = process.env.MONGODB_URL;

export const db = admin.firestore();
export const auth = admin.auth();