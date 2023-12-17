'use client';

import { useEffect, useState } from "react";
import './chat.css';
import ChatMessages from "../messages/ChatMessages";
import { doc, updateDoc, arrayUnion, Timestamp, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useSelector } from "react-redux";
import { GetStoreData } from "../../public/interfaces/globals";
import { v4 as uuid } from "uuid";
import { currUserData } from "../../app/api/helper/users/userService";
import { usePathname } from "next/navigation";
import { UserImpl } from "../../app/redux/store";

interface ChatMsgsData {
    text: string;
    date: Date;
    senderId: string;
}

const Chat = () => {
    const [ chatInput, setChatInput ] = useState('');
    const [ chatInit, setChatInit ] = useState(true);
    const [ chatUsernames, setChatUsernames ] = useState([]);
    const [ currentUserUID, setCurrentUserUID ]: any = useState();
    const [ myChatMessages, setMyChatMessages ]: any = useState([]);
    const [ selectedUserChatMsgs, setSelectedUserChatMsgs ]: any = useState([]);
    const combinedId: any = useSelector<GetStoreData>( state => state.dataStore.combinedId );
    const stateChatNames: any = useSelector<GetStoreData>( state => state.dataStore.userChatNames );
    const path = usePathname();

    useEffect( () => {
        const regex = /(?<=userChat\/).*/gm;
        const userID: string = regex.exec(path)![0];
        setCurrentUserUID(userID);

        const fetchUserNames = async () => {
            try {
                if( stateChatNames ) 
                    setChatUsernames( stateChatNames );
            } catch(error) {
                console.error(error);
            }
        }   

        fetchUserNames();
    }, [] )
    	
    const handleEnter = async (event: any) => {
        setChatInput(event.target.value);
        // if ( event.key === 'Enter' && event.target.value !== '' ) {
            // THIS WORKS BUT IS NOT GONNA BE USED YET - SAVING THE USERNAMES IN THE DB
            // await setDoc(doc(db, 'chatUsernames', currentUserUID ), {
            //     names: arrayUnion(chatNames.toString())
            // }, { merge: true });
        // }
    }

    const sendMsgClick = () => { };

    const startChat = async () => {
        setChatInit(false);
        const firestoreChatRef = doc(db, 'chats', combinedId);
        //Fetching chat data from firestore and storing it in the local state
        try {
            const chatRefSnap = await getDoc( firestoreChatRef );
            if( chatRefSnap.exists() ) {
                updateChatMsgs(chatRefSnap.data());
            } else {
                console.log('chat data was not fetched');
            }
        } catch(error) {
            console.error( error );
        }
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const userData: UserImpl[] = await currUserData();
        const senderUid: string = userData[0].uid;

        //Adding the typed in chat msg into /chats 
        await updateDoc(doc(db, 'chats', combinedId), {
            messages: arrayUnion({
                text: chatInput,
                senderId: senderUid,
                date: Timestamp.now()
            })
        });
        //Updating the DB on every submitted messsage and showing in the view
        onSnapshot(doc(db, 'chats', combinedId), (doc) => {
            updateChatMsgs(doc);
        });

        setChatInput('');
    }

    const updateChatMsgs = async (chatData: any) => {
        //TODO: Optimize this
        const { messages }: any = chatData.data();
        const myChatData: Array<ChatMsgsData> = messages.filter( (msg: ChatMsgsData) => msg.senderId === currentUserUID );
        const userChatData: Array<ChatMsgsData> = messages.filter( (msg: ChatMsgsData) => msg.senderId !== currentUserUID );
        const storeMyText: string[] = [];
        const storeUserText: string[] = [];
        userChatData.forEach( data => storeUserText.push(data.text) );
        myChatData.forEach( data => storeMyText.push(data.text) );
        setMyChatMessages(storeMyText);
        setSelectedUserChatMsgs(storeUserText);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="chat-wrapper m-auto mt-24">
                <div className='bg-red-300 p-5'></div>
                <div className="chat-inner flex h-full">
                    <div className="w-36 bg-white h-full">
                    <>
                        { chatUsernames.map( name => (
                            <p className="text-center my-2 text-xl hover:cursor-pointer" key={uuid()} onClick={startChat}>{ name }</p>
                        ))}
                    </>
                    </div>
                    <div className={`w-full 'bg-white' relative`}>
                        <div className="h-full bg-purple-400 p-5 overflow-auto overflow-y-scroll">
                            <ChatMessages myMsgs={myChatMessages} userMsgs={selectedUserChatMsgs} chatInit={chatInit} />
                        </div>
                        <div className='flex justify-between items-center w-full'>
                            <input onChange={handleEnter} type="text" placeholder='Изпрати съобщение' value={chatInput} className='w-full py-8 px-5 outline-none' />
                            <button onClick={sendMsgClick} className='border-1 border-black bg-red-300 mx-5 h-12 px-3 rounded text-white text-xl hover:bg-red-400'>Изпрати</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Chat;
