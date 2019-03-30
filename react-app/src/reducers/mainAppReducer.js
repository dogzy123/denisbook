import {
    ADD_POST, FETCH_POSTS, INITIAL_POSTS_STATUS, LOG_OUT, LOGGED_IN, POSTS_TO_SHOW, SET_ERROR, SET_SESSION
} from "../actions/actions";

const initialState = {
    loggedIn        : false,
    user            : null,
    posts           : [],
    showPosts       : [],
    postsLength     : 0,
    showPostStep    : 0,
    error           : {
        isError    : false,
        errorMsg   : ''
    }
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
                newPost : action.post,
                showPosts : [action.post, ...state.showPosts],
                showPostStep: state.showPostStep + 1
            };

        case INITIAL_POSTS_STATUS:
            return {
                ...state,
                postsLength : action.postsLength
            };

        case POSTS_TO_SHOW:
            return {
                ...state,
                showPosts: action.showPosts,
                showPostStep : action.showPostStep
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

        case SET_ERROR:
            return {
                ...state,
                error : {
                    isError     : action.error.isError,
                    errorMsg    : action.error.errorMsg
                }
            };

        default:
            return {...state};
    }
}