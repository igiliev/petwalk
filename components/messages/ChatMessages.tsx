import { useEffect, useState } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { PassedMessages } from "../../public/interfaces/globals";
import { v4 } from 'uuid';

const ChatMessages = ({myMsgs, userMsgs}: any) => {
    const [ personalText, setPersonalText ] = useState(['']);

    useEffect( () => {
    }, [ ]);

    return (
        <div className="messageContainer">
            <div className="w-full mb-5">
                <div className="bg-white w-40 text-center py-3 text-xl rounded-lg">Your message {userMsgs}</div>
            </div>

            <div className="w-full">
                <div className="text-center text-white text-xl rounded-lg float-right">
                    <p>My message{myMsgs}</p>
                </div>
            </div>
        </div>
    )
}

export default ChatMessages;
