import { useState } from "react"

const OwnerCombined = (props: any) => {
    const [ emailValidation, setEmailValidation ] = useState(false);
    const [ nextDisabled, setNextDisabled ] = useState(true);
    const [ mailVal, setMailVal ] = useState('');
    const [ passVal, setPassVal ] = useState('');
    const [ nameVal, setNameVal ] = useState('');
    const [ phoneVal, setPhoneVal ] = useState('');

    const handleMail = (event: any) => {
        setMailVal(event.target.value);
        setNextDisabled(event.target.value === '');
    }

    const handlePhone = (event: any) => {
        setPhoneVal(event.target.value);
        setNextDisabled(event.target.value === '');
    }

    const handleName = (event: any) => {
        setNameVal(event.target.value);
        setNextDisabled(event.target.value === '');
    }

    const handlePass = (event: any) => {
        setPassVal(event.target.value);
        setNextDisabled(event.target.value === '');
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const emailRegex = /^[A-Za-z0-9._+\-\']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/g;
        if ( !mailVal.match(emailRegex) ) {
            setEmailValidation(true);
            return;
        }

        props.handleData({
            mailVal,
            phoneVal,
            passVal,
            nameVal
        });
         props.nextFormStep('owner');
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1 className="text-2xl text-center mb-5">Как бихте желали да се свържат с вас?</h1>
            <div className="flex flex-col mb-5">
                <label htmlFor="owner-email">Имейл</label>
                <input onChange={handleMail} value={mailVal} className="border rounded py-2 pl-3" id="owner-email" />
                { emailValidation && <span className="text-red-500 font-medium mt-2">Моля използвайте валиден имейл адрес</span> }
            </div>

            <div className="flex flex-col mb-5">
                <label htmlFor="owner-phone">Телефонен номер</label>
                <input onChange={handlePhone} value={phoneVal} className="border rounded py-2 pl-3" id="owner-phone" />
            </div>

            <div className="flex flex-col mb-5">
                <label htmlFor="owner-name">Име</label>
                <input onChange={handleName} value={nameVal} className="border rounded py-2 pl-3" id="owner-name" />
            </div>

            <div className="flex flex-col mb-5">
                <label htmlFor="owner-pass">Парола</label>
                <input onChange={handlePass} value={passVal} type="password" className="border rounded py-2 pl-3" id="owner-pass" />
            </div>

            <div className="flex w-full">
                <button disabled={ nextDisabled } className={`bg-green-2 p-4 w-full text-white mt-4 rounded ${ nextDisabled ? 'disabled' : ''}` }>Напред</button>
            </div>
        </form>
    )
}

export default OwnerCombined;
