import { configureStore, createSlice } from "@reduxjs/toolkit";
import { currUserData } from "../api/helper/users/userService";

export interface storeData {
    data: any[];
    step: number;
}

export interface storeAction {
    payload: any;
    type: string;
}

const currentUser: any = [];
currUserData().then( data => currentUser.push(data) );

const dataSlice = createSlice({
    name: 'dataStore',
    initialState: { data: [], step: 0, userLoggedin: false, currentUserId: '', combinedId: '', currName: '', chatData: { chatId: '', user: {} } },
    reducers: {
        storeData(state: storeData , action: storeAction) {
            //Clear the state if we get 'clear' string
            if ( action.payload === 'clear' ) state.data = state.data.slice(0, 0);
            // Storing the data passed from every separate step
            state.data = [...state.data, action.payload];
        },
        nextStep(state) {
            state.step = state.step + 1;
        },
        setUserLogin(state, action) {
            state.userLoggedin = action.payload;
        },
        setCurrentUserId(state, action) {
            state.currentUserId = action.payload;
        },
        setCombinedId(state, action) {
            state.combinedId = action.payload;
        },
        setCurrName(state, action) {
            state.currName = action.payload;
        },
        setChatData( state, action ) {
            state.chatData = {
                chatId: currentUser.uid > action.payload.uid
                ? currentUser.uid + action.payload.uid
                : action.payload.uid + currentUser.uid,
                user: action.payload.data
            }
        }
    }
});

export const store = configureStore({
        reducer: {
        dataStore: dataSlice.reducer
    }
});
 
export const storeActions  = dataSlice.actions;
export default store;
