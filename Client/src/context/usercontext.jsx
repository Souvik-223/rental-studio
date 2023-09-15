import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({children}) {
    const [User,setUser] = useState(null);
    const [ready,setready] = useState(false);
    
    useEffect(()=>{
        if(!User){
            axios.get('/profile').then(({data})=>{
            setUser(data);
            setready(true);
           });
        }
    },[])

    return(
        <UserContext.Provider value={{User,setUser,ready}}>
            {children}
        </UserContext.Provider>
    );
}