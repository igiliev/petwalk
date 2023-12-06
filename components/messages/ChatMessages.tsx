import { useEffect, useState } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { PassedMessages } from "../../public/interfaces/globals";
import { v4 } from 'uuid';

const ChatMessages = (props: any) => {
    const [ personalText, setPersonalText ] = useState(['']);

    useEffect( () => {
        // const res = onSnapshot(doc(db, "chats", props.combinedId ), (doc: any) => {
        //     const textData: PassedMessages = doc.data();
        //     // textData.messages.forEach( data => setPersonalText( prevText => [ ...personalText, data.text ] ));
        // });

        // console.log(props.selectedUserMsgs);
        //unsub
        // return () => {
        //     res();
        // }
        
    }, [ ]);

    // const chatElem = props.selectedUserMsgs.map( (item: any) => <p key={item.id + v4()} className="bg-blue-300 my-2 p-3 rounded-xl">{item.text}</p> );

    return (
        <div className="messageContainer">
            <div className="w-full mb-5">
                <div className="bg-white w-40 text-center py-3 text-xl rounded-lg">Your message</div>
            </div>

            <div className="w-full">
                <div className="text-center text-white text-xl rounded-lg float-right">
                    {/* {chatElem} */}
                    <p>static for now</p>
                </div>
            </div>
        </div>
    )
}

export default ChatMessages;
