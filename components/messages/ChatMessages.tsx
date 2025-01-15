import { Timestamp } from "firebase/firestore";

interface ChatMessagesProps {
    myMsgs:  Array<{text: string; date: Timestamp}>;
    userMsgs:  Array<{text: string; date: Timestamp}>;
    chatInit: boolean;
}

const ChatMessages = ({myMsgs, userMsgs, chatInit}: ChatMessagesProps) => {

    return (
        <div className="messageContainer">
            {/* Show the initial window when the user first opens the chat */}
            { chatInit ?
                <div className="initial-window">
                    <p className="text-2xl text-center">Моля кликнете на името в ляво, за да започнете нов чат</p>
                </div>
                :
                <div className="interactive-window">
                    {/* Other user messages */}
                    <div className="w-full mb-5">
                        <div className="w-auto text-left text-xl max-w-sm">
                            { userMsgs.map( (msg: {text: string; date: Timestamp}, index: number) => {
                                const today = new Date();
                                const firstPart = msg.date.toDate().toString().split(" GMT")[0];
                                console.log(firstPart);
                                console.log(today);

                                return (
                                    <div key={index} className="bg-gray-200 rounded-lg mb-2 p-3">
                                        <span className="text-xs">{firstPart}</span>
                                        <p>{msg.text}</p> 
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    {/* My messages */}
                    <div className="w-full flex justify-end">
                        { myMsgs.length > 0 &&
                            <div className="w-auto text-left text-xl text-white  max-w-sm">
                            { myMsgs.map( (msg: {text: string; date: Timestamp}, index: number) => {
                                const firstPart = msg.date.toDate().toString().split(" GMT")[0];
                                return (
                                    <div key={index} className="bg-blue-500 rounded-lg mb-2 p-3">
                                        <span className="text-xs">{firstPart}</span>
                                        <p>{msg.text}</p> 
                                    </div>
                                )
                            })}
                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default ChatMessages;
