'use client';
import Link from "next/link";
import logo from '../../public/assets/images/logo-footer.png';
import Image from "next/image";
import './Header.css';
import { useDispatch, useSelector } from "react-redux";
import { GetStoreData } from "../../public/interfaces/globals";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { storeActions } from "../../app/redux/store";
import { useState, useEffect } from "react";

const Header = () => {
    const userLoggedin = useSelector<GetStoreData>(state => state.dataStore.userLoggedin);
    const userData: any = useSelector<GetStoreData>(state => state.dataStore.data);
    const [ userEmail, setUserEmail ] = useState('');
    const [hideMenu, setHideMenu] = useState(true);
    const [burgerClassToggle, setBurgerClassToggle] = useState(false);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if( userData[0] ) setUserEmail(userData[0].email)
    }, []);

    const handleLogout = async () => {
        dispatch(storeActions.setUserLogin(false));
        await signOut(auth);
    }
  
    const showMenu = () => {
        setHideMenu(state => !state);
        setBurgerClassToggle(state => !state);
    }
    
    return (
        <header className="shadow-md fixed bg-white z-50 top-0 text-center w-full grid">
            <nav className="flex items-center md:flex-row w-full justify-between py-5 justify-self-center">
                <div className="w-[140px] max-md:pl-5 md:ml-20">
                    <Link href="/"><Image src={logo} alt="pesitter logo" height="80" width="110" /></Link>
                </div>
                <div className={`${hideMenu ? 'hidden' : 'flex'} absolute h-[calc(100vh-80px)] bg-primary-gray top-[80px] w-full flex-col items-start lg:justify-evenly lg:whitespace-nowrap md:relative md:h-auto md:flex md:top-[0px] md:bg-white md:flex-row max-md:px-8 max-md:font-semibold md:items-center`}>
                    <div className="flex items-start text-xl md:text-lg lg:text-xl flex-col md:flex-row md:justify-between md:[&>*]:mx-4">
                        {/* Temporary removal 
                        <Link href="/becomeSitter" className="nav-link pb-1 relative group max-sm:mb-3">Станете Гледач</Link> */}
                        <Link href="/findSitters" className="nav-link pb-1 relative max-md:mb-5 max-md:pt-5">Намерете Гледач</Link>
                        <Link href="/help" className="nav-link pb-1 relative max-md:mb-5">Помощ</Link>
                    </div>
                    <div className="flex items-start flex-col md:flex-row text-xl md:text-base lg:text-xl md:[&>*]:mx-4 md:items-center max-md:relative max-md:w-full">
                        {
                            userLoggedin ?
                                <>
                                    {/* <Link href="/userChat" className="nav-link relative">Профил</Link> */}
                                    <Link href='/userChat' className="nav-link relative max-md:mb-5">Съобщения</Link>
                                    <button className="nav-link relative max-md:mb-5" onClick={handleLogout}>Изход</button>
                                    <p className="bg-green-2 text-white px-4 py-2 rounded hover:bg-gold hover:bg-teal-700 max-md:absolute max-md:-bottom-20 max-md:w-full md:hidden">Добре дошъл: {userEmail}</p>
                                </>
                                :
                                <>
                                    <Link href="/register/regOptions" className="text-slate-500 border-2 px-4 py-2 rounded border-slate-500 hover:border-slate-800 hover:text-slate-800  max-md:mb-5">Намерете работа</Link>
                                    <Link href="/login" className="nav-link relative max-md:mb-5">Вход</Link>
                                    <Link href="/register/regOptions" className="bg-green-2 text-white px-4 py-2 rounded hover:bg-gold hover:bg-teal-700 max-md:absolute max-md:-bottom-12 max-md:w-full">Регистрация</Link>
                                </>
                        }
                    </div>
                </div>
                <button className={`${burgerClassToggle ? 'open' : ''} mx-6 md:hidden burger-menu [&_span]:bg-teal-600`} onClick={showMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </nav>
        </header>
    )
}

export default Header;