'use client';

import { useContext, useEffect, useState } from "react";
import './chat.css';
import ChatMessages from "../messages/ChatMessages";
import { doc, updateDoc, arrayUnion, Timestamp, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useSelector } from "react-redux";
import { GetStoreData } from "../../public/interfaces/globals";
import { currUserData } from "../../app/api/helper/users/userService";
import { usePathname } from "next/navigation";
import { UserImpl } from "../../app/redux/store";
import ChatNames, { UserName } from "./ChatNames";
import { GlobalDataContext } from "../../app/context/GlobalDataProvider";

interface ChatMsgsData {
    text: string;
    date: Date;
    senderId: string;
}

const Chat = () => {
    const [ chatInput, setChatInput ] = useState('');
    const [ chatInit, setChatInit ] = useState(true);
    const [ currentUserUID, setCurrentUserUID ] = useState('');
    const [ myChatMessages, setMyChatMessages ]: any = useState([]);
    const [ selectedUserChatMsgs, setSelectedUserChatMsgs ]: any = useState([]);
    const [ allMessagesPage, setAllMessagesPage ] = useState(false);
    const [ selectedUser, setSelectedUser ]: any = useState();

    let combinedId: any = useSelector<GetStoreData>( state => state.dataStore.combinedId );
    const chatData: any = useSelector<GetStoreData>(state => state.dataStore.chatData);
    const path = usePathname();
    const currentUserId: string = useSelector((state: any) => state.dataStore.currentUserId);
    const data = useContext(GlobalDataContext);
    const isSitter: boolean = data?.userType === 'sitter';

    useEffect( () => {
        const regex = /(?<=userChat\/).*/gm;
        path.includes('/messages') && setAllMessagesPage(true);
        const userID: string = path !== '/userChat' && !allMessagesPage ? regex.exec(path)![0] : '';
        setCurrentUserUID(userID);
        //Feching all the chats user names from local state

    },[path, allMessagesPage] );
    	
    const handleEnter = async (event: any) => {
        setChatInput(event.target.value);
    }

    const sendMsgClick = () => { };

    //Triggered when one of the user chat names is clicked
    const startChat = async (user?: UserName) => {
        setChatInit(false);
        if(user?.name.length) setSelectedUser(user);
        //if we are in the /messages page get the id from the ChatNames comp
        if(allMessagesPage) combinedId = user?.id;
        const firestoreChatRef = doc(db, 'chats', combinedId);
        //Fetching chat data from firestore and storing it in the local state
        try {
            const chatRefSnap = await getDoc( firestoreChatRef );
            if( chatRefSnap.exists() ) {
                updateChatMsgs(chatRefSnap);
            } else {
                console.log('chat data was not fetched');
            }
        } catch(error) {
            console.error( error );
        }
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setChatInput('');
        const userData: UserImpl[] = await currUserData();
        const senderUid: string = userData[0].uid;
        //Adding the typed in chat msg into /chats 
        await updateDoc(doc(db, 'chats', combinedId), {
            messages: arrayUnion({
                text: chatInput,
                senderId: senderUid,
                date: Timestamp.now(),
                isRead: !isSitter && true
            })
        });

        // Owner creates chatUsername when sending a message
        if(!isSitter) {
            await setDoc(doc(db, 'chatUsernames', combinedId), {
                combinedId,
                ownerName: userData[0].displayName,
                sitterName: selectedUser.name
            });
        }

        //Updating the DB on every submitted messsage and showing in the view
        onSnapshot(doc(db, 'chats', combinedId), (doc) => {
            updateChatMsgs(doc);
        });
    };

    const updateChatMsgs = async (chatData: any) => {
        const { messages }: any = chatData.data();
        const storeMyText: string[] = [];
        const storeUserText: string[] = [];
    
        if (messages) {
            messages.forEach((msg: ChatMsgsData) => {
                if (msg.senderId === currentUserUID) {
                    storeMyText.push(msg.text);
                } else {
                    storeUserText.push(msg.text);
                }
            });
        }
    
        setMyChatMessages(storeMyText);
        setSelectedUserChatMsgs(storeUserText);
    };

    return (
        <form className="chat-form" onSubmit={handleSubmit}>
            <div className="chat-wrapper m-auto mt-48">
                <div className='bg-green-2 p-6'></div>
                <div className="chat-inner flex flex-col sm:flex-row">
                    <div className="sm:w-36 w-full bg-white">
                        <ChatNames startChat={startChat} messagesPage={allMessagesPage}/>
                    </div>
                    <div className={`w-full 'bg-white' relative`}>
                        <div className="h-full bg-grey-2 p-5 overflow-auto overflow-y-scroll">
                            <ChatMessages myMsgs={myChatMessages} userMsgs={selectedUserChatMsgs} chatInit={chatInit} />
                        </div>
                    </div>
                </div>
                
                <div className='flex bg-white justify-between items-center w-full'>
                    <input onChange={handleEnter} type="text" placeholder='Изпрати съобщение' value={chatInput} className='w-full py-8 px-5 outline-none sm:pl-32' />
                    <button onClick={sendMsgClick} className='border-1 border-black bg-green-2 mx-5 h-12 px-3 rounded text-white text-xl hover:bg-red-400'>Изпрати</button>
                </div>
            </div>
        </form>
    )
};

export default Chat;
