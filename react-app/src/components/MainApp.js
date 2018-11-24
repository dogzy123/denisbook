import React, { Component } from 'react';
import {Provider} from "react-redux";
import AddPosts from "./AddPosts";
import Posts from "./Posts";
import {store} from "../store";

class MainApp extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="main-app">
                    <AddPosts/>
                    <Posts/>
                </div>
            </Provider>
        );
    }
}

export default MainApp;
