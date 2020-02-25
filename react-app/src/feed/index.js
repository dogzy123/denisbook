import React from 'react';
import ReactDOM from 'react-dom';
import MainApp from "./MainApp";
import {store} from "../stores/feed";
import {Provider} from "react-redux";

ReactDOM.render(
    <Provider store={store}>
        <MainApp />
    </Provider>,
    document.getElementById('main')
);