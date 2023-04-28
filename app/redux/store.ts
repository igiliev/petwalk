import { configureStore, createSlice } from "@reduxjs/toolkit";

export interface storeData {
    data: any[];
    step: number;
}

export interface storeAction {
    payload: any;
    type: string;
}

const dataSlice = createSlice({
    name: 'dataStore',
    initialState: { data: [], step: 0, userLoggedin: false },
    reducers: {
        storeData(state: storeData , action: storeAction) {
            //Clear the state if we get 'clear' string
            if ( action.payload === 'clear' ) state.data.slice(0, 0);
            // Storing the data passed from every separate step
            state.data = [...state.data, action.payload];
        },
        nextStep(state) {
            state.step = state.step + 1;
        },
        setUserLogin(state, action) {
            state.userLoggedin = action.payload;
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
