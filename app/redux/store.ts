import { configureStore, createSlice } from "@reduxjs/toolkit";

export interface storeData {
    data: any[];
    step: number;
}

export interface storeAction {
    payload: any;
    type: string;
}

export interface UserImpl {
    apiKey: string;
    appName: string;
    createdAt: string;
    email: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    lastLoginAt: string;
    providerData: any[];
    stsTokenManager: any;
    uid: string;
}

const dataSlice = createSlice({
    name: 'dataStore',
    initialState: { data: [], step: 0, userLoggedin: false, currentUserId: '', combinedId: '', chatData: { chatId: '', user: {} }, userChatNames: [] },
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
        setChatData( state, action ) {
            state.chatData = {
                chatId: action.payload.uid,
                user: action.payload.data
            }
        },
        setUserChatNames( state, action ) {
            const dummyState = new Set<string>();
            dummyState.add( action.payload );
            //Creating an array from a Set so there are no dublicates
            const setToArr: any = Array.from(dummyState);
            if( action.payload !== '' ) {
                state.userChatNames = setToArr;
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
