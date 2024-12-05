'use client';

import Header from "../header/Header";
import Footer from "../footer/Footer";
import './ListingItems.css';
import { useDispatch, useSelector } from "react-redux";
import { storeActions } from "../../app/redux/store";
import { useEffect, useState } from "react";
import { currUserData } from "../../app/api/helper/users/userService";
import { doc, setDoc, Timestamp, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import UsersList from "../UsersList/UsersList";

const ListingItems = (props: any) => {
    const [ userData, setUserData ]: any = useState({});
    const [filterApplied, setFilterApplied] = useState(false);
    const [matchedItems, setMatchedItems] = useState([]);
    const isSitter: boolean = useSelector((state: any) => state.dataStore.userType);
    const renderUsers = filterApplied && matchedItems.length > 0 ? matchedItems : props.userData;
    const dispatch = useDispatch();
    
    useEffect( () => {
        currUserData().then( data => setUserData(data[0]));
        // TODO: This fetch is being used on multiple places make sure it's sing source of truth
    }, [ ] );
	
	const handleChange = (event: any) => {
        let string = event.target.value.toLowerCase();
        if (string.length > 0) {
            const filteredArray:any = props.userData.filter((obj: any) =>
                obj.selectedHoods.some((item: any) => item.label.toLowerCase().includes(string))
            );
            filteredArray.length > 0 && setMatchedItems(filteredArray);
        } else {
            setMatchedItems([]);
            setFilterApplied(false);
        }
    };
	
	const handleSearch = () => {
        setFilterApplied(true);
    };

    const startChat = async (uid: string, name: string) => {
        dispatch(storeActions.setUserChatNames(name));
        const combinedId = userData.uid > uid
        ? userData.uid + uid
        : uid + userData.uid;
        const { proactiveRefresh, auth, stsTokenManager, metadata,  ...slicedUserData } = userData;
        const firestoreChatRef = doc(db, 'chatUsernames', userData.uid);
        const chatRefSnap = await getDoc( firestoreChatRef );
        dispatch(storeActions.setCombinedId(combinedId));
        dispatch(storeActions.setChatData({ uid, data: slicedUserData }));
        
        await setDoc(doc(db, 'chats', combinedId), {
            text: '',
            senderId: userData.uid,
            date: Timestamp.now()
        }, { merge: true });
        
        if( chatRefSnap.exists() ) {
            const data = chatRefSnap.data();
            // router.push(`/userChat/${userData.uid}`);
            // If the selected name is in the /chatUsernames db > redirect to the Chat page
            if( !data.names.includes(name) ) {
                dispatch(storeActions.setUserChatNames(name));
            }
        } else {
            console.error('No data from chat db');
        }
    }

    return (
        <div className="pt-44 w-full h-full bg-grey-2">
            <Header />
            <div className="flex flex-col list-users-inner lg:flex-row mb-10">
                <div className="flex flex-col shadow-xl bg-slate-200 p-3 mb-8">
                    <input onChange={handleChange} className="border rounded py-2 pl-3" type="text" placeholder="Търсете по квартал" />
                    <button className="hover:bg-teal-700 mt-3 border rounded bg-green-2 text-white py-1 text-lg" type="submit" onClick={handleSearch}>Търсене</button>
                </div>
                <div className="w-full lg:ml-20 p-7 pt-0 border-1 border-black">
                    <h1 className="text-3xl mb-5 font-semibold max-sm:text-center">Налични { isSitter ? 'собственици' : 'гледачи' } в избраните квартали</h1>
                    <p className="mb-5">Това е демо версия на сайта. За да видите всички гледачи и да може да изпратите съобщение се регистрирайте(напълно безплатно е и става за 1 минута)</p>
                    { <UsersList users={renderUsers} startChat={startChat} userData={userData} /> }
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ListingItems;
