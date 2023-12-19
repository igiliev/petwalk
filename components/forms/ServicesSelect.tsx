import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircle, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import './Forms.css';
import { useSelector } from 'react-redux';
import { GetStoreData } from '../../public/interfaces/globals';

const ServicesSelect = (props: any) => {
    const [ selected, setSelected ]: any = useState({
        walk: false,
        ownerHome: false,
        walkerHome: false,
        dayCare: false,
        visitation: false,
        dog: false,
        cat: false,
        otherAnimal: false
     });
     const [ petSitter, setPetsitter ] = useState(false);
     const getState: any = useSelector<GetStoreData>( state => state.dataStore.data );
     
     useEffect( () => {
        setPetsitter(getState.find( (item: any) => item['regOption'] ).regOption === 'sitter');
    }, [getState] );

    // TODO: Fix all the types here
    const handleCheck = (event: any) => {
        switch( event.target.value ) {
            case 'walk':
                setSelected( (prevVal: { walk: any; }) => ({...prevVal, walk: !prevVal.walk}) );
            break;
            case 'ownerHome':
                setSelected( (prevVal: { ownerHome: any; }) => ({...prevVal, ownerHome: !prevVal.ownerHome}) );
            break;
            case 'walkerHome':
                setSelected( (prevVal: { walkerHome: any; }) => ({...prevVal, walkerHome: !prevVal.walkerHome}) );
            break;
            case 'dayCare':
                setSelected( (prevVal: { dayCare: any; }) => ({...prevVal, dayCare: !prevVal.dayCare}) );
            break;
            case 'visitation':
                setSelected( (prevVal: { visitation: any; }) => ({...prevVal, visitation: !prevVal.visitation}) );
            break;
            case 'dog':
                setSelected( (prevVal: { dog: any; }) => ({...prevVal, dog: !prevVal.dog}) );
            break;
            case 'cat':
                setSelected( (prevVal: { cat: any; }) => ({...prevVal, cat: !prevVal.cat}) );
            break;
            case 'otherAnimal':
                setSelected( (prevVal: { otherAnimal: any; }) => ({...prevVal, otherAnimal: !prevVal.otherAnimal}) );
            break;
        }
    }

    // TODO: Change this hacky way of sending the selected services
    const handleSubmit = (event: any) => {
        event.preventDefault();
        const storeAll: { value: any, selected: any }[] = [];
        for( let service in selected ) {
            storeAll.push( { value: service, selected: selected[service] } );
        }
        const selectedService = storeAll.filter( item => item.selected === true );
        const optionLabels = [
            { option: 'walk', label: 'Разходка на куче' },
            { option: 'ownerHome', label: 'Гледане в дома на собственика' },
            { option: 'walkerHome', label: 'Гледане в дома на водача' },
            { option: 'dayCare', label: 'Дневна грижа за любимците' },
            { option: 'visitation', label: 'Посещение на място' },
        ]
        const getSelectedLabel = optionLabels.filter( service => selectedService.find( label => label.value === service.option ) );
        const selectedNames = selectedService.map( item => item.value );

        props.handleData({
            selectedNames,
            labelNames: getSelectedLabel
        });
        props.nextFormStep();
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                { <h1 className="text-2xl text-center mb-8">{ petSitter ? 'Услуги които предлагате' : 'Услуги от които сте заинтересовани' }</h1> }
                <div className="mb-5">
                    <label htmlFor="walk" className='flex text-lg hover:cursor-pointer'>
                        <span>
                            <FontAwesomeIcon icon={ !selected.walk ? faCircle : faCircleCheck} style={{ fontSize: 30, color: "#48A9A6" }}/>
                        </span>
                        <span className="ml-4">Разходка на куче</span>
                        <input type="checkbox" id="walk" name="walk" value="walk" onClick={handleCheck} className="opacity-0" />
                    </label>
                </div>

                <div className="mb-5">
                    <label htmlFor="ownerHome" className='flex text-lg hover:cursor-pointer'>
                        <span>
                            <FontAwesomeIcon icon={ !selected.ownerHome ? faCircle : faCircleCheck} style={{ fontSize: 30, color: "#48A9A6" }}/>
                        </span>
                        <span className="ml-4">Гледане в дома на собственика</span>
                        <input type="checkbox" id="ownerHome" name="ownerNome" value="ownerHome" onChange={handleCheck} className="opacity-0" />
                    </label>
                </div>

                <div className="mb-5">
                    <label htmlFor="walkerHome" className='flex text-lg hover:cursor-pointer'>
                        <span>
                            <FontAwesomeIcon icon={ !selected.walkerHome ? faCircle : faCircleCheck} style={{ fontSize: 30, color: "#48A9A6" }}/>
                        </span>
                        <span className="ml-4">Гледане в дома на гледача</span>
                        <input type="checkbox" id="walkerHome" name="walkerHome" value="walkerHome" onChange={handleCheck} className="opacity-0" />
                    </label>
                </div>

                <div className="mb-5">
                    <label htmlFor="visitation" className='flex text-lg hover:cursor-pointer'>
                        <span>
                            <FontAwesomeIcon icon={ !selected.visitation ? faCircle : faCircleCheck} style={{ fontSize: 30, color: "#48A9A6" }}/>
                        </span>
                        <span className='ml-4'>Посещение на място</span>
                        <input type="checkbox" id="visitation" name="visitation" value="visitation" onChange={handleCheck} className="opacity-0" />
                    </label>
                </div>

                <div className="mb-5 items-center">
                    <label htmlFor="dayCare" className='flex text-lg hover:cursor-pointer'>
                        <span>
                            <FontAwesomeIcon icon={ !selected.dayCare ? faCircle : faCircleCheck} style={{ fontSize: 30, color: "#48A9A6" }}/>
                        </span>
                        <span className='ml-4'>Дневна грижа за любимците</span>
                        <input type="checkbox" id="dayCare" name="dayCare" value="dayCare" onChange={handleCheck} className="opacity-0" />
                    </label>
                </div>

                {/* Select the type of animal section */}
                {
                petSitter ?
                    <h1 className="text-2xl text-center my-8">Какво животинче бихте желали да гледате?</h1>
                :
                    <h1 className="text-2xl text-center my-8">Какво животинче имате?</h1>
                }
                <div className="mb-5">
                    <label htmlFor="dog" className='flex text-lg hover:cursor-pointer'>
                        <span>
                            <FontAwesomeIcon icon={ !selected.dog ? faCircle : faCircleCheck} style={{ fontSize: 30, color: "#48A9A6" }}/>
                        </span>
                        <span className='ml-4'>Куче</span>
                        <input type="checkbox" id="dog" name="dog" value="dog" onChange={handleCheck} className="opacity-0" />
                    </label>
                </div>

                <div className="mb-5">
                    <label htmlFor="cat" className='flex text-lg hover:cursor-pointer'>
                        <span>
                            <FontAwesomeIcon icon={ !selected.cat ? faCircle : faCircleCheck} style={{ fontSize: 30, color: "#48A9A6" }}/>
                        </span>
                        <span className='ml-4'>Котка</span>
                        <input type="checkbox" id="cat" name="cat" value="cat" onChange={handleCheck} className="opacity-0" />
                    </label>
                </div>

                <div className="mb-5">
                    <label htmlFor="otherAnimal" className='flex text-lg hover:cursor-pointer'>
                        <span>
                            <FontAwesomeIcon icon={ !selected.otherAnimal ? faCircle : faCircleCheck} style={{ fontSize: 30, color: "#48A9A6" }}/>
                        </span>
                        <span className='ml-4'>Други</span>
                        <input type="checkbox" id="otherAnimal" name="otherAnimal" value="otherAnimal" onChange={handleCheck} className="opacity-0" />
                    </label>
                </div>

                <div className="flex w-full">
                    <button className={`bg-green-2 p-4 w-full text-white mt-4 rounded`}>Напред</button>
                </div>
            </form>
        </div>
    )
}

export default ServicesSelect;