
import { User, UserLogin } from '../types/interfaces/auth';
import axios from './axiosConfig'

export function logInRequest(user  : UserLogin){
    return axios.post('api/auth/login', user)
}

export function registerRequest(user : User){
    return axios.post('api/auth/register', user);
}

export function logoutRequest(){
    return axios.post('api/auth/logout');
}

export function getUserDataRequest(){
    return axios.get('api/auth/session');
}