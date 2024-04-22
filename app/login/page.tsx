'use client';
import { useState } from 'react';
import './login.css';
import signIn from '../../firebase/auth/signin';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/config';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { storeActions } from '../redux/store';
import logo from '../../public/assets/images/logoNoTxt.png';

const Login = () => {
    const [ emailValue, setEmailValue ] = useState('');
    const [ passwordValue, setPasswordValue ] = useState('');
    const [ userIsLogged, setUserIsLogged ] = useState(false);
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
                // Successful login!
                console.log('Login success!', user);
                dispatch(storeActions.setCurrentUserId(user.auth.currentUser.uid));
                setUserIsLogged(true);
            } else {
                console.error('You are NOT logged in');
            }
        } );
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
                    <div className='flex justify-center mb-3'>
                        <Image src={logo} height="160" width="110" alt="site logo" />
                    </div>
                    <h1 className="text-center text-2xl mb-3">Успешно вписване</h1>
                    <Link href="/">
                        <button onClick={handleBackToHome} className="bg-green-2 p-2 w-full text-white text-lg mt-4 rounded">Обратно към начална страница</button>
                    </Link>
                </div>
                :
                <div className='flex flex-col m-auto w-100'>
                    <form className="px-10 py-10 shadow-xl" onSubmit={handleSubmit}>
                        <div className='flex justify-center mb-3'>
                            <Link href="/">
                                <Image src={logo} height="160" width="110" alt="site logo" />
                            </Link>
                        </div>
                        <h1 className="text-2xl text-center mb-5">Добре дошли обратно в Petsit.bg</h1>
                        <div className="flex flex-col mb-5">
                            <label htmlFor="email">Имейл</label>
                            <input onChange={handleMailVal} className="border rounded py-2 pl-3" id="email" />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="phone">Парола</label>
                            <input onChange={handlePassword} type="password" className="border rounded py-2 pl-3" id="phone" />
                        </div>
                        <div className="flex w-full">
                            <button className={`bg-green-2 p-4 w-full text-white text-xl mt-4 rounded`}>Влез</button>
                        </div>
                    </form>
                </div>
            }
        </div>
    )
}

export default Login;
