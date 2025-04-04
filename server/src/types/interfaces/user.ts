import { UserRecord } from "firebase-admin/lib/auth/user-record";

export interface User{
    id: UserRecord["uid"],
    email: string,
    rol: string,
    name: string,
    surname: string
}