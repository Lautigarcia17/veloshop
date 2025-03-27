import { ToastrType } from "../types/type/ToastrContextProps";

type ToastrStyles ={
    [key in ToastrType]:{
        backgroundColor: string;
        borderColor: string;
        color: string;
    }
}

export const toastrStyles : ToastrStyles = {
    success: {
        backgroundColor: '#191d20',
        borderColor: '#cce8cd',
        color: '#cce8cd',
    },
    error: {
        backgroundColor: '#250c0c',
        borderColor: '#f44336',
        color: '#f44336',
    },
    info: {
        backgroundColor: '#0c1b33',
        borderColor: '#2196f3',
        color: '#bbdefb',
    },
    warning: {
        backgroundColor: '#332b0c',
        borderColor: '#ff9800',
        color: '#ffcc80',
    }
};