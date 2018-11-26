import {createStore} from "redux";
import mainAppReducer from "./reducers/mainAppReducer";

export const store = createStore(mainAppReducer);

store.subscribe( () => {
    console.log(store.getState());
} );