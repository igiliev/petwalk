'use client';
import { useSelector } from "react-redux";
import { GetStoreData } from "../../public/interfaces/globals";

const ImgUploadSuccess = (props: any) => {
    const getState: any = useSelector<GetStoreData>( state => state.dataStore.data );

    const handleClick = () => {
        const getOwner: boolean = getState.some( (opt: {regOption: string}) => opt.regOption === 'owner' );
        props.nextFormStep( getOwner ? 'owner' : '');
    }

    return (
        <div>
            <h1 className="text-2xl text-center mb-5">Снимката изглежда супер!</h1>
            <p>Това е отличен начин да създадете добро първо впечатление. Снимката ви ще се показва в личният ви профил, резултатите от търсенето и във входящата поща.</p>

            <div className="flex w-full">
                <button onClick={handleClick} className="bg-green-2 p-4 w-full text-white mt-4 rounded">Напред</button>
            </div>
        </div>
    )
}

export default ImgUploadSuccess;