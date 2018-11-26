export const FETCH_POSTS    = "FETCH POSTS";
export const ADD_POST       = "ADD POST";
export const LOGGED_IN      = "LOGGED IN";

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