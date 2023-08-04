'use client';

import { useEffect, useState } from "react";
import './chat.css';
import ChatMessages from "../messages/ChatMessages";
import { getDoc, doc, updateDoc, arrayUnion, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useSelector } from "react-redux";

const Chat = () => {
    const [ userChat, setUserChat ] = useState([{}]);
    const [ selectedUserId, setSelectedUserId ] = useState('');
    const [ currCombinedId, setCurrCombinedId ] = useState('');
    const [ chatInput, setChatInput ] = useState('');
    const [ userChatClicked, setUserChatClicked ] = useState(false);
    const [ messages, setMessages ] = useState('');
    const currentUserId: string = useSelector( (state:any) => state.dataStore.currentUserId );

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
        // const combinedId = currentUserId + 
        console.log(currCombinedId);
        const getChats = async () => {
            const res = await getDoc(doc(db, "userChats", currCombinedId ));
            if ( res.exists() ) {
                console.log(res.data());
                setUserChat( Object.entries(res.data()) );
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

    const sendMsgClick = () => { };

	const mapNames = userChat.map( (user: any) => {
        console.log(user);
        // const combinedId: string = user[0];
        // const id: string = user[1].userInfo.id;
        // const name: string = user[1].userInfo.displayName;
        // return <a onClick={ () => userSelect(combinedId, id, name)} key={id} className="cursor-pointer">
        //     <p className="hover:underline p-3 text-center">{ name }</p>
        // </a> 
    });

    const userSelect = (combinedId: string, selectedId: string, name: string) => {
        onSnapshot(doc(db, "chats", combinedId), (doc) => {
            return doc.exists() && setMessages(doc.data().messages);
        });
        setSelectedUserId(selectedId);
        setCurrCombinedId(combinedId);
    }

    return (
        <div className="chat-wrapper m-auto mt-24 border border-black rounded">
            <div className='bg-red-300 p-5'></div>
            <div className="chat-inner flex h-full">
                <div className="w-36 bg-white h-full border-r border-black">
                    {/* <div>{ mapNames }</div> */}
                </div>
                <div className={`w-full ${userChatClicked ? 'bg-white' : 'bg-gray-200'} relative`}>
                    <div className="h-full bg-yellow-100 p-5">
                        <ChatMessages messages={messages} />
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