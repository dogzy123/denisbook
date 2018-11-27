export const FETCH_POSTS    = "FETCH POSTS";
export const ADD_POST       = "ADD POST";
export const LOGGED_IN      = "LOGGED IN";
export const SET_SESSION    = "SET SESSION";

export const logIn = user => {
    return ({
        type        : LOGGED_IN,
        loggedIn    : true,
        user        : user
    });
};

export const addPost = post => {
    return ({
        type : ADD_POST,
        post
    });
};

export const setUserSession = ({session, user}) => {
    return ({
        session,
        user,
        type          : SET_SESSION,
        loggedIn      : true
    });
};