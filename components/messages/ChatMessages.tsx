import { useEffect, useState } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { PassedMessages } from "../../public/interfaces/globals";

const ChatMessages = (props: any) => {
    const [ personalText, setPersonalText ] = useState(['']);
    const convTxt = personalText && personalText.join(',').split(',');

    useEffect( () => {
        const res = onSnapshot(doc(db, "chats", props.combinedId ), (doc: any) => {
            const textData: PassedMessages = doc.data();
            textData.messages.forEach( data => setPersonalText( prevText => [ ...personalText, data.text ] ));
        });

        //unsub
        return () => {
            res();
        }
    }, [ props.messages ]);

    const chatElem = convTxt.map( item => <p className="">{item}</p> );

    return (
        <div className="messageContainer">
            <div className="w-full mb-5">
                <div className="bg-white w-40 text-center py-3 text-xl rounded-lg">Your message</div>
            </div>

            <div className="w-full">
                <div className="bg-blue-300 w-40 text-center py-3 text-white text-xl rounded-lg float-right">
                    {chatElem}
                </div>
            </div>
        </div>
    )
}

export default ChatMessages;
