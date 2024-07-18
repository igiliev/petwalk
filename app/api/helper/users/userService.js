import { onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue, set, update, child, get } from "firebase/database";
import { auth } from "../../../../firebase/config";

export async function getUsers(userType) {
    const getResponse = async () => {
        const fetchUsers = await fetch(`https://petwalker-d43e0-default-rtdb.europe-west1.firebasedatabase.app/${userType === 'owners' ? 'owners.json' : 'petSitters.json' }`);
        const usersTojson = await fetchUsers.json();
        const storeSitters = [];
        const storeOwners = [];
        
        // TODO: Do this in a better way, no boilerplate
        for ( const user in usersTojson ) {
            let selectedUser, name, dailyRateOption, mail, dailyRate, selectedHoods, selectedServices, userImage, uid;
            // Getting the inner object where the data is actually stored
            const insideData = usersTojson[user].sitterData;
            // Storing only owners specific values so I don't get the undefined error
            if ( userType === 'owners' ) {
                selectedUser = insideData.find( userData => userData.regOption ).regOption;
                name = insideData.find( userData => userData.nameVal ).nameVal;
                mail = insideData.find( userData => userData.mailVal ).mailVal;
                userImage = insideData.find( userData => userData.userImg ).userImg;
            } else {
                // Storing all other values for sitters
                selectedUser = insideData.find( userData => userData.regOption ).regOption;
                name = insideData.find( userData => userData.nameVal ).nameVal;
                dailyRateOption = insideData.find( userData => userData.rateOption ).rateOption;
                mail = insideData.find( userData => userData.mailVal ).mailVal;
                dailyRate = insideData.find( userData => userData.rateVal ).rateVal;
                selectedHoods = insideData.find( userData => userData.selectedHoods )['selectedHoods'];
                selectedServices = insideData.find( userData => userData.labelNames )['labelNames'].map( (item) => item.label );
                userImage = insideData.find( userData => userData.userImg ).userImg;
                uid = insideData.find( userData => userData.uid ).uid;
                 //  describtion = insideData.find( userData => userData.selfDescribeVal ).selfDescribeVal;
            }

            //Adding only the users that have selected to be a sitter
            if ( userType === 'sitters' ) {
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
