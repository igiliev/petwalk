import { getDatabase, ref, onValue, set, update } from "firebase/database";

export async function getUsers(userType) {
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
            const dailyRate = insideData.find( userData => userData.rateVal ).rateVal;
            const selectedUser = insideData.find( userData => userData.regOption ).regOption;
            const describtion = insideData.find( userData => userData.jobDescribeVal ).jobDescribeVal;
            const selectedHoods = insideData.find( userData => userData.selectedHoods )['selectedHoods'];
            const selectedServices = insideData.find( userData => userData.labelNames )['labelNames'].map( (item) => item.label );
            const userImage = insideData.find( userData => userData.userImg ).userImg;

            //Adding only the users that have selected to be a sitter
            if ( selectedUser === 'sitter' ) {
                storeSitters.push({
                    name,
                    dailyRate,
                    dailyRateOption,
                    describtion,
                    selectedHoods,
                    selectedServices,
                    userImage,
                    id: user
                });
            } else {
                storeOwners.push({
                    name,
                    dailyRate,
                    dailyRateOption,
                    describtion,
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

export async function getUserChat() {
    const getResponse = async () => {
        const fetchUsers = await fetch('https://petwalker-d43e0-default-rtdb.europe-west1.firebasedatabase.app/userChat.json');
        const chatTojson = await fetchUsers.json();
        const storeUserChat = [];

        for( const id in chatTojson ) {
            storeUserChat.push({ id, data: chatTojson[id] });
        }

        return storeUserChat;
    }

    return getResponse();
}

//Creating the new /userChat collection in the DB
export function createUserChat(id, name, currentUserId) {
    const db = getDatabase();
    set(ref(db, 'userChat/' + id), {
        username: name,
        combinedId: id + currentUserId,
        date: new Date().toLocaleString(),
        messages: { [name]: 'me default', [name]: 'you default' }
    });
}

//Update the sent message
export function updateMessage(id, message) {
    const db = getDatabase();
     update(ref(db, `userChat/${id}`), {
         messages: { me: message, you: 'updated!' }
     })
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

export async function getUser (email = '') {
    // const db = getDatabase();
    // const starCountRef = ref(db, 'petSitters');
    // const storeData = [];
    // onValue(starCountRef, (snapshot) => {
    //     const data = snapshot.val();
    //     storeData.push(data);
    // });
    // return storeData;

    const getResponse = async () => {
        const fetchUsers = await fetch('https://petwalker-d43e0-default-rtdb.europe-west1.firebasedatabase.app/petSitters.json');
        const chatTojson = await fetchUsers.json();
        const storeUserChat = [];

        for( const id in chatTojson ) {
            storeUserChat.push({ id, data: chatTojson[id] });
        }

        return storeUserChat;
    }

    return getResponse();
}
