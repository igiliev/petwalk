'use client';

import { useState } from "react";
import './chat.css';
import ChatMessages from "../messages/ChatMessages";
import { doc, updateDoc, arrayUnion, onSnapshot, Timestamp, collection, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useSelector } from "react-redux";
import { GetStoreData, ChatInpData, CurrentUserImpl } from "../../public/interfaces/globals";
import { v4 as uuid } from "uuid";
import { useEffect } from "react";
import { getUserData, currUserData } from "../../app/api/helper/users/userService";
import { usePathname } from "next/navigation";

const Chat = () => {
    const [ chatInput, setChatInput ] = useState('');
    const [ userData, setUserData ]: any[] = useState();
    const [ currentUserUID, setCurrentUserUID ]: any = useState();
    const [ userChatClicked, setUserChatClicked ] = useState(false);
    const [ userChatNames, setUserChatNames ]: any = useState([]);
    const [ selectedUserMessages, setSelectedUserMessages ] = useState([]);
    const combinedId: any = useSelector<GetStoreData>( state => state.dataStore.combinedId );
    const chatNames: any = useSelector<GetStoreData>( state => state.dataStore.userChatNames );
    const path = usePathname();
    const chatNamesRef = collection(db, 'chatUsernames');

    useEffect( () => {
        currUserData().then( data => setUserData(data[0]) );
        //Get everything after userChat/ which is the user ID
        const regex = /(?<=userChat\/).*/gm;
        const userID: string = regex.exec(path)![0];
        setCurrentUserUID(userID);
        console.log(userID);

        const chatNamesFunc = async () => {
            const firestoreChatRef = doc(db, 'chatUsernames', userID);
            const chatRefSnap = await getDoc( firestoreChatRef );
            const data = chatRefSnap.data();
            setUserChatNames(data?.names);
        }
        
        console.log(chatNames);
        chatNamesFunc();
        // console.log(userChatNames);
    }, [ path, chatNames ] );
	
    const handleEnter = async (event: any) => {
        const senderUid: string = userData.uid;
        if ( event.key === 'Enter' && event.target.value !== '' ) {
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
    // const mapedChatNames = userChatNames.map( (name: string) => <p>{name}</p> );

    return (
        <div className="chat-wrapper m-auto mt-24 border border-black rounded">
            <div className='bg-red-300 p-5'></div>
            <div className="chat-inner flex h-full">
                <div className="w-36 bg-white h-full border-r border-black">
                    {/* { mapedChatNames } */}
                </div>
                <div className={`w-full ${userChatClicked ? 'bg-white' : 'bg-gray-200'} relative`}>
                    <div className="h-full bg-yellow-100 p-5 overflow-auto overflow-y-scroll">
                        <ChatMessages combinedId={combinedId} messages={chatInput} selectedUserMsgs={selectedUserMessages} />
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
