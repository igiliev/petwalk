import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import signUp from '../../firebase/auth/signup';
import { storeActions } from "../../app/redux/store";
import { currUserData } from "../../app/api/helper/users/userService";
import { useEffect, useState } from "react";

export interface GetStoreData {
    dataStore: { data: any, step: number, userLoggedin: boolean, currentUserId: string, combinedId: string, chatData: {} };
}

const RegistrationComplete = () => {
    let userData: any = useSelector<GetStoreData>( state => state.dataStore.data );
    // const [ uid, setUid ] = useState('');
    const owner: boolean = userData.some( (opt: {regOption: string}) => opt.regOption === 'owner' );
    const dispatch = useDispatch();

    // useEffect( () => {
    //     currUserData().then( userImpl => (
    //         userImpl[0] && setUid(userImpl[0].uid)
    //     ));
    // }, [ userData ] );

   const handleClick = async () => {
        if ( userData.length > 7 ) {
            dispatch(storeActions.storeData('clear'));
        }
        
        // console.log(uid);
        //Adding uid to the user data
        // userData = [ ...userData, { uid } ];

        // Send the data to the BE when we have reached the final step of registration
        const response = await fetch(`https://petwalker-d43e0-default-rtdb.europe-west1.firebasedatabase.app/${owner ? 'owners.json' : 'petSitters.json'}`, {
            method: 'POST',
            body: JSON.stringify({
                sitterData: userData
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        //Testing reqeust so I don't spam with unnecesary users
        // const response = await fetch(`https://petwalker-d43e0-default-rtdb.europe-west1.firebasedatabase.app/testUsers.json`, {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         sitterData: userData
        //     }),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // });

        const data = await response.json();
        // TODO: Fix types
        const userEmail = userData.find( (user:any):any => user['mailVal']).mailVal;
        const userPassword = userData.find( (user:any):any => user['passVal']).passVal;
        const { result, error } = await signUp( userEmail, userPassword );
        dispatch(storeActions.setUserLogin(true));

        if ( error ) {
            return console.error('Error signing in: ', error);
        } else {
            userData = [ ...userData, { uid: result?.user.uid } ];
            console.log(userData);
        }
   }

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl mb-5">Готови сте!</h1>
            <p className="text-lg">Сега може да разгледате гледачи и да им изпратите вашата обява за работа!</p>
            <Link href="/findSitters">
                <button onClick={handleClick} className="bg-green-2 p-4 w-full text-white text-xl mt-4 rounded">Разгледайте разхождачите</button>
            </Link>
        </div>
    )
}

export default RegistrationComplete;
