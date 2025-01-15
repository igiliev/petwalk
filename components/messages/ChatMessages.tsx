import { Timestamp } from "firebase/firestore";

interface ChatMessagesProps {
    myMsgs:  Array<{text: string; date: Timestamp}>;
    userMsgs:  Array<{text: string; date: Timestamp}>;
    chatInit: boolean;
}

const ChatMessages = ({myMsgs, userMsgs, chatInit}: ChatMessagesProps) => {

    // Helper function to sort messages by date proximity
    const sortMessagesByDateProximity = (messages: Array<{ text: string; date: Timestamp }>) => {
        const todayMillis = new Date().getTime();
        return messages.slice().sort((a, b) => {
            const diffA = Math.abs(a.date.toMillis() - todayMillis);
            const diffB = Math.abs(b.date.toMillis() - todayMillis);
            return diffA + diffB;
        });
    };

    const myMsgsSorted = sortMessagesByDateProximity(myMsgs);
    const userMsgsSorted = sortMessagesByDateProximity(userMsgs);

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
                            { userMsgsSorted.map( (msg: {text: string; date: Timestamp}, index: number) => {
                                const firstPart = msg.date.toDate().toString().split(" GMT")[0];
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
                            { myMsgsSorted.map( (msg: {text: string; date: Timestamp}, index: number) => {
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
