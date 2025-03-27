import { UserRecord } from "firebase-admin/lib/auth/user-record";

export interface JwtPayload {
    userId: UserRecord["uid"];
    email: string;
    rol: string;
}