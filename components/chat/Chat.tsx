'use client';

import { useEffect, useState } from "react";
import './chat.css';
import ChatMessages from "../messages/ChatMessages";
import { getDoc, getDocs, collection, doc, updateDoc, arrayUnion, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useSelector } from "react-redux";
import { ClickedUser } from "../../public/interfaces/globals";
import { log } from "console";

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
    const [ allChatUsers, setAllUsersChat ] = useState([{}]);
    const currentUserId: string = useSelector( (state:any) => state.dataStore.currentUserId );
    const combinedId: string = useSelector( (state:any) => state.dataStore.combinedId );

    useEffect( () => {
        const myId = combinedId.slice(0, 15);
        const getChats = () => {
            const res = onSnapshot(doc(db, "userChats", combinedId ), (doc: any) => {
                const userData = doc.data();
                setUserChat( userData );
            });

            //unsub
            return () => {
                res();
            }
        }

        const fetchChatNames = async () => {
            const res = await getDocs(collection(db, 'userChats'));
            const combineNames: string[] = [];
            const combinedUsers = [{}];
            res.forEach((doc) => {
                if ( doc.id.includes(myId) ) {
                    const data: ClickedUser = doc.data();
                    const dataToArray = Object.values(doc.data());
                    const userNames = dataToArray[0].userInfo.displayName;
                    combineNames.push(userNames);

                    for( let key in data ) {
                        combinedUsers.push({ id: doc.id, data: data[key].userInfo });
                    }
                }
              });
              setUserChatNames(combineNames);
              setAllUsersChat(combinedUsers);
              
        }
        fetchChatNames();
        
        currentUserId && getChats();
    }, [ currentUserId ] );
	
    const handleEnter = async (event: any) => {
        if ( event.key === 'Enter' ) {
            setChatInput(event.target.value);
            await updateDoc(doc(db, 'chats', combinedId ), {
                messages: arrayUnion({
                    text: event.target.value,
                    id: currentUserId,
                    userId: selectedUserId,
                })
            });
        }
    }

    const sendMsgClick = () => { };

    const userSelect = ( event: any ) => {
        const getSelected = allChatUsers.find( ( user: any ) => {
            if( !user.hasOwnProperty('id') ) return;
            return user.data.displayName === event.target.innerHTML;
        } );

        onSnapshot(doc(db, "chats", combinedId), (doc) => {
            // return doc.exists() && setMessages(doc.data().messages);
        });
        // setSelectedUserId(selectedId);
    }

	const mapNames = Object.entries(userChat).map( (user: any) => {
        if ( user.length ) {
            const combinedId: string = user[0];
            const id: string = user[1].userInfo.id;
            const name: string = user[1].userInfo.displayName;

            return <a onClick={ userSelect } key={id} className="cursor-pointer">
                { userChatNames.map( name => <p id={combinedId} className="hover:underline p-3 text-center">{name}</p> ) }
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
                    <div className="h-full bg-yellow-100 p-5">
                        <ChatMessages combinedId={combinedId} messages={chatInput} />
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
