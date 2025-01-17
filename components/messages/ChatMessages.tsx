import { Timestamp } from "firebase/firestore";

interface ChatMessagesProps {
    myMsgs:  Array<MessageProps>;
    userMsgs:  Array<MessageProps>;
    chatInit: boolean;
}

interface MessageProps {
    text: string;
    date: Timestamp;
    isSitter: boolean;
}

const ChatMessages = ({myMsgs, userMsgs, chatInit}: ChatMessagesProps) => {
    // Helper function to sort messages by date proximity
    const sortMessagesByDateProximity = (messages: Array<MessageProps>) => {
        const todayMillis = new Date().getTime();
        return messages.slice().sort((a, b) => {
            const diffA = Math.abs(a.date.toMillis() - todayMillis);
            const diffB = Math.abs(b.date.toMillis() - todayMillis);
            return diffB - diffA;
        });
    };

    const combinedMsgsSorted = sortMessagesByDateProximity([...myMsgs, ...userMsgs]);
    console.log("combinedMsgsSorted", combinedMsgsSorted);

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
                        <div className="w-auto text-left text-xl flex flex-col">
                            { combinedMsgsSorted.map( (msg: MessageProps, index: number) => {
                                const dateFormatted = msg.date.toDate().toString().split(" GMT")[0];

                                return (
                                    <div key={index} className={`rounded-lg mb-2 p-3 ${msg.isSitter ? 'bg-green-2 text-white text-right self-end' : 'bg-gray-200 self-start'}`}>
                                        <span className="text-xs">{dateFormatted}</span>
                                        <p>{msg.text}</p> 
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default ChatMessages;
