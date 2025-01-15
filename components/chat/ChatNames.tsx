import { useEffect, useState, useContext } from "react";
import "./chat.css";
import { useSelector } from "react-redux";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { GetStoreData } from "../../public/interfaces/globals";
import { GlobalDataContext } from "../../app/context/GlobalDataProvider";

interface ChatNameProps {
    names?: string[];
    messagesPage: boolean;
    startChat: (user: UserName) => any;
}

export interface UserName {
    name: string;
    id: string;
}

const ChatNames = ({ messagesPage, startChat }: ChatNameProps) => {
    const [ chatUsernames, setChatUsernames ] = useState<[UserName]>([{name: '', id: ''}]);
    const currentUserId: string = useSelector((state: any) => state.dataStore.currentUserId);
    const stateChatNames: any = useSelector<GetStoreData>( state => state.dataStore.userChatNames );
    const data = useContext(GlobalDataContext);
    const isSitter: boolean = data?.userType === 'sitter';

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
                            return [ ...prevName, isSitter ? { name: nameData.ownerName, id: nameData.combinedId } : { name: nameData.sitterName, id: nameData.combinedId }];
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
                chatUsernames.map( (user: UserName, index: number) => <p onClick={() => startChat(user)} key={index} className="chatUsername">{user.name}</p> )
                : 
                <p onClick={() => startChat({name: stateChatNames.toString(), id:''})} className="chatUsername">{stateChatNames.toString()}</p>
            }
        </div>
    )
}

export default ChatNames;