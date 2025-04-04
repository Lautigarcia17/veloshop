
export interface UserLogin{
    email: string,
    password: string,

}


export interface User extends UserLogin{
    name:string,
    surname:string
}


export interface UserRegister extends User{
    confirmPassword: string,
}