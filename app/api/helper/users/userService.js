import { onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue, set, update, child, get } from "firebase/database";
import { auth } from "../../../../firebase/config";

export async function getUsers(userType) {
    console.log(userType);
    const getResponse = async () => {
        const fetchUsers = await fetch('https://petwalker-d43e0-default-rtdb.europe-west1.firebasedatabase.app/petSitters.json');
        const usersTojson = await fetchUsers.json();
        const storeSitters = [];
        const storeOwners = [];
        
        // TODO: Do this in a better way, no boilerplate
        for ( const user in usersTojson ) {
            const insideData = usersTojson[user].sitterData;
            const name = insideData.find( userData => userData.nameVal ).nameVal;
            const dailyRateOption = insideData.find( userData => userData.rateOption ).rateOption;
            const mail = insideData.find( userData => userData.mailVal ).mailVal;
            const dailyRate = insideData.find( userData => userData.rateVal ).rateVal;
            const selectedUser = insideData.find( userData => userData.regOption ).regOption;
            // const describtion = insideData.find( userData => userData.selfDescribeVal ).selfDescribeVal;
            const selectedHoods = insideData.find( userData => userData.selectedHoods )['selectedHoods'];
            const selectedServices = insideData.find( userData => userData.labelNames )['labelNames'].map( (item) => item.label );
            const userImage = insideData.find( userData => userData.userImg ).userImg;
            const uid = insideData.find( userData => userData.uid ).uid;

            //Adding only the users that have selected to be a sitter
            if ( selectedUser === 'sitter' ) {
                storeSitters.push({
                    name,
                    mail,
                    dailyRate,
                    dailyRateOption,
                    selectedHoods,
                    selectedServices,
                    userImage,
                    uid,
                    id: user,
                    selectedUser
                });
            } else {
                storeOwners.push({
                    name,
                    mail,
                    dailyRate,
                    dailyRateOption,
                    selectedHoods,
                    selectedServices,
                    userImage,
                    id: user
                })
            }
        }
        return userType === 'sitters' ? storeSitters : storeOwners;
    }

    return getResponse();
}

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
        currUserData.push(user);
    });

    return currUserData;
}

// export async function getUserChatNames(id) {
//     const data = [];
//     const db = getDatabase();
//     console.log(id);
//     const chatNamesRef = ref(db, 'userChatNames/' + id);
//     await onValue(chatNamesRef, (snapshot) => {
//         data.push(snapshot.val());
//     });
// }