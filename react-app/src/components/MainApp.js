import React, { Component } from 'react';
import {Provider} from "react-redux";
import MainBlock from "./MainBlock";
import {store} from "../store";

class MainApp extends Component {
    render() {
        return (
            <Provider store={store}>
                <MainBlock/>
            </Provider>
        );
    }
}

export default MainApp;
