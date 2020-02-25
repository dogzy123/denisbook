import "../style/less/main.less";
import React from 'react';
import {useSelector} from "react-redux";
import LoginChecker from "../components/LoginChecker";
import Feed from "./components/Feed";
import {createMuiTheme, ThemeProvider} from "@material-ui/core";

const getThemeColors = state => {
    let primary, secondary, light, border;

    switch (state) {
        case "default":
            primary = '#098c7f';
            secondary = '#E0F2F1';
            light = '#E0F2F1';
            border = '#badedc'
            break;

        case "red":
            primary = '#ce4444';
            secondary = '#ff9191';
            light = '#ffdfdf';
            border = '#ffc8c8';
            break;

        default:
            primary = '#098c7f';
            secondary = '#E0F2F1';
            break;
    }

    return {
        denisbookPrimary: primary,
        denisbookSecondary: secondary,
        denisbookLight: light,
        denisbookBorder: border,
    };
};

const MainApp = () => {
    const themeState = useSelector( state => state.themeState );

    const theme = createMuiTheme({
        ...getThemeColors(themeState),
    });

    return (
        <ThemeProvider theme={theme}>
            <LoginChecker body={ <Feed/> }/>
        </ThemeProvider>
    );
};

export default MainApp;
