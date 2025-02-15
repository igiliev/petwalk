import Image from "next/image";
import defaultUserImg from "../../public/assets/images/icons/dog-walker.png";
import messageIcon from "../../public/assets/images/icons/messenger.png";
import { useSelector } from "react-redux";
import Link from "next/link";
import { GetStoreData } from "../../public/interfaces/globals";
import { useContext } from "react";
import { GlobalDataContext } from "../../app/context/GlobalDataProvider";
import styles from './UsersList.module.scss';

const { userWrapper, usersGrid, btnWwrapper, btnWrapperPara } = styles;

export interface UsersListProps {
    users: User[];
    startChat: (id: string, name: string) => any;
    userData: any;
}

export interface User {
    name: string;
}

const UsersList = ({users, startChat, userData}: UsersListProps): JSX.Element => {
    const userLoggedin = useSelector<GetStoreData>((state: any) => state.dataStore.userLoggedin);
    const data = useContext(GlobalDataContext);
    const isSitter: boolean = data?.userType === 'sitter';
    
    return (
        <div className={`grid ${usersGrid}`}>
            { !isSitter ?  users.map( (user: any, index: number) => {
                const hoodLabels = user.selectedHoods.map((hood: any, index: number): any => <span className="inline-block lowercase first-letter:uppercase font-semibold" key={index}>{`${hood.label},`}</span>);
                const servicesLabels = user.selectedServices.map((serviceLabel: any): any => <strong key={user.id + Math.floor(Math.random() * 1000)}>{`${serviceLabel}, `}</strong>);
                const defaultImg = user.userImage === 'default';
                const sitterElements = <div>
                    <span><strong className="mr-1">{user.dailyRate}</strong>лв/{user.dailyRateOption === 'day' ? 'ден' : 'час'}</span>
                    <span></span>
                    {/* <div className="py-5"><span>Избрани квартали:</span>{hoodLabels}</div> */}
                    {/* <p>Предлагани услуги: {servicesLabels}</p> */}
                    {/* { user.describtion && <p className="py-5"><span>Oписание: </span>{user.describtion}</p>} */}
                </div>
                    console.log(user.userImage);
                    console.log(defaultUserImg);
                    return (
                        <div className={`${userWrapper} w-full border bg-white my-5 shadow-lg flex relative`} style={{backgroundImage: `url(${ user.userImage === 'default' ? defaultUserImg.src : user.userImage})`, aspectRatio: "1", backgroundSize: "cover", width: "100%", backgroundPosition: "center"}} key={index}>
                            {/*<div className="p-5">
                                 <Image src={defaultImg ? defaultUserImg : user.userImage} alt="user profile image" width="90" height="50" className={defaultImg ? '' : `hover:shadow-xl`} /> 
                            </div>
                            */}
                            <div className={`pb-3 text-grey-2 flex items-center self-end justify-around ${btnWwrapper}`}>
                                <p className={`${btnWrapperPara} text-2xl font-semibold text-lg`}>{user.name}</p>
                                { !isSitter ? sitterElements : <>No elements</> }
                            {
                                userLoggedin ?
                                    <Link className="p-3 text-white" href={`/userChat/${userData.uid}`} onClick={()=>startChat(user.uid, user.name)}>
                                        <Image width={50} src={messageIcon} alt="message user icon" />
                                    </Link>
                                    :
                                    <></>
                            }
                            </div>
                        </div>
                    )
                })
                : users.map((user: any, index: number) => {
                    return (
                        <div className="flex lg:flex-row flex-col items-center w-full border bg-white my-5 shadow-lg p-5 rounded-md border-l-4 border-t-0 border-r-0 border-b-0 border-green-2" key={index}>
                            <div className="p-5">
                                <Image src={user.userImage === 'default' ? defaultUserImg : user.userImage} alt="user profile image" width="90" height="50" className="hover:shadow-md" />
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