export const FETCH_POSTS    = "FETCH POSTS";
export const ADD_POST       = "ADD POST";
export const LOGGED_IN      = "LOGGED IN";
export const LOG_OUT        = "LOG_OUT";
export const SET_SESSION    = "SET SESSION";
export const POSTS_TO_SHOW  = "POSTS TO SHOW";
export const INITIAL_POSTS_STATUS = "INITIAL POSTS STATUS";
export const LOAD_DIALOGS   = "LOAD DIALOGS";
export const LOAD_MESSAGES  = "LOAD MESSAGES";
export const SET_DIALOG_KEY = "SET DIALOG KEY";
export const SET_CURRENT_DIALOG = "SET CURRENT DIALOG";
export const ADD_MY_MESSAGES = "ADD MY MESSAGES";
export const INIT_MY_MESSAGES = "INIT MY MESSAGES";
export const SET_MY_MESSAGES = "SET MY MESSAGES";
export const CHECK_KEYS = "CHECK KEYS";
export const SET_KEYS = "SET KEYS";
export const SET_ERROR = "SET ERROR";
export const GET_LIKES = "GET_LIKES";

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

export const getLikes = likes => {
    return ({
        type : GET_LIKES,
        likes
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

export const loadDialogs = ({dialogs}) => {
    return ({
        type : LOAD_DIALOGS,
        dialogs
    });
};

export const loadMessages = msgs => {
    return ({
        type: LOAD_MESSAGES,
        messages: msgs
    });
};

export const setCurrentDialog = user => {
    return ({
        type : SET_CURRENT_DIALOG,
        currentDialog : user
    });
};

export const addMyMessage = props => {
    return ({
        type: ADD_MY_MESSAGES,
        id : props.recipient,
        msgObj : props
    });
};

export const checkKeys = bool => {
    return ({
        type : CHECK_KEYS,
        keysChecking : bool
    });
};

export const setKeys = ({publicKeyB64, privateKeyB64}) => {
    return ({
        type        : SET_KEYS,
        publicKey   : publicKeyB64.trim(),
        privateKey  : privateKeyB64.trim()
    });
};

export const initMyMessages = id => {
    return ({
        type: INIT_MY_MESSAGES,
        id
    });
};

export const currentDialogPublicKey = string => {
    return ({
        type : SET_DIALOG_KEY,
        string
    });
};

export const setMyMessages = myMessages => {
    return ({
        type: SET_MY_MESSAGES,
        myMessages
    });
};

export const setError = error => {
    return ({
        type : SET_ERROR,
        error
    });
};