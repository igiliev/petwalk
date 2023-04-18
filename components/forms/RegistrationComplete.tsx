import { useSelector } from "react-redux";
import Link from "next/link";
import signUp from '../../firebase/auth/signup';

export interface getStoreData {
    dataStore: { data: any };
}

const RegistrationComplete = () => {
    const getState: any = useSelector<getStoreData>( state => state.dataStore.data );

   const handleClick = async () => {
        // Send the data to the BE when we have reached the final step of registration
        const response = await fetch('https://petwalker-d43e0-default-rtdb.europe-west1.firebasedatabase.app/petSitters.json', {
            method: 'POST',
            body: JSON.stringify({
                sitterData: getState
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        // TODO: Fix types
        const userEmail = getState.find( (user:any):any => user['mailVal']).mailVal;
        const userPassword = getState.find( (user:any):any => user['passVal']).passVal
        const { result, error } = await signUp( userEmail, userPassword );

        if ( error ) {
            return console.log(error);
        }
        console.log(result);
   }

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl mb-5">Готови сте!</h1>
            <p className="text-lg">Сега може да разгледате гледачи и да им изпратите вашата обява за работа!</p>
            <Link href="/">
                <button onClick={handleClick} className="bg-red-400 p-4 w-full text-white text-xl mt-4 rounded">Обратно към начална страница</button>
            </Link>
            {/* TODO: Add a button that leads to different sitters */}
        </div>
    )
}

export default RegistrationComplete;
