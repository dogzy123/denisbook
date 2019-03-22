import React, { Component } from 'react';
import {Provider} from "react-redux";
import LoginChecker from "../components/LoginChecker";
import Feed from "./components/Feed";
import {store} from "../stores/feed";

class MainApp extends Component {
    render() {
        return (
            <Provider store={store}>
                <LoginChecker body={ <Feed/> }/>
            </Provider>
        );
    }
}

export default MainApp;
