'use client';

import { useEffect, useState } from "react";
import { getChatMessages } from "../../app/api/helper/users/userService";

const ChatMessages = ( props: any ) => {
    const [ usersChat, setUsersChat ]: any[] = useState([]);

    useEffect( () => {
        console.log(props.id);
        getChatMessages(props.id).then( res => {
            console.log('are we even here', res, props.id);
            if( !res ) return;
            res.map( chatItem => setUsersChat( Object.entries(chatItem) ) );
        } );
    }, [] );

    return (
        <div className="messageContainer">
            <div className="w-full mb-5">
                { usersChat.length ?
                    <div className="bg-white w-40 text-center py-3 text-xl rounded-lg">
                        <span>{usersChat[0][0]}: </span>
                        <p>{usersChat[0][1]}</p>
                    </div>
                    : <p>No chat messages</p>
                }
            </div>

            <div className="w-full">
                { usersChat.length ?
                    <div className="bg-blue-300 w-40 text-center py-3 text-white text-xl rounded-lg float-right">
                        <span>{usersChat[1][0]}: </span>
                        <p>{usersChat[1][1]}</p>
                    </div>
                    : <p>No chat messages</p>
                }
            </div>
        </div>
    )
}

export default ChatMessages;
