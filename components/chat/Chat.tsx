'use client';

import { useEffect, useState } from "react";
import './chat.css';
import ChatMessages from "../messages/ChatMessages";
import { doc, updateDoc, arrayUnion, Timestamp, getDoc, onSnapshot, collection, query, where, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useSelector } from "react-redux";
import { GetStoreData } from "../../public/interfaces/globals";
import { v4 as uuid } from "uuid";
import { currUserData } from "../../app/api/helper/users/userService";
import { usePathname } from "next/navigation";
import { UserImpl } from "../../app/redux/store";
import ChatNames from "./ChatNames";

interface ChatMsgsData {
    text: string;
    date: Date;
    senderId: string;
}

interface Usernames {
    sitterName: string;
    ownerName: string;
    combinedId: string;
}

const Chat = () => {
    const [ chatInput, setChatInput ] = useState('');
    const [ chatInit, setChatInit ] = useState(true);
    const [ isSitter, setIsSitter ] = useState(false);
    const [ chatUsernames, setChatUsernames ] = useState([]);
    const [ currentUserUID, setCurrentUserUID ] = useState('');
    const [ myChatMessages, setMyChatMessages ]: any = useState([]);
    const [ selectedUserChatMsgs, setSelectedUserChatMsgs ]: any = useState([]);
    const [ currOwnerChatnames, setCurrOwnerChatnames ] = useState([]);
    const [ currSitterChatnames, setCurrSitterChatnames ] = useState([]);
    const [ allMessagesPage, setAllMessagesPage ] = useState(false);

    const combinedId: any = useSelector<GetStoreData>( state => state.dataStore.combinedId );
    const stateChatNames: any = useSelector<GetStoreData>( state => state.dataStore.userChatNames );
    const chatData: any = useSelector<GetStoreData>(state => state.dataStore.chatData);
    const path = usePathname();
    const currentUserId: string = useSelector((state: any) => state.dataStore.currentUserId);

    useEffect( () => {
        const regex = /(?<=userChat\/).*/gm;
        const userID: string = path !== '/userChat' ? regex.exec(path)![0] : '';
        path.includes('/messages') && setAllMessagesPage(true); 
        setCurrentUserUID(userID);

        try {
            onSnapshot(doc(db, 'userData', currentUserUID), (doc) => {
                if( !doc.exists() ) return;
                
                const { userType } = doc.data();
                console.log(userType);
                setIsSitter( userType === 'sitter' );
            });
        } catch {
            console.error('currentUserId in ListingItems is undefined');
        }

        //Feching all the chats user names from local state
        const fetchStateUserNames = async () => {
            try {
                if( stateChatNames ) {
                    setChatUsernames( stateChatNames );
                } 
            } catch(error) {
                console.error('fetchStateUserNames: ', error);
            }
        }

        //Fetching all the chat user names from firestore /chatUsernames
        const fetchDBUserNames = async () => {
            const userData: UserImpl[] = await currUserData();
            const innerData: UserImpl = userData[0];
            let uid = '';

            if ( innerData ) {
                uid = innerData.uid;
            }

            checkForMissedMsgs(uid);

            try {
                const userNamesRef = doc(db, 'chatUsernames', uid);
                const userNamesData = await getDoc(userNamesRef);
                //If we have user names from db and there are no user name in local state
                if ( userNamesData.exists() && stateChatNames.length === 0 ) {
                    const namesData: any = userNamesData.data();
                    setChatUsernames(namesData.names);
                } 
            } catch(error) {
                console.error('fetchDBUserNames: ', error);
            }
        }

        const checkForMissedMsgs = async (myId: string) => {
            try {
                const f = query(collection(db, 'chats'), where("idField", ">=", myId));
                const querySnapshot = await getDocs(f);
                //TODO: remove this log after everything works
                querySnapshot.forEach( (doc) => (
                    console.log(doc.id, '=>', doc.data())
                ) );
                const chatsRef = doc(db, 'chats', myId);
                const chatsSnap = await getDoc(chatsRef);

                if ( chatsSnap.exists() ) {
                    console.log(chatsSnap.data());
                }

            } catch(error) {
                console.log('checkForMissedMsgs: ', error);
            }
        }

        const getChatNames = async () => {
            try {
                const namesQuery = query(collection(db, 'chatUsernames'));
                const querySnapshot = await getDocs(namesQuery);

                querySnapshot.forEach( (doc) => {
                    const senderUid = doc.id.replace(currentUserId, '');
                    // console.log('myID: ', currentUserId);
                    // console.log('all IDS: ', doc.id);

                    if( doc.id.includes(senderUid) ) {
                        const nameData = doc.data();
                        console.log('2', chatUsernames);
                        console.log(isSitter);
                        if(isSitter && allMessagesPage) {
                            setChatUsernames((prevName: any): any => {
                                return [...prevName, nameData.ownerName];
                            });
                            // setCurrSitterChatnames((prevName: any) => {
                                //     console.log(prevName);
                                //     if(!prevName.includes(nameData.sitterName)) 
                                //         return [...prevName, nameData.names];
                                
                                //     return prevName;
                                // } );
                        }
                        else if(!isSitter && allMessagesPage) {
                            setChatUsernames((prevName: any): any => {
                                return [...prevName, nameData.sitterName];
                            });
                        }
                        // console.log(doc.id);
                        // console.log('senderId: ', senderUid);

                        // setCurrOwnerChatnames((prevName: any) => {
                        //     console.log(prevName);
                        //     if(!prevName.includes(nameData.sitterName)) 
                        //         return [...prevName, nameData.names];
        
                        //     return prevName;
                        // } );
                    }
                } );
            } catch(error) {
                console.log(' Something wrong with the chatNames fetching ',error);
            }
        }

        fetchStateUserNames();
        fetchDBUserNames();
        getChatNames();
    } );
    	
    const handleEnter = async (event: any) => {
        setChatInput(event.target.value);
    }

    const sendMsgClick = () => { };

    //Triggered when one of the user chat names is clicked
    const startChat = async () => {
        setChatInit(false);
        const firestoreChatRef = doc(db, 'chats', combinedId);
        //Fetching chat data from firestore and storing it in the local state
        try {
            const chatRefSnap = await getDoc( firestoreChatRef );
            // console.log(chatRefSnap.data());
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

    // console.log(currOwnerChatnames);

    return (
        <form className="chat-form" onSubmit={handleSubmit}>
            <div className="chat-wrapper m-auto mt-48">
                <div className='bg-green-2 p-6'></div>
                <div className="chat-inner flex flex-col sm:flex-row">
                    <div className="sm:w-36 w-full bg-white">
                        <ChatNames names={chatUsernames} messagesPage={allMessagesPage} />
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
