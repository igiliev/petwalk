'use client';
import { useState } from "react";

const ContactInfo = (props: any) => {
    const [ mailVal, setMailVal ] = useState('');
    const [ emailValidation, setEmailValidation ] = useState(false);
    const [ phoneVal, setPhoneVal ] = useState('');
    const [ nextDisabled, setNextDisabled ] = useState(true);

    const handleMailVal = (event: any) => {
        setMailVal(event.target.value);
        setNextDisabled(event.target.value === 0);
    }

    const handlePhoneVal = (event: any) => {
        setPhoneVal(event.target.value);
        setNextDisabled(event.target.value === 0);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const emailRegex = /^[A-Za-z0-9._+\-\']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/g;
        if ( !mailVal.match(emailRegex) ) {
            setEmailValidation(true);
            return;
        } 
        props.handleData({
            mailVal,
            phoneVal
        });
        props.nextFormStep();
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1 className="text-2xl text-center mb-5">Как бихте желали да се свържат с вас?</h1>
            <div className="flex flex-col mb-5">
                <label htmlFor="email">Имейл</label>
                <input onChange={handleMailVal} className="border rounded py-2 pl-3" id="email" />
                { emailValidation && <span className="text-red-500 font-medium mt-2">Моля използвайте валиден имейл адрес</span> }
            </div>

            <div className="flex flex-col">
                <label htmlFor="phone">Телефонен номер</label>
                <input onChange={handlePhoneVal} className="border rounded py-2 pl-3" id="phone" />
            </div>
            <div className="flex w-full">
                <button disabled={ nextDisabled } className={`bg-green-2 p-4 w-full text-white mt-4 rounded ${nextDisabled ? 'disabled' : ''}`}>Напред</button>
            </div>
        </form>
    )
}

export default ContactInfo;
