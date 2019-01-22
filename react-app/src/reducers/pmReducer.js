import {
    ADD_MY_MESSAGES, CHECK_KEYS, INIT_MY_MESSAGES, LOAD_DIALOGS, LOAD_MESSAGES, LOG_OUT, LOGGED_IN, SET_CURRENT_DIALOG,
    SET_DIALOG_KEY,
    SET_KEYS,
    SET_MY_MESSAGES,
    SET_SESSION
} from "../actions/actions";

const initialState = {
    dialogs                 : [],
    currentDialog           : null,
    currentDialogMessages   : null,
    loggedIn                : false,
    user                    : null,
    myMessages              : [],
    messages                : [],
    keysChecking            : false,
    publicKey               : null,
    privateKey              : null,
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

        case SET_CURRENT_DIALOG:
            return {
                ...state,
                currentDialog: action.currentDialog
            };

        case SET_DIALOG_KEY:
            return {
                ...state,
                currentDialogPublicKey : action.string
            };

        case LOAD_DIALOGS:
            return {
                ...state,
                dialogs : action.dialogs
            };

        case LOAD_MESSAGES:
            return {
                ...state,
                messages : action.messages
            };

        case INIT_MY_MESSAGES:
            return {
                ...state,
                myMessages : {
                    ...state.myMessages,
                    [action.id] : []
                }
            };

        case SET_MY_MESSAGES:
            return {
                ...state,
                myMessages : action.myMessages
            };

        case ADD_MY_MESSAGES:
            return {
                ...state,
                myMessages: {
                    ...state.myMessages,
                    [action.id] : [action.msgObj, ...state.myMessages[action.id]]
                }
            };

        case CHECK_KEYS:
            return {
                ...state,
                keysChecking: action.keysChecking
            };

        case SET_KEYS:
            return {
                ...state,
                publicKey : action.publicKey,
                privateKey : action.privateKey
            };

        default :
            return {...state};
    }
}