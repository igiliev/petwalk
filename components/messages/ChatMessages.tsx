import { useEffect, useState } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { PassedMessages } from "../../public/interfaces/globals";
import { v4 } from 'uuid';

const ChatMessages = ({myMsgs, userMsgs, chatInit}: any) => {

    return (
        <div className="messageContainer">
            {/* Show the initial window when the user first opens the chat */}
            { chatInit ?
                <div className="initial-window">
                    <p className="text-2xl text-center">Моля кликнете на името в ляво, за да започнете нов чат</p>
                </div>
                :
                <div className="interactive-window">
                    <div className="w-full mb-5">
                        <div className="bg-gray-200 w-auto text-left text-xl p-3 rounded-lg">{ userMsgs.map( (msg: string) => <p key={Math.random().toString(36).slice(2)}>{msg}</p> )}</div>
                    </div>

                    <div className="w-full">
                        <div className="bg-blue-500 w-auto text-left text-xl text-white p-3 rounded-lg float-right">
                            { myMsgs.map( (msg: string) => <p key={Math.random().toString(36).slice(2)}>{msg}</p> )}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default ChatMessages;
