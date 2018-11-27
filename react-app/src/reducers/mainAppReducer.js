import {ADD_POST, FETCH_POSTS, LOG_OUT, LOGGED_IN, SET_SESSION} from "../actions/actions";

const initialState = {
    loggedIn    : false,
    user        : null,
    posts       : []
};

export default function ( state = initialState, action ) {
    switch (action.type) {
        case FETCH_POSTS:
            return {
                ...state,
                posts : action.posts
            };

        case ADD_POST:
            return {
                ...state,
                newPost : action.post
            };

        case LOGGED_IN:
            return {
                ...state,
                loggedIn : action.loggedIn,
                user     : action.user
            };

        case SET_SESSION:
            return {
                ...state,
                loggedIn   : action.loggedIn,
                session    : action.session,
                user       : action.user
            };

        case LOG_OUT:
            return {
                ...state,
                loggedIn    : action.loggedIn,
                user        : action.user,
            };

        default:
            return {...state};
    }
}