'use client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { storeActions } from '../../redux/store';
import '../register.css';
import Image from 'next/image';
import logo from '../../../public/assets/images/logoNoTxt.png';
import PersonalInfo from "../../../components/forms/PersonalInfo";
import ContactInfo from "../../../components/forms/ContactInfo";
import ServicesSelect from '../../../components/forms/ServicesSelect';
import DailyRate from '../../../components/forms/DailyRate';
import UploadProfileImg from '../../../components/forms/UploadProfileImg';
import Description from '../../../components/forms/Description';
import SelectHood from '../../../components/forms/SelectHood';
import RegisterOpitons from '../../../components/forms/RegisterOptions';
import RegistrationComplete from '../../../components/forms/RegistrationComplete';
import ImgUploadSuccess from '../../../components/forms/ImgUploadSuccess';
import OwnerCombined from '../../../components/forms/owners/OwnerCombined';
import Link from 'next/link';

const RegisterSteps = () => {
    const dispatch = useDispatch();
    const [ formStep, setFormStep ] = useState(0);
    const [ ownerStep, setOwnerStep ] = useState(0);

    const nextFormStep = ( manualStep = '' ) => {
        if ( manualStep === 'owner' ) {
            setOwnerStep(() => ownerStep + 1);
            //Hiding the form for sitters
            setFormStep(99);
        } 
        else if ( manualStep === 'ownerSkip' ) setOwnerStep(() => ownerStep + 2);
        else {
            setFormStep( () => {
                if ( manualStep === 'skip' ) return formStep + 2;
                return formStep + 1;
            } );
        }
    }

    const handlePersonalData = (value: any) => {
        console.log(value);
        // Sending the data to redux store on every separate step
        dispatch(storeActions.storeData(value));
    }

    return (
        <div className='registration-wrapper flex flex-col items-center justify-center'>
            <div className="flex flex-col m-auto px-10 py-10 sm:shadow-xl sm:w-100 w-full registration-wrapper-inner">
                <div className="flex justify-center">
                    <Link href="/"><Image src={logo} height="160" width="120" alt="site logo" /></Link>
                </div>
                {/* Additional step only for owners */}
                { ownerStep === 1 && <OwnerCombined nextFormStep={nextFormStep} handleData={handlePersonalData} />  }
                {/* Steps for sitters */}
                { formStep === 0 && <RegisterOpitons nextFormStep={nextFormStep} handleData={handlePersonalData} /> }
                { formStep === 1 && <PersonalInfo nextFormStep={nextFormStep} handleData={handlePersonalData} />  }
                { formStep === 2 && <ContactInfo nextFormStep={nextFormStep} handleData={handlePersonalData} /> }
                { formStep === 3 && <ServicesSelect nextFormStep={nextFormStep} handleData={handlePersonalData} /> }
                { formStep === 4 && <DailyRate nextFormStep={nextFormStep} handleData={handlePersonalData} /> }
                {/* Second step for owners */}
                { (formStep === 5 || ownerStep === 2) && <UploadProfileImg nextFormStep={nextFormStep} handleData={handlePersonalData} /> }
                { (formStep === 6 || ownerStep === 3) && <ImgUploadSuccess nextFormStep={nextFormStep} /> }
                { formStep === 7 && <Description nextFormStep={nextFormStep} handleData={handlePersonalData} /> }
                { formStep === 8 && <SelectHood nextFormStep={nextFormStep} handleData={handlePersonalData} /> }
                { (formStep === 9 || ownerStep === 4) && <RegistrationComplete /> }
            </div>
        </div>
    )
}

export default RegisterSteps;
