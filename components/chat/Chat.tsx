'use client';

import { useState } from "react";
import './chat.css';
import ChatMessages from "../messages/ChatMessages";
import { doc, updateDoc, arrayUnion, onSnapshot, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useSelector } from "react-redux";
import { GetStoreData, ChatInpData } from "../../public/interfaces/globals";
import { v4 as uuid } from "uuid";
import { useEffect } from "react";
import { getUserData } from "../../app/api/helper/users/userService";
import { usePathname } from "next/navigation";

const Chat = () => {
    const [ chatInput, setChatInput ] = useState('');
    const [ userData, setUserData ]: any = useState(null);
    const [ userChatClicked, setUserChatClicked ] = useState(false);
    const [ allChatUsers, setAllUsersChat ]: any = useState([]);
    const [ selectedUserMessages, setSelectedUserMessages ] = useState([]);
    const [ dataFetched, setDataFetched ] = useState(false);
    // const [ chatNames, setChatNames ]: any = useState([]);
    const combinedId: any = useSelector<GetStoreData>( state => state.dataStore.combinedId );
    const path = usePathname();

    useEffect( () => {
        //Get everything after userChat/ which is the user ID
        const regex = /(?<=userChat\/).*/gm;
        const userID: string = regex.exec(path)![0];
        getUserData(userID).then( res => {
            //Destructuring the data and passing it to the state
            const [ innerData ] = res;
            const { sitterData } = innerData;
            setDataFetched(true);
            return setUserData(sitterData);
            // sitterData.find( (data: any) => {
                //     if ( data.nameVal !== undefined ) {
                    //         return setChatNames( (prevName: any) => [ ...prevName, data.nameVal] );
                    //     }
                    // });
                    // setChatNames( (prevName: any) => [ ...prevName, [] ] );
        });
    }, [ dataFetched, path ] );
	
    const handleEnter = async (event: any) => {
        if ( event.key === 'Enter' ) {
            setChatInput(event.target.value);
            await updateDoc(doc( db, 'chats', combinedId ), {
                messages: arrayUnion({
                    id: uuid(),
                    text: event.target.value,
                    senderId: userData.uid,
                    date: Timestamp.now()
                })
            });
        }
    }

    const sendMsgClick = () => { };

    const userSelect = ( event: any ) => {
        const getSelected: ChatInpData = allChatUsers.find( ( user: any ) => {
            if( !user.hasOwnProperty('id') ) return;
            return user.data.displayName === event.target.innerHTML;
        } );

        onSnapshot(doc(db, "chats", getSelected.id), (doc) => {
            if( doc.exists() ) setSelectedUserMessages(doc.data().messages);
        });
    }

	// const mapNames = userData.length && userData.map( (user: any) => {
    //     // console.log(userData);
    //     if ( user.length ) {
    //         const id: string = user.uid;
    //         const name: string = user.nameVal;
    //         console.log(name);

    //         return <a onClick={ userSelect } key={id} className="cursor-pointer">
    //             { <p key={id} className="hover:underline p-3 text-center">{ name }</p> }
    //         </a> 
    //     }
    // });

    // const mapTest = userData.map( (user: any) => {
    //     console.log(user);
    // } )

    // if (userData) console.log(userData);
    // const names = userData && userData.
    return (
        <div className="chat-wrapper m-auto mt-24 border border-black rounded">
            <div className='bg-red-300 p-5'></div>
            <div className="chat-inner flex h-full">
                <div className="w-36 bg-white h-full border-r border-black">
                    {/* <div> { userData !== '' ? 
                    <>
                        { userData.map( (user: any) => {
                            console.log(user);
                            return <span key={user.uid}>{user.nameVal}</span>  })
                        } 
                    </> : <p>Loading</p> } </div> */}
                </div>
                <div className={`w-full ${userChatClicked ? 'bg-white' : 'bg-gray-200'} relative`}>
                    <div className="h-full bg-yellow-100 p-5 overflow-auto overflow-y-scroll">
                        <ChatMessages combinedId={combinedId} messages={chatInput} selectedUserMsgs={selectedUserMessages} />
                    </div>
                    <div className='flex justify-between items-center bg-white absolute bottom-0 w-full border-1 border-black'>
                        <input onKeyDown={handleEnter} type="text" placeholder='Изпрати съобщение' className='w-full py-8 px-5 outline-none' />
                        <button onClick={sendMsgClick} className='border-1 border-black bg-red-300 mx-5 h-12 px-3 rounded text-white text-xl hover:bg-red-400'>Изпрати</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat;
