//LATEST ListingItems
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Image from "next/image";
import './ListingItems.css';
import defaultUserImg from '../../public/assets/images/icons/dog-walking.webp';
import { useDispatch, useSelector } from "react-redux";
import { setDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from "../../firebase/config";
import { storeActions } from "../../app/redux/store";
import { getStoreData } from "../forms/RegistrationComplete";
import { useState } from "react";

const ListingItems = (props: any) => {
    const currentUserId: string = useSelector((state: any) => state.dataStore.currentUserId);
    const userLoggedin = useSelector<getStoreData>((state: any) => state.dataStore.userLoggedin);
    const dispatch = useDispatch()
    const [filterApplied, setFilterApplied] = useState(false)
    const [matchedItems, setMatchedItems] = useState([])

    const handleChange = (event: any) => {
        let string = event.target.value.toLowerCase()
        if (string.length > 0) {
            const filteredArray:any = props.userData.filter((obj: any) =>
                obj.selectedHoods.some((item: any) => item.label.toLowerCase().includes(string))
            );
            filteredArray.length > 0 && setMatchedItems(filteredArray)
        } else {
            setMatchedItems([])
            setFilterApplied(false)
        }
    };

    const handleSearch = () => {
        setFilterApplied(true)
    };

    const startChat = async (id: any, name: string) => {
        const combinedId = currentUserId + id;
        dispatch(storeActions.combinedId(combinedId));

        try {
            const res = await getDoc(doc(db, "chats", combinedId));

            if (!res.exists()) {
                setDoc(doc(db, "chats", combinedId), { messages: [] });
                setDoc(doc(db, "userChats", combinedId), {});

                //add data to userChats
                await updateDoc(doc(db, "userChats", combinedId), {
                    [combinedId + ".userInfo"]: {
                        id,
                        displayName: name
                    }
                });

                await updateDoc(doc(db, "userChats", combinedId), {
                    [combinedId + ".userInfo"]: {
                        id: currentUserId,
                        displayName: name,
                    }
                });
            }
        } catch (err) { }
    }
    const usersToRender = filterApplied && matchedItems.length > 0 ? matchedItems : props.userData

    const mappedUsers: any = usersToRender.map((user: any): any => {
        const hoodLabels = user.selectedHoods.map((hood: any): any => <span className="test inline-block lowercase first-letter:uppercase font-semibold" key={hood.id}>{`${hood.label},`}</span>);
        const servicesLabels = user.selectedServices.map((serviceLabel: any): any => <strong key={user.id + Math.floor(Math.random() * 1000)}>{`${serviceLabel}, `}</strong>);


        return (
            <div className="flex lg:flex-row flex-col items-center w-full border bg-slate-200 my-5 shadow-lg p-5 rounded-md border-l-4 border-t-0 border-r-0 border-b-0 border-green-2" key={user.id}>
                <div className="p-5">
                    <Image src={user.userImage === 'default' ? defaultUserImg : user.userImage} alt="user profile image" width="90" height="50" />
                </div>
                <div className="pb-3 text-grey-2">
                    <h1 className="text-2xl font-semibold text-green-2">{user.name}</h1>
                    <div>
                        <span>{user.dailyRate}лв на </span>
                        <span>{user.dailyRateOption === 'day' ? 'ден' : 'час'}</span>
                        <div className="py-5"><span>Избрани квартали:</span>{hoodLabels}</div>
                        <p>Предлагани услуги: {servicesLabels}</p>
                        <p className="py-5"><span>Oписание: </span>{user.describtion}</p>
                    </div>
                </div>
                {/* <Link className="text-white font-medium bg-red-400 rounded p-3" href={`/userChat/${user.id}`} onClick={()=>startChat(user.id, user.name)}>Изпрати съобщение</Link> */}
                {
                    userLoggedin ?
                        <div className="msg-btn-wrapper">
                            <a href={`mailto: ${user.mail}`} className="bg-green-2 p-3 rounded-md text-white whitespace-nowrap" onClick={() => startChat(user.id, user.name)}>Изпрати съобщение</a>
                        </div>
                        :
                        <div></div>
                }
            </div>
        )
    });

    return (
        <div className="pt-44 w-full h-full bg-grey-2">
            <Header />
            <div className="flex flex-col list-users-inner lg:flex-row mb-10">
                <div className="flex flex-col shadow-xl bg-slate-200 p-3 mb-8">
                    <input onChange={handleChange} className="border rounded py-2 pl-3" type="text" placeholder="Търсете по квартал" />
                    <button className="hover:bg-teal-700 mt-3 border rounded bg-green-2 text-white py-1 text-lg" type="submit" onClick={handleSearch}>Търсене</button>
                </div>
                <div className="w-full lg:ml-20 p-7 pt-0 border-1 border-black">
                    <h1 className="text-3xl mb-5 font-semibold max-sm:text-center">Налични гледачи в избраните квартали</h1>
                    <p className="mb-5">Това е демо версия на сайта. За да видите всички гледачи и да може да изпратите съобщение се регистрирайте(напълно безплатно е и става за 1 минута)</p>
                    {mappedUsers}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ListingItems;
