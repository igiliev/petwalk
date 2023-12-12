'use client';

import { useState } from "react";
import './chat.css';
import ChatMessages from "../messages/ChatMessages";
import { doc, updateDoc, arrayUnion, Timestamp, setDoc, getDoc, DocumentData, getFirestore } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useSelector } from "react-redux";
import { GetStoreData } from "../../public/interfaces/globals";
import { v4 as uuid } from "uuid";
import { currUserData } from "../../app/api/helper/users/userService";
import { usePathname } from "next/navigation";
import { UserImpl } from "../../app/redux/store";

const fetchchatUsernameseData = async () => {
    const path = usePathname();
    //Get everything after userChat/ which is the user ID
    const regex = /(?<=userChat\/).*/gm;
    const userID: string = regex.exec(path)![0];
    const firestoreChatRef = doc(db, 'chatUsernames', userID);
    const chatRefSnap = await getDoc( firestoreChatRef );
    const data = await chatRefSnap.data();
    return data;
}

const fetchChatData = async (combinedId: string) => {
    const firestoreChatRef = doc(db, 'chats', combinedId);
    const chatRefSnap = await getDoc( firestoreChatRef );
    const data = await chatRefSnap.data();
    return data;
}

const Chat = async () => {
    // const combinedId: any = useSelector<GetStoreData>( state => state.dataStore.combinedId );
    const [ chatInput, setChatInput ] = useState('');
    // const [ userData, setUserData ]: any[] = useState();
    const [ currentUserUID, setCurrentUserUID ]: any = useState();
    const [ myChatMessages, setMyChatMessages ] = useState('');
    const [ selectedUserChatMsgs, setSelectedUserChatMsgs ] = useState('');
    const combinedId: any = useSelector<GetStoreData>( state => state.dataStore.combinedId );
    const chatNames: any = useSelector<GetStoreData>( state => state.dataStore.userChatNames );
    const chatNamesData = await fetchchatUsernameseData();
    const chatData = await fetchChatData(combinedId);
    console.log(chatData);
    	
    const handleEnter = async (event: any) => {
        if ( event.key === 'Enter' && event.target.value !== '' ) {
            const userData: UserImpl[] = await currUserData();
            const senderUid: string = userData[0].uid;
            setChatInput(event.target.value);
            await updateDoc(doc(db, 'chats', combinedId), {
                messages: arrayUnion({
                    text: event.target.value,
                    senderId: senderUid,
                    date: Timestamp.now()
                })
            });
            
            await setDoc(doc(db, 'chatUsernames', currentUserUID ), {
                names: arrayUnion(chatNames.toString())
            }, { merge: true });
        }
    }

    const sendMsgClick = () => { };
    const startChat = async () => {
        const firestoreChatRef = doc(db, 'chats', combinedId);
        const chatRefSnap = await getDoc( firestoreChatRef );
        const data: DocumentData | undefined = chatRefSnap.data();
    }

    return (
        <div className="chat-wrapper m-auto mt-24 border border-black rounded">
            <div className='bg-red-300 p-5'></div>
            <div className="chat-inner flex h-full">
                <div className="w-36 bg-white h-full border-r border-black">
                    <>{ chatNamesData?.names.map( (name: string) => <p key={uuid()}>{name}</p> ) }</>
                </div>
                <div className={`w-full 'bg-white' relative`}>
                    <div className="h-full bg-yellow-100 p-5 overflow-auto overflow-y-scroll">
                        <ChatMessages myMsgs={myChatMessages} userMsgs={selectedUserChatMsgs} />
                    </div>
                    <div className='flex justify-between items-center bg-white absolute bottom-0 w-full border-1 border-black'>
                        <input onKeyDown={handleEnter} type="text" placeholder='Изпрати съобщение' className='w-full py-8 px-5 outline-none' />
                        <button onClick={sendMsgClick} className='border-1 border-black bg-red-300 mx-5 h-12 px-3 rounded text-white text-xl hover:bg-red-400'>Изпрати</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat;
