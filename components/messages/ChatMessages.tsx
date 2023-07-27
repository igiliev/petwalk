'use client';

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../firebase/config";

const ChatMessages = ( props: any ) => {
    const [ usersChat, setUsersChat ]: any[] = useState([]);
    const currentUserId: string = useSelector( (state: any) => state.dataStore.currentUserId );

    useEffect( () => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUserId), (doc) => {
                return setUsersChat(doc.data());
            });
      
            return () => {
              unsub();
            };
          };
      
          currentUserId && getChats();
    }, [ currentUserId ] );

    // console.log(usersChat);

    return (
        <div className="messageContainer">
            <div className="w-full mb-5">
                <div className="bg-white w-40 text-center py-3 text-xl rounded-lg">
                    <p></p>
                </div>                    
            </div>

            <div className="w-full">
                <div className="bg-blue-300 w-40 text-center py-3 text-white text-xl rounded-lg float-right">
                    <p>{props.message}</p>
                </div>
            </div>
        </div>
    )
}

export default ChatMessages;
