import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import signUp from '../../firebase/auth/signup';
import { storeActions } from "../../app/redux/store";
import { GetStoreData } from "../../public/interfaces/globals";
import { getAuth, updateProfile } from "firebase/auth";
import firebase_app, { db } from "../../firebase/config";
import { doc, setDoc } from "firebase/firestore";

const RegistrationComplete = () => {
    let userData: any = useSelector<GetStoreData>( state => state.dataStore.data );
    const owner: boolean = userData.some( (opt: {regOption: string}) => opt.regOption === 'owner' );
    const dispatch = useDispatch();

   const handleClick = async () => {
       dispatch(storeActions.setUserLogin(true));
       const userEmail: string = userData.find( (user:any):any => user['mailVal']).mailVal;
       const userPassword: string = userData.find( (user:any):any => user['passVal']).passVal;
       const userName = userData.find( (user:any) => user['nameVal'] ).nameVal;
       const { result, error } = await signUp( userEmail, userPassword );
       const auth: any = getAuth(firebase_app);
       updateProfile(auth.currentUser, { displayName: userName }).then(() => {
        //Profile updated
    }).catch((error) => console.log(error));
    
       if ( error ) {
           return console.error('Error signing in: ', error);
       } else {
            userData = [ ...userData, { uid: result?.user.uid } ];
            // Send the data to the BE when we have reached the final step of registration
            await fetch(`https://petwalker-d43e0-default-rtdb.europe-west1.firebasedatabase.app/${owner ? 'owners.json' : 'petSitters.json'}`, {
                method: 'POST',
                body: JSON.stringify({
                    sitterData: userData
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            // Add interface for the user data type
            const uid: string = userData.find( (data: any) => data.uid ).uid;
            await setDoc(doc( db, "userData", uid), {
                uid: uid,
                name: userName,
                userType: owner ? 'owner' : 'sitter'
            });
        }
   }

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl mb-5">Готови сте!</h1>
            <p className="text-lg">Сега може да разгледате гледачи и да им изпратите вашата обява за работа!</p>
            <Link href={ owner ? '/listSitters' : '/listOwners'}>
                <button onClick={handleClick} className="bg-green-2 p-4 w-full text-white text-xl mt-4 rounded">Разгледайте { owner ? 'разхождачите' : 'собствениците' }</button>
            </Link>
        </div>
    )
}

export default RegistrationComplete;
