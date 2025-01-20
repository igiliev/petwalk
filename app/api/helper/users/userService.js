import { onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue, set, update, child, get } from "firebase/database";
import { auth } from "../../../../firebase/config";

//Creating the new /userChat collection in the DB
export function createUserChat(combinedId) {
    const db = getDatabase();
    set(ref(db, 'chats/' + combinedId), {
        test: 'test'
    });
}

export async function getUserData(id) {
    const storeData = [];
    const dbRef = ref(getDatabase());
    await get(child(dbRef, `petSitters/${id}`)).then((snapshot) => storeData.push(snapshot.val()));
    return storeData;
}

//Update the sent message
export function updateMessage(id, message) {
    const db = getDatabase();
     update(ref(db, `userChat/${id}`), {
         messages: { me: message, you: 'updated!' }
     });
}

//Getting the data from the /userChat DB
export async function getSelectedUserChat(id) {
    const db = getDatabase();
    const starCountRef = ref(db, 'userChat/' + id);
    const storeData = [];
    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        storeData.push(data);
    });
    return storeData;
}

//Current user data
export async function currUserData() {
    const currUserData = [];
    await onAuthStateChanged(auth, (user) => {
        if(user) {
            currUserData.push(user);
        }
    });

    return currUserData;
}