export const FETCH_POSTS    = "FETCH POSTS";
export const ADD_POST       = "ADD POST";
export const LOGGED_IN      = "LOGGED IN";
export const LOG_OUT        = "LOG_OUT";
export const SET_SESSION    = "SET SESSION";
export const POSTS_TO_SHOW  = "POSTS TO SHOW";
export const INITIAL_POSTS_STATUS = "INITIAL POSTS STATUS";

export const logIn = user => {
    return ({
        type        : LOGGED_IN,
        loggedIn    : true,
        user        : user
    });
};

export const logOut = () => {
    return ({
        type : LOG_OUT,
        loggedIn : false,
        user : {}
    });
};

export const addPost = post => {
    return ({
        type : ADD_POST,
        post
    });
};

export const setPostsLength = ({postsLength}) => {
    return ({
        type : INITIAL_POSTS_STATUS,
        postsLength
    });
};

export const showPosts = ({showPosts, showPostStep}) => {
    return ({
        type : POSTS_TO_SHOW,
        showPosts,
        showPostStep
    })
};

export const setUserSession = ({session, user}) => {
    return ({
        session,
        user,
        type          : SET_SESSION,
        loggedIn      : true
    });
};