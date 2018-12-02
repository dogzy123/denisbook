import {createStore} from "redux";
import pmReducer from "../reducers/pmReducer"

export const store = createStore(pmReducer);

store.subscribe( () => {
    console.log(store.getState());
} );