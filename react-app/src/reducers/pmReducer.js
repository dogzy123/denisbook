import {LOG_OUT, LOGGED_IN, SET_SESSION} from "../actions/actions";

const initialState = {
    loggedIn        : false,
    user            : null
};

export default function ( state = initialState, action) {
    switch (action.type) {

        case SET_SESSION:
            return {
                ...state,
                loggedIn   : action.loggedIn,
                session    : action.session,
                user       : action.user
            };

        case LOGGED_IN:
            return {
                ...state,
                loggedIn : action.loggedIn,
                user     : action.user
            };

        case LOG_OUT:
            return {
                ...state,
                loggedIn    : action.loggedIn,
                user        : action.user,
            };


        default :
            return {...state};
    }
}