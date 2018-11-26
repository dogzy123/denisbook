import {ADD_POST, FETCH_POSTS, LOGGED_IN} from "../actions/actions";

const initialState = {
    loggedIn    : false,
    user        : {},
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

        default:
            return {...state};
    }
}