import { useState } from "react";

const DailyRate = (props: any) => {
    const [ rateVal, setRateVal ] = useState('');
    const [ rateOption, setRateOption ] = useState('day');
    const [ nextDisabled, setNextDisabled ] = useState(true);

    const handleRate = (event: any) => {
        setNextDisabled(event.target.value.length === 0)
        setRateVal(event.target.value);
    }

    const handleSelect = (event: any) => {
        setRateOption(event.target.value);
    }
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.handleData({
            rateVal,
            rateOption
        });
        props.nextFormStep();
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1 className="text-2xl text-center mb-5">Колко пари ще предлагате за тези услуги?</h1>
            <p className="mb-2 text-lg">Сума</p>
            <div className="flex mb-5">
                <div className="flex flex-col mr-5">
                    <div className="flex items-center border border-black rounded pl-3">
                        <span>лв</span>
                        <input onChange={handleRate} className="py-2 pl-3 outline-none border-none" id="email" />
                    </div>
                </div>

                <div className="w-full flex border border-black rounded">
                    <select name="ratePeriod" id="ratePeriod" className="w-full bg-inherit pl-3" onChange={handleSelect}>
                        <option value="day">/ден</option>
                        <option value="hour">/час</option>
                    </select>
                </div>
            </div>
            <p className="mb-5 text-slate-500">Ако не сте сигурни в тарифата, добавете приблизителна стойност. Винаги можете да я промените по-късно.</p>
            <div className="flex w-full">
                <button disabled={ nextDisabled } className={`bg-green-2 p-4 w-full text-white text-xl mt-4 rounded ${nextDisabled ? 'disabled' : ''}`}>Напред</button>
            </div>
        </form>
    )
}

export default DailyRate;
