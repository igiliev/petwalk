'use client';
import { useState } from 'react';
import './login.css';
import signIn from '../../firebase/auth/signin';
import { onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref } from "firebase/database";
import { auth } from '../../firebase/config';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { storeActions } from '../redux/store';
import logo from '../../public/assets/images/logo.png';
import { getUser } from '../api/helper/users/userService';

const Login = () => {
    const [ emailValue, setEmailValue ] = useState('');
    const [ passwordValue, setPasswordValue ] = useState('');
    const [ userIsLogged, setUserIsLogged ] = useState(false);
    const [ logedUser, setLogedUser ] = useState([]);
    const dispatch = useDispatch();

    const handleMailVal = (event: any) => {
        setEmailValue(event.target.value);
    }

    const handlePassword = (event: any) => {
        setPasswordValue(event.target.value);
    }

    const monitorState = async () => {
        await onAuthStateChanged( auth, (user: any) => {
            if ( user ) {
                setLogedUser(user);
                // Successful login!
                console.log('Login success!');
                const userId = '';
                getUser().then( (res: any) => {
                    for (let i = 0; i < res.length; i++) {
                        const obj = res[i];
                        const getName = obj.data.sitterData.find( (item: any) => item.nameVal ).nameVal;
                        const getMail = obj.data.sitterData.find( (user: any) => user.mailVal ).mailVal;

                        if ( getMail === emailValue ) {
                            //Storing the current loged in user full name to the store
                            dispatch(storeActions.currentUserName(getName));
                        }
                      }
                } );

                dispatch(storeActions.currentUserId(user.auth.currentUser.uid));
                setUserIsLogged(true);
            } else {
                console.error('You are NOT logged in');
            }
        } );

        const db = getDatabase();
        const starCountRef = ref(db, 'petSitters');
        console.log(db.app.options.messagingSenderId);
    }

    const handleBackToHome = () => {
        dispatch(storeActions.setUserLogin(true));
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        signIn( emailValue, passwordValue );
        monitorState();
    }

    return (
        <div className='login-wrapper'>
            {
                userIsLogged ?
                <div className="flex flex-col m-auto px-10 py-10 shadow-xl w-100">
                    <h1 className="text-center text-2xl">Успешно вписване</h1>
                    <Link href="/">
                        <button onClick={handleBackToHome} className="bg-red-400 p-2 w-full text-white text-lg mt-4 rounded">Обратно към начална страница</button>
                    </Link>
                </div>
                :
                <div className='flex flex-col m-auto w-100'>
                    <form className="px-10 py-10 shadow-xl" onSubmit={handleSubmit}>
                        <h1 className="text-2xl text-center mb-5">Добре дошли обратно в Petwalk.com</h1>
                        <div className="flex flex-col mb-5">
                            <label htmlFor="email">Имейл</label>
                            <input onChange={handleMailVal} className="border rounded py-2 pl-3" id="email" />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="phone">Парола</label>
                            <input onChange={handlePassword} type="password" className="border rounded py-2 pl-3" id="phone" />
                        </div>
                        <div className="flex w-full">
                            <button className={`bg-red-400 p-4 w-full text-white text-xl mt-4 rounded`}>Влез</button>
                        </div>
                    </form>
                    <div className='w-full absolute bottom-0 left-0'>
                        <Link href="/">
                            <Image src={logo} height="220" width="160" alt="site logo" />
                        </Link>
                    </div>
                </div>
            }
        </div>
    )
}

export default Login;
