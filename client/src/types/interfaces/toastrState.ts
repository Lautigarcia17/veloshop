import { ToastrType } from "../type/ToastrContextProps";

export interface ToastrState {
    message: string;
    type: ToastrType;
    open: boolean;
    closeToastr?: () => void;
}