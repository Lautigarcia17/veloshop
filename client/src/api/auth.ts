
import { User } from '../types/interfaces/auth';
import axios from './axiosConfig'

export function logInRequest(user  : User){
    return axios.post('/auth/login', user)
}

export function registerRequest(user : User){
    return axios.post('/auth/register', user);
}

export function logoutRequest(){
    return axios.get('/auth/logout');
}

export function verifyTokenRequest(){
    return axios.get('auth/verify');
}