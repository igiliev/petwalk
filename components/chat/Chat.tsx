'use client';

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserChat, updateCurrUserMessage } from "../../app/api/helper/users/userService";
import './chat.css';
import ChatMessages from "../messages/ChatMessages";
import { useParams } from "next/navigation";

const Chat = () => {
    const [ userChatData, setUserChatData ] = useState([]);
    const [ selectedUserId, setSelectedUserId ] = useState('');
    const [ userChatClicked, setUserChatClicked ] = useState(false);
    const currentuserId: string = useSelector( (state: any) => state.dataStore.currentUserId );
    const currentUserName: string = useSelector( (state: any) => state.dataStore.currentUserName );
    const routeParams = useParams();

    useEffect( () => {
        //Passing the ID taken from the URL
        setSelectedUserId(routeParams.userChats);
        getUserChat().then( (res: any[])=> {
            res.map( userData => {
                //Show only the chat users that have cominedId which includes my current user ID
                if ( userData.data.combinedId.includes(currentuserId) ) {
                    setUserChatData(  (prevVal: any): any => [ ...prevVal, userData ] );
                } else {
                    setUserChatData([]);
                }
            } );
        } );
    }, [ currentuserId, routeParams.userChats ] );

    const handleEnter = (event: any) => {
        if ( event.key === 'Enter' ) {
            // Adding the types in chat message
            updateCurrUserMessage(selectedUserId, event.target.value, currentUserName);
        }
    }

    const sendMsgClick = () => {

    }

    const mapNames = userChatData.map( (user: any) => (
        <a onClick={ () => userSelect(user.id)} key={user.id} className="cursor-pointer">
            <p className="hover:underline p-3 text-center">{ user.data.username }</p>
        </a> 
    ));

    const userSelect = (id: string) => {
        setUserChatClicked(true);
        setSelectedUserId(id);
    }


    return(
        <div className="chat-wrapper m-auto mt-24 border border-black rounded">
            <div className='bg-red-300 p-5'></div>
            <div className="chat-inner flex h-full">
                <div className="w-36 bg-white h-full border-r border-black">
                    <div>{ mapNames }</div>
                </div>
                <div className={`w-full ${userChatClicked ? 'bg-white' : 'bg-gray-200'} relative`}>
                    <div className="h-full bg-yellow-100 p-5">
                        {/* Checking if the ID from the router has fetched then send it else show message */}
                        { selectedUserId ? <ChatMessages id={selectedUserId} /> : <p>No chat messages</p>  }
                        
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