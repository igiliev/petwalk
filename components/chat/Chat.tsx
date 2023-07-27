'use client';

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import './chat.css';
import ChatMessages from "../messages/ChatMessages";
import { onSnapshot, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../firebase/config";
import { getUser } from "../../app/api/helper/users/userService";

const Chat = () => {
    const [ usersChat, setUsersChat ]: any[] = useState([]);
    const [ userChatClicked, setUserChatClicked ] = useState(false);
    const [ currCombinedId, setCurrCombinedId ] = useState('');
    const [ messages, setMessages ] = useState([]);
    const [ chatInput, setChatInput ] = useState('');
    const [ selectedUserId, setSelectedUserId ] = useState('');
    const [ selectedUsername, setSelectedUsername ] = useState('');
    const currentUserId: string = useSelector( (state: any) => state.dataStore.currentUserId );
    const combinedId: string = useSelector( (state: any) => state.dataStore.combinedId );

    useEffect( () => {
        //TODO: use onSnapshot instead of getDoc
        // const getChats = async () => {
        //     const unsub = await onSnapshot(doc(db, "userChats", currentUserId), (doc) => {
        //         return setUsersChat( (prevData: any) => [...prevData, doc.data() ] );
        //     });
            
        //     return () => {
        //         unsub();
        //     };
        // };
        //   currentUserId && getChats();
        const getChats = async () => {
            const res = await getDoc(doc(db, "userChats", combinedId ));

            if ( res.exists() ) {
                console.log(res.data());
                setUsersChat( Object.entries(res.data()) );
            } else { console.error('User was not fetched from /userChats') }

            //unsubbing
            return () => {
                getChats();
            }
        }

        currentUserId && getChats();
    }, [ messages ] );

    const handleEnter = async (event: any) => {
        setChatInput(event.target.value);

        if ( event.key === 'Enter' ) {
            await updateDoc(doc(db, 'chats', currCombinedId ), {
                messages: arrayUnion({
                    text: event.target.value,
                    id: currentUserId,
                    userId: selectedUserId,
                })
           });

        }
    }

    const sendMsgClick = () => {

    }

    const mapNames = usersChat.map( (user: any) => {    
        const combinedId: string = user[0];
        const id: string = user[1].userInfo.id;
        const name: string = user[1].userInfo.displayName;
        return <a onClick={ () => userSelect(combinedId, id, name)} key={id} className="cursor-pointer">
            <p className="hover:underline p-3 text-center">{ name }</p>
        </a> 
    }); 

    const userSelect = (combinedId: string, selectedId: string, name: string) => {
        onSnapshot(doc(db, "chats", combinedId), (doc) => {
            return doc.exists() && setMessages(doc.data().messages);
        });
        setSelectedUserId(selectedId);
        setCurrCombinedId(combinedId);
        setSelectedUsername(name);
    }
    
    return (
        <div className="chat-wrapper m-auto mt-24 border border-black rounded">
            <div className='bg-red-300 p-5'></div>
            <div className="chat-inner flex h-full">
                <div className="w-36 bg-white h-full border-r border-black">
                    <div>{ mapNames }</div>
                </div>
                <div className={`w-full ${userChatClicked ? 'bg-white' : 'bg-gray-200'} relative`}>
                    <div className="h-full bg-yellow-100 p-5">
                        { messages.map( (message: any) => <ChatMessages message={message.text} />  ) }
                    </div>
                    <div className='flex justify-between items-center bg-white absolute bottom-0 w-full border-1 border-black'>
                        {/* Create an Input component */}
                        <input onKeyDown={handleEnter} type="text" placeholder='Изпрати съобщение' className='w-full py-8 px-5 outline-none' />
                        <button onClick={sendMsgClick} className='border-1 border-black bg-red-300 mx-5 h-12 px-3 rounded text-white text-xl hover:bg-red-400'>Изпрати</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Chat;
