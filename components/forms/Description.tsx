import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { GetStoreData } from "../../public/interfaces/globals";

const Description = (props: any) => {
    const [ selfDescribeVal, setSelfDescribeVal ] = useState('')
    const [ nextDisabled, setNextDisabled ] = useState(true);
    const [ petSitter, setPetsitter ] = useState(false);
    const getState: any = useSelector<GetStoreData>( state => state.dataStore.data );
    useEffect( () => {
       setPetsitter(getState.find( (item: any): any => item['regOption'] ).regOption === 'sitter');
   }, [getState] );

    const selfDescribe = (event: any) => {
        setSelfDescribeVal(event.target.value);
        setNextDisabled( event.target.value === '' );
    }
    
    const handleSubmit = (event: any) => {
        event.preventDefault();
        props.handleData({
            selfDescribeVal
        });
        petSitter ? props.nextFormStep() : props.nextFormStep('skip');
    }

    return (
        <form onSubmit={handleSubmit}>
            { <h1 className="text-2xl font-semibold text-center mb-5">{ petSitter ? 'Опишете услугите които предлагате накратко' : 'Опишете услугите от които сте заинтересовани накратко' }</h1> }
            <div className="flex flex-col mb-5">
                 <label htmlFor="selfDescribe" className="text-lg mb-2">{ petSitter ?  'Опишете какви умения притежавате' : 'Опишете какви умения трябва да притежава гледача който търсите' }</label>
                 <textarea onChange={selfDescribe} className="border rounded py-2 pl-3" id="selfDescribe" />
             </div>

            <div className="mb-3i">
                <h3 className="text-lg font-semibold mb-3">За да опишете услугите ще ви помогнат следните въпроси:</h3>
                <ul className="list-disc ml-4 leading-9">
                    {   
                    //Different content based on selected pet-sitter or pet-owner
                    petSitter ?
                        <>
                            <li>Какви услуги предлагате?</li>
                            <li>Какъв опит имате?</li>
                            <li>Защо трябва да ви наемат?</li>
                            <li>Има ли някаква специална квалификация или обучение?</li>
                            <li>Каква е вашата наличност и свободно време?</li>
                        </>
                    :
                    <>
                            <li>Какви услуги търсите?</li>
                            <li>Търсите ли човек със специална квалификация или обучение?</li>
                            <li>Каква е вашата наличност и свободно време?</li>
                    </>
                    }
                 </ul>
             </div>

            <div className="flex w-full">
                <button disabled={ nextDisabled } className={`bg-green-2 p-4 w-full text-white mt-4 rounded ${nextDisabled ? 'disabled' : ''}`}>Напред</button>
            </div>
        </form>
    )
}

export default Description;
