'use client';

import { useEffect, useState } from "react";
import MultiSelect from "../multiSelect/MultiSelect";
import { hoods } from "../../public/consts/globals";
import { v4 } from 'uuid';
import './Forms.css';

export interface HoodOption {
    label: string;
    value: string;
    id: string;
    selected: boolean;
}

const sortedHoods = hoods.sort( ( a, b )  => a.localeCompare( b ) );

const SelectHood = (props: any) => {
    const [ selected, setSelected ] = useState<string[]>([]);
    const [ inputValue, setInputValue ] = useState<string>('');
    const [ hoodObj, setHoodObj ] = useState<HoodOption[]>([]);
    const [ filterData, setFilterData ] = useState<HoodOption[]>([]);

    useEffect( () => {
        const mappedData = sortedHoods.map( hood => {
            return {
                label: hood,
                value: hood.replaceAll(' ', '_'),
                id: v4(),
                selected: false
            }
        } );

        setHoodObj(mappedData);
        setFilterData(mappedData);
    }, [] );

    // TODO: Fix this type
    const toggleOption = ({ id }: any) => {
        setSelected((prevSelected: any) => {
            const newArray: any = [...prevSelected];
            if (newArray.includes(id)) {
                return newArray.filter((item: any) => item !== id);
            } else {
                newArray.push(id);
                return newArray;
            }
        });
        
        const clicked = selected.includes( id );
        hoodObj.forEach( (item:any) => {
            if (item.id === id) item.selected = !clicked;
        } );
    } 

    const handleHoodDynamicSearch = (event: any) => {
        const value: string = event.target.value;
        if ( value === '' ) {
            setHoodObj(filterData)
        } else {
            const filter = filterData.filter( (item:any) => item.label.includes( inputValue.toUpperCase() ) );
            setHoodObj(filter);
    }
        setInputValue(value);
}
    
    const handleSubmit = (event: any) => {
        event.preventDefault();
        const selectedOptions: HoodOption[] | any = filterData.filter( (option: HoodOption) => option.selected === true );
        props.handleData({
            selectedHoods: selectedOptions
        });
        props.nextFormStep();
    }
    
    return (
        <form>
            <h1 className="text-xl mb-2">Изберете кварталите в които ще работите</h1>
                <div className="mb-5">
                    <input type="text" placeholder="Търсете квартали" value={inputValue} className="w-full border-2 p-2" onChange={handleHoodDynamicSearch} />
                </div>
            
             <div className="hood-form-inner">
                <MultiSelect options={hoodObj} selected={selected} toggleOption={toggleOption} />
             </div>
            <div className="flex w-full">
                <button onClick={handleSubmit} disabled={ selected.join('').length === 0 } className={`bg-green-2 p-4 w-full text-white text-xl mt-4 rounded ${ selected.join('').length === 0 ? 'disabled' : ''}`}>Завърши регистрация</button>
            </div>
        </form>
    )
}

export default SelectHood;
