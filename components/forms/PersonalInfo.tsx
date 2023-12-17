'use client';
import { useState } from "react";

const PersonalInfo = (props: any) => {
    const [ nameVal, setNameVal ] = useState('');
    const [ passVal, setPassVal ] = useState('');
    const [ passValidation, setPassValidation ] = useState(false);
    const [ nextDisabled, setNextDisabled ] = useState(true);
    
    const handleNameVal = (event: any) => {
        setNameVal(event.target.value);
        setNextDisabled(event.target.value.length === 0);
    }
    
    const handlePassVal = ( event: any ) => {
        setPassVal(event.target.value);
        setNextDisabled(event.target.value.length === 0);
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        if ( passVal.length < 6 ) {
            setPassValidation(true);
            return;
        }
        
        props.handleData({
            nameVal,
            passVal
        });
        props.nextFormStep();
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1 className="text-2xl text-center mb-5">Лични данни</h1>
            <div className="flex flex-col mb-5">
                <label className="w-6" htmlFor="name">Име</label>
                <input onChange={handleNameVal} value={nameVal} className="border rounded py-2 pl-3" id="name" />
            </div>

            <div className="flex flex-col">
                <label className="w-6" htmlFor="password">Парола</label>
                <input onChange={handlePassVal} type="password" className="border rounded py-2 pl-3" id="password" />
                { passValidation && <span className="text-red-500 font-medium mt-2">Паролата трябва да е с минимум 6 символа</span> }
            </div>
            <div className="flex w-full">
                <button disabled={ nextDisabled } className={`bg-green-2 p-4 w-full text-white mt-4 rounded ${nextDisabled ? 'disabled' : ''}`}>Напред</button>
            </div>
        </form>
    )
}

export default PersonalInfo;
