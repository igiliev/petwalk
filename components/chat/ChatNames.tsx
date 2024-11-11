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
    // const [ isSitter, setIsSitter ] = useState(false);
    const currentUserId: string = useSelector((state: any) => state.dataStore.currentUserId);
    const isSitter: boolean = useSelector((state: any) => state.dataStore.userType);

    useEffect(() => {

        // const getUserData = async () => {
        //     const userDataRef = doc(db, "userData", currentUserId);
        //     const userDataSnap = await getDoc(userDataRef);

        //     if(userDataSnap.exists()) {
        //         setIsSitter( userDataSnap.data().userType === 'sitter' );
        //     }
        // }

        //Get the chatNames and assign them to chatUsernames based on user type sitter/owner
        const getChatNames = async () => {
            try {
                const namesQuery = query(collection(db, 'chatUsernames'));
                const querySnapshot = await getDocs(namesQuery);

                querySnapshot.forEach( (doc) => {
                    const senderUid = doc.id.replace(currentUserId, '');
                    if( doc.id.includes(currentUserId) ) {
                        console.log(isSitter);
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
    }, [ isSitter ]);
    return ( 
        <div>
            {
                chatUsernames.map( (name: string, index: number) => <p key={index}>{name}</p> )
            }
        </div>
    )
}

export default ChatNames;