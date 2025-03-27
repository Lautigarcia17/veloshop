import { lazy } from "react";


export const AuthPage = lazy(()=> import('./pages/AuthPage/AuthPage'));
export const NotFoundPage = lazy(()=> import('./pages/NotFound/NotFound'));