'use client';
import Link from "next/link";
import logo from '../../public/assets/images/logo.png';
import Image from "next/image";
import './Header.css';
import { useDispatch, useSelector } from "react-redux";
import { GetStoreData } from "../../public/interfaces/globals";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { storeActions } from "../../app/redux/store";
import { useState } from "react";
import { v4 } from "uuid";


const Header = () => {
    const userLoggedin = useSelector<GetStoreData>(state => state.dataStore.userLoggedin);
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

    const testClick = () => {
        console.log(v4());
    }
    
    return (
        <header className="shadow-md fixed bg-white z-50 top-0 text-center w-full grid">
            <nav className="flex items-center md:flex-row w-full justify-between py-2  max-w-6xl justify-self-center">
                <div className="w-[140px]">
                    <Link href="/"><Image src={logo} alt="pesitter logo" height="100" width="140" /></Link>
                </div>
                <div className={`${hideMenu ? 'hidden' : 'flex'} absolute md:relative md:top-[0px] top-[80px] h-[calc(100vh-80px)] md:h-auto md:flex flex-col md:bg-white bg-primary-gray w-full md:flex-row md:items-center text-center md:justify-between`}>
                    <div className="flex items-center text-xl md:text-lg lg:text-xl flex-col md:flex-row md:justify-between md:[&>*]:mx-4">
                        <Link href="/becomeSitter" className="nav-link relative group">Станете Гледач</Link>
                        <Link href="/findSitters" className="nav-link relative">Намерете Гледач</Link>
                        <Link href="/help" className="nav-link relative">Помощ</Link>
                    </div>
                    <div className="flex items-center flex-col md:flex-row text-xl md:text-base lg:text-xl md:[&>*]:mx-4">
                        {
                            userLoggedin ?
                                <>
                                    <Link href="/userChat" className="nav-link relative">Профил</Link>
                                    <button className="nav-link relative" onClick={handleLogout}>Изход</button>
                                </>
                                :
                                <>
                                    <Link href="/register/regOptions" onClick={testClick} className="bg-slate-400 text-white px-4 py-2 rounded">Намерете работа</Link>
                                    <Link href="/login" className="nav-link relative">Вход</Link>
                                    <Link href="/register/regOptions" className="bg-red-500 text-white px-4 py-2 rounded">Регистрация</Link>
                                </>
                        }
                    </div>
                </div>
                <button className={`${burgerClassToggle ? 'open' : ''} mx-6 md:hidden burger-menu [&_span]:bg-red-500`} onClick={showMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </nav>
        </header>
    )
}

export default Header;