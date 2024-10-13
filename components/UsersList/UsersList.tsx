import Image from "next/image";
import defaultUserImg from '../../public/assets/images/icons/dog-walking.webp';
import { useSelector } from "react-redux";
import Link from "next/link";
import { useState } from "react";
import { GetStoreData } from "../../public/interfaces/globals";
import { useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";

export interface UsersListProps {
    users: User[];
    startChat: (id: string, name: string) => any;
    userData: any;
}

export interface User {
    name: string;
}

const UsersList = ({users, startChat, userData}: UsersListProps): JSX.Element => {
    const [ isSitter, setIsSitter ] = useState(false);
    const currentUserId: string = useSelector((state: any) => state.dataStore.currentUserId);

    useEffect( () => {
        try {
            onSnapshot(doc(db, 'userData', currentUserId), (doc) => {
                if( !doc.exists() ) return;
                
                const { userType } = doc.data();
                console.log(userType);
                setIsSitter( userType === 'sitter' );
            });
        } catch{
            console.error('currentUserId in ListingItems is undefined');
        } 
    }, [currentUserId] );

    const userLoggedin = useSelector<GetStoreData>((state: any) => state.dataStore.userLoggedin);

    return (
        <div>
            { !isSitter ?  users.map( (user: any, index: number) => {
                const hoodLabels = user.selectedHoods.map((hood: any): any => <span className="inline-block lowercase first-letter:uppercase font-semibold" key={hood.id}>{`${hood.label},`}</span>);
                const servicesLabels = user.selectedServices.map((serviceLabel: any): any => <strong key={user.id + Math.floor(Math.random() * 1000)}>{`${serviceLabel}, `}</strong>);
                const sitterElements = <div>
                    <span>{user.dailyRate}лв на </span>
                    <span>{user.dailyRateOption === 'day' ? 'ден' : 'час'}</span>
                    <div className="py-5"><span>Избрани квартали:</span>{hoodLabels}</div>
                    <p>Предлагани услуги: {servicesLabels}</p>
                    <p className="py-5"><span>Oписание: </span>{user.describtion}</p>
                </div>

                    return (
                        <div className="flex lg:flex-row flex-col items-center w-full border bg-white my-5 shadow-lg p-5 rounded-md border-l-4 border-t-0 border-r-0 border-b-0 border-green-2" key={user.id}>
                            <div className="p-5">
                                <Image src={user.userImage === 'default' ? defaultUserImg : user.userImage} alt="user profile image" width="90" height="50" className="h-24 sm:h-20" />
                            </div>
                            <div className="pb-3 text-grey-2">
                                <h1 className="text-2xl font-semibold text-green-2">{user.name}</h1>
                                { !isSitter ? sitterElements : <>No elements</> }
                            </div>
                            {
                                userLoggedin ?
                                    <div className="msg-btn-wrapper">
                                        <Link className="bg-green-2 p-3 rounded-md text-white whitespace-nowrap" href={`/userChat/${userData.uid}`} onClick={()=>startChat(user.uid, user.name)}>Изпрати съобщение</Link>
                                    </div>
                                    :
                                    <></>
                            }
                        </div>
                    )
                }) 
                : users.map((user: any, index: number) => {
                    return (
                        <div className="flex lg:flex-row flex-col items-center w-full border bg-white my-5 shadow-lg p-5 rounded-md border-l-4 border-t-0 border-r-0 border-b-0 border-green-2" key={index}>
                            <div className="p-5">
                                <Image src={user.userImage === 'default' ? defaultUserImg : user.userImage} alt="user profile image" width="90" height="50" className="h-24 sm:h-20" />
                            </div>
                            <div className="pb-3 text-grey-2">
                                <h1 className="text-2xl font-semibold text-green-2">{user.name}</h1>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default UsersList;