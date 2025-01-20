'use client';

import { createContext, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useSelector } from "react-redux";
import { GetStoreData } from "../../public/interfaces/globals";

interface ContextProps {
    children: any;
}

interface UserDataProps {
    uid: string;
    userType: string;
    name: string;
}

export const GlobalDataContext = createContext<UserDataProps | undefined>(undefined);
export const GlobalDataProvider = ({children}: ContextProps) => {
    const [ data, setData ] = useState(undefined);
    const currentUserId: string = useSelector((state: any) => state.dataStore.currentUserId);
    const userLoggedin = useSelector<GetStoreData>(state => state.dataStore.userLoggedin);

    useEffect( () => {
        const getUserData = async () => {
            const userDataRef = doc(db, "userData", currentUserId);
            const userDataSnap = await getDoc(userDataRef);
            const data: any = userDataSnap.data();
            setData(data);
        }

        if( userLoggedin && currentUserId ) getUserData();
    }, [currentUserId, userLoggedin] );

    return(
        <GlobalDataContext.Provider value={data}>
            {children}
        </GlobalDataContext.Provider>
    )
}
