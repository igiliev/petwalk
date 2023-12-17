import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const MultiSelect = ({ options, selected, toggleOption }: any) => {

    // Adding this because of browser error
    const handleChange = () => {  }
    
    return (
        <div className="c-multi-select-dropdown">
        <div className="c-multi-select-dropdown__selected">
        </div>
        <ul className="c-multi-select-dropdown__options">
            { options.map( (option: { id: any, value: any, label: any }) => {
                const isSelected = selected.includes(option.id);
                return (
                    <li key={option.id} className="relative py-2 ml-5" onClick={() => toggleOption({ id: option.id })}>
                        { isSelected && <FontAwesomeIcon icon={ faCheck } style={{ position: 'absolute', left: -20, fontSize: 25, color: "#48A9A6" }}/> }
                        <input type="checkbox" checked={isSelected} onChange={handleChange} className="invisible" />
                        <span className="cursor-pointer text-lg">{option.label}</span>
                    </li>
                );
            } ) }
        </ul>
    </div>
    )
}

export default MultiSelect;
