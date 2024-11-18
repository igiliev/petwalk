import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { collection, query, getDocs, getDoc, onSnapshot, doc } from "firebase/firestore";
import { db } from "../../firebase/config";

interface ChatNameProps {
    names?: string[];
    messagesPage: boolean;
}

const ChatNames = ({ messagesPage }: ChatNameProps) => {
    const [ chatUsernames, setChatUsernames ] = useState([]);
    const currentUserId: string = useSelector((state: any) => state.dataStore.currentUserId);
    const isSitter: boolean = useSelector((state: any) => state.dataStore.userType);

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
        // getUserData();
        getChatNames();
        console.log(isSitter);
    }, [ isSitter, currentUserId ]);

    return ( 
        <div>
            {
                chatUsernames.map( (name: string, index: number) => <p key={index}>{name}</p> )
            }
        </div>
    )
}

export default ChatNames;