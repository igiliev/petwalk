'use client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { storeActions } from '../../redux/store';
import '../register.css';
import Image from 'next/image';
import logo from '../../../public/assets/images/logo.png';
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
import Link from 'next/link';

const RegisterSteps = () => {
    const dispatch = useDispatch();
    const [ formStep, setFormStep ] = useState(0);
    const nextFormStep = ( skipStep = '' ) => setFormStep( () => {
        if ( skipStep === 'skip' ) return formStep + 2;
        return formStep + 1;
    } );

    const handlePersonalData = (value: any) => {
        console.log(value);
        // Sending the data to redux store on every separate step
        dispatch(storeActions.storeData(value));
    }

    return (
        <div className='registration-wrapper flex flex-col items-center justify-center'>
            <div className="flex flex-col m-auto px-10 py-10 shadow-xl sm:w-100 w-full registration-wrapper-inner">
                <div className="flex justify-center">
                    <Image src={logo} height="160" width="120" alt="site logo" />
                </div>
                {/* TODO: Change this into dynamic paths instead of formSteps */}
                { formStep === 0 && <RegisterOpitons nextFormStep={nextFormStep} handleData={handlePersonalData} /> }
                { formStep === 1 && <PersonalInfo nextFormStep={nextFormStep} handleData={handlePersonalData} />  }
                { formStep === 2 && <ContactInfo nextFormStep={nextFormStep} handleData={handlePersonalData} /> }
                { formStep === 3 && <ServicesSelect nextFormStep={nextFormStep} handleData={handlePersonalData} /> }
                { formStep === 4 && <DailyRate nextFormStep={nextFormStep} handleData={handlePersonalData} /> }
                { formStep === 5 && <UploadProfileImg nextFormStep={nextFormStep} handleData={handlePersonalData} /> }
                { formStep === 6 && <ImgUploadSuccess nextFormStep={nextFormStep} /> }
                { formStep === 7 && <Description nextFormStep={nextFormStep} handleData={handlePersonalData} /> }
                { formStep === 8 && <SelectHood nextFormStep={nextFormStep} handleData={handlePersonalData} /> }
                { formStep === 9 && <RegistrationComplete /> }
            </div>
            <div className='w-full text-left'>
                <Link href="/">
                    <Image src={logo} height="220" width="160" alt="site logo" />
                </Link>
            </div>
        </div>
    )
}

export default RegisterSteps;
