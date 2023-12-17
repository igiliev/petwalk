'use client';
import { useState } from "react";
import './Forms.css';

interface SitterData {
    regOption: string;
}

const RegisterOpitons = (props: any) => {
    const [ sitterOption, setSitterOption ] = useState<SitterData>();
    const [ clickedSitter, setClickedSitter ] = useState(false);
    const [ clickedOwner, setClickedOwner ] = useState(false);
    const [ nextDisabled, setNextDisabled ] = useState(true);
    
    const sitterHandler = () => {
        setSitterOption({ regOption: 'sitter'});
        setClickedSitter( true );
        setClickedOwner( false );
        setNextDisabled(false);
    }
    
    const ownerHandler = () => {
        setSitterOption({ regOption: 'owner'});
        setClickedOwner( true );
        setClickedSitter( false );
        setNextDisabled(false);
    } 
    
    const handleSubmit = ( event: any ) => {
        event.preventDefault();
        props.handleData(sitterOption);
        if( sitterOption?.regOption === 'owner' ) {
            props.nextFormStep('owner');
        } else {
            props.nextFormStep();
        }
    }

    return (
        <form className="flex flex-col justify-evenly" onSubmit={handleSubmit}>
            <h1 className="text-2xl text-center mb-5">Какво търсите?</h1>
            <div>
                <input onClick={sitterHandler} type="radio" className="invisible" id="sitter" name="sitter" />
                <label className={`block w-full py-2 pl-5 cursor-pointer border-2 border-black rounded ${ clickedSitter ? 'border-green-2' : '' } `} htmlFor="sitter">Търся работа като гледач</label>
            </div>

            <div>
                <input onClick={ownerHandler} type="radio" className="invisible" id="LFsitter" name="sitter" />
                <label className={`block w-full py-2 pl-5 cursor-pointer border-2 border-black rounded mb-8 ${ clickedOwner ? 'border-green-2' : '' } `} htmlFor="LFsitter">Търся гледачи</label>
            </div>
            <div className="flex w-full">
                <button className={`bg-green-2 p-4 w-full text-white mt-4 rounded  ${ nextDisabled ? 'disabled' : '' }`}>Напред</button>
            </div>
        </form>
    )   
}

export default RegisterOpitons;
