'use client';

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import Chat from "../../../components/chat/Chat";
import Header from "../../../components/header/Header";
import { storeActions } from "../../redux/store";

const UserChats = () => {

    const dispatch = useDispatch();
    const currentUserId: string = useSelector((state: any) => state.dataStore.currentUserId);

    useEffect( () => {
        const getUserData = async () => {
            const userDataRef = doc(db, "userData", currentUserId);
            const userDataSnap = await getDoc(userDataRef);
            const data = userDataSnap.data();

            if(userDataSnap.exists()) {
                dispatch(storeActions.setUserType( data?.userType === 'sitter' ));
            }
        }
        getUserData();
    }, [currentUserId, dispatch] );
    
    return (
        <div>
            <p>Dynamic user chats</p>
            <Header />
            <Chat />
        </div>
    )
}

export default UserChats;