'use client';

import { createContext, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { storeActions } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";

interface ContextProps {
    children: any;
}

export const GlobalDataContext = createContext(null);

export const GlobalDataProvider = ({children}: ContextProps) => {
    const [ globalData, setGlobalData ] = useState(null);
    const dispatch = useDispatch();
    const currentUserId: string = useSelector((state: any) => state.dataStore.currentUserId);

    useEffect( () => {
        const getUserData = async () => {
            console.log(currentUserId);
            const userDataRef = doc(db, "userData", currentUserId);
            const userDataSnap = await getDoc(userDataRef);
            const data: any = userDataSnap.data();
            setGlobalData(data);

            if(userDataSnap.exists()) {
                dispatch(storeActions.setUserType( data?.userType === 'sitter' ));
            }
        }

        getUserData();
    }, [currentUserId, dispatch] );

    return(
        <GlobalDataContext.Provider value={globalData}>
            {children}
        </GlobalDataContext.Provider>
    )
}