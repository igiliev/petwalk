import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import signUp from '../../firebase/auth/signup';
import { storeActions } from "../../app/redux/store";

export interface GetStoreData {
    dataStore: { data: any, step: number, userLoggedin: boolean };
}

const RegistrationComplete = () => {
    const getUserDataState: any = useSelector<GetStoreData>( state => state.dataStore.data );
    const dispatch = useDispatch();

    
    const handleClick = async () => {
        if ( getUserDataState.length > 7 ) {
            dispatch(storeActions.storeData('clear'));
        }
        const currentName = getUserDataState.find( (user:any) => user['nameVal'] && user['nameVal'] );
        
        // Send the data to the BE when we have reached the final step of registration
        const response = await fetch('https://petwalker-d43e0-default-rtdb.europe-west1.firebasedatabase.app/petSitters.json', {
            method: 'POST',
            body: JSON.stringify({
                sitterData: getUserDataState
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        
        // setDoc(doc(db, "users", currentName.nameVal ), { userData: getUserDataState });
        // TODO: Fix types
        const userEmail = getUserDataState.find( (user:any):any => user['mailVal']).mailVal;
        const userPassword = getUserDataState.find( (user:any):any => user['passVal']).passVal;
        const { result, error } = await signUp( userEmail, userPassword );
        dispatch(storeActions.setUserLogin(true));

        if ( error ) {
            return console.error('Error signing in: ', error);
        }
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
