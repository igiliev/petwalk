import firebase_app from "../config";
import { signInWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function signIn(email, password, username) {
    let result = null,
        error = null;
    try {
        // Manyally updatating the username since Firebase is not doing it
        updateProfile( auth.currentUser, {
            displayName: username
        }).then( () => console.log('Username successfully updated!') );
        result = await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
        error = e;
        console.log('login error: ',  error);
    }

    return { result, error };
}
