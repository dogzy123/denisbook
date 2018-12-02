import React, { Component } from 'react';
import {Provider} from "react-redux";
import {store} from "../stores/pm";
import LoginChecker from "./LoginChecker";
import Pm from "./Pm";

class PmApp extends Component {
    render() {
        return (
            <Provider store={store}>
                <LoginChecker body={ <Pm/> } />
            </Provider>
        );
    }
}

export default PmApp;
