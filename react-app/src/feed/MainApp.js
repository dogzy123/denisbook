import "../style/less/main.less";
import React from 'react';
import {Provider} from "react-redux";
import LoginChecker from "../components/LoginChecker";
import Feed from "./components/Feed";
import {store} from "../stores/feed";

const MainApp = () => {
    return (
        <Provider store={store}>
            <LoginChecker body={ <Feed/> }/>
        </Provider>
    );
};

export default MainApp;
