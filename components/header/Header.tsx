'use client';
import Link from "next/link";
import logo from '../../public/assets/images/logo-footer.png';
import Image from "next/image";
import './Header.css';
import { useDispatch, useSelector } from "react-redux";
import { getStoreData } from "../forms/RegistrationComplete";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { storeActions } from "../../app/redux/store";
import { useState } from "react";

const Header = () => {
    const userLoggedin = useSelector<getStoreData>(state => state.dataStore.userLoggedin);
    const dispatch = useDispatch();

    const handleLogout = async () => {
        dispatch(storeActions.setUserLogin(false));
        await signOut(auth);
    }
    const [hideMenu, setHideMenu] = useState(true);
    const [burgerClassToggle, setBurgerClassToggle] = useState(false);

    const showMenu = () => {
        setHideMenu(state => !state);
        setBurgerClassToggle(state => !state);
    }
    
    return (
        <header className="shadow-md fixed bg-white z-50 top-0 text-center w-full grid">
            <nav className="flex items-center md:flex-row w-full justify-between py-5 justify-self-center">
                <div className={`${hideMenu ? 'hidden' : 'flex'} absolute md:relative md:top-[0px] top-[80px] h-[calc(100vh-80px)] md:h-auto md:flex flex-col md:bg-white bg-primary-gray w-full md:flex-row md:items-center text-center items-center justify-evenly lg:justify-evenly lg:whitespace-nowrap`}>
                    <div className="w-[140px]">
                        <Link href="/"><Image src={logo} alt="pesitter logo" height="100" width="140" /></Link>
                    </div>

                    <div className="flex items-center text-xl md:text-lg lg:text-xl flex-col md:flex-row md:justify-between md:[&>*]:mx-4">
                        {/* Temporary removal 
                        <Link href="/becomeSitter" className="nav-link pb-1 relative group max-sm:mb-3">Станете Гледач</Link> */}
                        <Link href="/findSitters" className="nav-link pb-1 relative max-sm:mb-3">Намерете Гледач</Link>
                        <Link href="/help" className="nav-link pb-1 relative">Помощ</Link>
                    </div>
                    <div className="flex items-center flex-col md:flex-row text-xl md:text-base lg:text-xl md:[&>*]:mx-4">
                        {
                            userLoggedin ?
                                <>
                                    {/* <Link href="/userChat" className="nav-link relative">Профил</Link> */}
                                    <button className="nav-link relative" onClick={handleLogout}>Изход</button>
                                </>
                                :
                                <>
                                    <Link href="/register/regOptions" className="text-slate-500 border-2 px-4 py-2 rounded border-slate-500 hover:border-slate-800 hover:text-slate-800 max-sm:mb-3">Намерете работа</Link>
                                    <Link href="/login" className="nav-link relative max-sm:mb-3">Вход</Link>
                                    <Link href="/register/regOptions" className="bg-green-2 text-white px-4 py-2 rounded hover:bg-gold hover:bg-teal-700">Регистрация</Link>
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