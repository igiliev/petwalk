'use client';

import { useState } from "react";
import './chat.css';
import ChatMessages from "../messages/ChatMessages";
import { doc, updateDoc, arrayUnion, onSnapshot, Timestamp } from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import { useSelector } from "react-redux";
import { GetStoreData } from "../forms/RegistrationComplete";
import { v4 as uuid } from "uuid";
export interface ChatData {
    id: string;
    data: {
        displayName: string;
        id: string;
    } ;
}

const Chat = () => {
    const [ userChat, setUserChat ] = useState([]);
    const [ selectedUserId, setSelectedUserId ] = useState('');
    const [ chatInput, setChatInput ] = useState('');
    const [ userChatClicked, setUserChatClicked ] = useState(false);
    const [ userChatNames, setUserChatNames ] = useState(['']);
    const [ allChatUsers, setAllUsersChat ]: any = useState([]);
    const [ selectedUserMessages, setSelectedUserMessages ] = useState([]);
    const currentUserId = useSelector<GetStoreData>( state => state.dataStore.currentUserId );
    const combinedId: any = useSelector<GetStoreData>( state => state.dataStore.combinedId );
    // const chatData: any = useSelector<GetStoreData>( state => state.dataStore.chatData );
	
    const handleEnter = async (event: any) => {
        // const currentId: string = chatData.user[0].uid;
        if ( event.key === 'Enter' ) {

            // console.log(currentId);

            setChatInput(event.target.value);
            await updateDoc(doc(db, 'chats', combinedId ), {
                messages: arrayUnion({
                    id: uuid(),
                    text: event.target.value,
                    // senderId: chatData.user[0].uid,
                    date: Timestamp.now()
                })
            });
        }
    }

    const sendMsgClick = () => { };

    const userSelect = ( event: any ) => {
        
        const getSelected: ChatData = allChatUsers.find( ( user: any ) => {
            if( !user.hasOwnProperty('id') ) return;
            return user.data.displayName === event.target.innerHTML;
        } );
        console.log(currentUserId);
        console.log(getSelected);
        

        onSnapshot(doc(db, "chats", getSelected.id), (doc) => {
            if( doc.exists() ) setSelectedUserMessages(doc.data().messages);
        });
    }

	const mapNames = Object.entries(userChat).map( (user: any) => {
        if ( user.length ) {
            const combinedId: string = user[0];
            const id: string = user[1].userInfo.id;
            const name: string = user[1].userInfo.displayName;

            return <a onClick={ userSelect } key={id} className="cursor-pointer">
                { userChatNames.map( name => <p key={name} className="hover:underline p-3 text-center">{name}</p> ) }
            </a> 
        }
    });

    return (
        <div className="chat-wrapper m-auto mt-24 border border-black rounded">
            <div className='bg-red-300 p-5'></div>
            <div className="chat-inner flex h-full">
                <div className="w-36 bg-white h-full border-r border-black">
                    <div>{ mapNames }</div>
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
