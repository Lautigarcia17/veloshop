import { createContext, ReactNode, useRef, useState } from "react";
import { ToastrContextProps, ToastrType } from "../types/type/ToastrContextProps";
import { ToastrState } from "../types/interfaces/toastrState";
import Toastr from "../components/Toastr/Toastr";


export const toastrContext = createContext<ToastrContextProps | undefined>(undefined);

export default function ToastrProvider({children} : {children:ReactNode}){

    const [toastr,setToastr] = useState<ToastrState>({
        message:'',
        type: 'success',
        open: false
    })

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const showToastr = (message : string, type: ToastrType) => {
        setToastr({message,type, open: true});

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            closeToastr();
        }, 3000);
    }

    const closeToastr = ()=>{
    
        setToastr((prev) => ({ ...prev, open: false }))
        
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    }


    return(
        <toastrContext.Provider value={{showToastr}}>
            {children}
            <Toastr message={toastr.message} type={toastr.type} open={toastr.open} closeToastr={closeToastr} />
        </toastrContext.Provider>
    )
}