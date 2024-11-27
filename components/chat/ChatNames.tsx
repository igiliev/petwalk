import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { GetStoreData } from "../../public/interfaces/globals";
import "./chat.css";

interface ChatNameProps {
    names?: string[];
    messagesPage: boolean;
    startChat: () => any;
}

const ChatNames = ({ messagesPage, startChat }: ChatNameProps) => {
    const [ chatUsernames, setChatUsernames ] = useState([]);
    const currentUserId: string = useSelector((state: any) => state.dataStore.currentUserId);
    const isSitter: boolean = useSelector((state: any) => state.dataStore.userType);
    const stateChatNames: any = useSelector<GetStoreData>( state => state.dataStore.userChatNames );

    useEffect(() => {

        //Get the chatNames and assign them to chatUsernames based on user type sitter/owner
        const getChatNames = async () => {
            try {
                const namesQuery = query(collection(db, 'chatUsernames'));
                const querySnapshot = await getDocs(namesQuery);

                querySnapshot.forEach( (doc) => {
                    if( doc.id.includes(currentUserId) ) {
                        const nameData = doc.data();
                        setChatUsernames((prevName: any): any => {
                            return [...prevName, isSitter ? nameData.ownerName : nameData.sitterName];
                        });
                    }
                } );
            } catch(error) {
                console.log(' Something wrong with the chatNames fetching ',error);
            }
        }
        getChatNames();
    }, [ isSitter, currentUserId ]);

    return ( 
        <div className="chatUsernameWrapper">
            {
                messagesPage ?
                chatUsernames.map( (name: string, index: number) => <p onClick={startChat} key={index} className="chatUsername">{name}</p> )
                : 
                <p onClick={startChat} className="chatUsername">{stateChatNames.toString()}</p>
            }
        </div>
    )
}

export default ChatNames;