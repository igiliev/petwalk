'use client';

import Header from "../header/Header";
import Footer from "../footer/Footer";
import Image from "next/image";
import './listing-items.css';
import defaultUserImg from '../../public/assets/images/icons/dog-walking.webp';
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { storeActions } from "../../app/redux/store";
import { useEffect, useState } from "react";
import { currUserData } from "../../app/api/helper/users/userService";
import { collection, doc, setDoc, Timestamp, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import { v4 as uuid } from "uuid";
import { GetStoreData } from "../../public/interfaces/globals";

const ListingItems = (props: any) => {
    const [ userData, setUserData ]: any = useState({});
    const [ userChatNames, setUserChatNames ] = useState(['']);
    const dispatch = useDispatch();
    const handleChange = () => { };
    const handleSearch = () => { };
    const chatNames = useSelector<GetStoreData>( state => state.dataStore.userChatNames );
    
    useEffect( () => {
        currUserData().then( data => setUserData(data[0]) );
        console.log(userData.uid);
        // onSnapshot(doc(db, 'chatUsernames', userData.uid), (doc) => {
        //     console.log(doc.data());
        // });
    }, [ userData.uid ] );

    const startChat = async (uid: string, name: string) => {
        const combinedId = userData.uid > uid
        ? userData.uid + uid
        : uid + userData.uid;
        const { proactiveRefresh, auth, stsTokenManager, metadata,  ...slicedUserData } = userData;
        // const chatDocRef = doc(db, 'chats');
        // const chatDocRefSnap = await getDoc(chatDocRef);
        const chatsRef = collection(db, 'chats');
        const chatNamesRef = collection(db, 'chatUsernames');
        const firestoreChatRef = doc(db, 'chatUsernames', userData.uid);
        const chatRefSnap = await getDoc( firestoreChatRef );
        dispatch(storeActions.setCombinedId(combinedId));
        dispatch(storeActions.setChatData({ uid, data: slicedUserData }));
        dispatch(storeActions.setUserChatNames(name));

        await setDoc(doc( chatsRef, combinedId ), {
            id: uuid(),
            text: '',
            senderId: userData.uid,
            date: Timestamp.now()
        }, { merge: true });

        if( chatRefSnap.exists() ) {
            const data = chatRefSnap.data();

            // if( data.names.includes(name) ) {
            //     return;
            // } else {

            // }
            console.log(chatRefSnap.data());
        } else {
            console.error('NEMA DATA BATE');
        }

        await setDoc(doc( chatNamesRef, userData.uid ), {
            names: chatNames,
            date: Timestamp.now()
        }, { merge: true });
    }

	const mappedUsers = props.userData.map( (user: any): any => {
        const hoodLabels = user.selectedHoods.map( (hood: any): any => <span className="test inline-block lowercase first-letter:uppercase font-semibold" key={hood.id}>{`${hood.label},`}</span> );        
        const servicesLabels =  user.selectedServices.map( (serviceLabel:any):any => <strong key={user.id + Math.floor( Math.random() * 1000 )}>{`${serviceLabel}, `}</strong> );

        return (
            <div className="flex lg:flex-row flex-col items-center w-full border bg-gray-100 my-10 shadow-lg p-5 rounded-md border-l-4 border-l-red-400" key={user.id}>
                <div className="p-5">
                    <Image src={ user.userImage === 'default' ? defaultUserImg : user.userImage } alt="user profile image" width="70" height="40" />
                </div>
                <div className="pb-3">
                    <h1 className="text-2xl font-medium">{user.name}</h1>
                    <div>
                        <span>{user.dailyRate}лв на </span>
                        <span>{user.dailyRateOption === 'day' ? 'ден' : 'час'}</span>
                        <div className="py-5">Избрани квартали:{hoodLabels}</div>
                        <p>Предлагани услуги: { servicesLabels }</p>
                        <p className="my-3">{user.describtion}</p>
                        <Link className="text-white font-medium bg-red-400 rounded p-3" href={`/userChat/${user.id}`} onClick={()=>startChat(user.uid, user.name)}>Изпрати съобщение</Link>
                    </div>
                </div>
            </div>
        )
    } );
 
    return (
        <div className="pt-44 w-full h-full bg-gray-300">
            <Header />
            <div className="flex flex-col list-users-inner lg:flex-row mb-10">
                <div className="flex flex-col shadow-xl bg-gray-100 p-3">
                    <input onChange={handleChange} className="border rounded py-2 pl-3" type="text" placeholder="Търсете по квартал" />
                    <button className="hover:bg-gray-300 hover:text-black mt-3 border rounded bg-red-500 text-white py-1 text-lg" type="submit" onClick={handleSearch}>Търсене</button>
                </div>
                <div className="w-full lg:ml-20 p-7 border-1 border-black">
                    <h1 className="text-center text-3xl mb-5">Налични гледачи в избраните квартали</h1>
                    { mappedUsers }
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ListingItems;
