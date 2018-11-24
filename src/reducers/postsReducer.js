import {ADD_RECORD, DELETE_RECORD, LOAD_RECORDS} from "../actions/actions";

const initState = {
    posts : {
        records         : [],
        deleteRecord    : false,
        addRecord       : false
    }
};

export const postsReducer = ( state = initState, action ) => {

    switch (action.type)
    {
        case LOAD_RECORDS :
            return {
                ...state,
                ...{
                    posts : {
                        ...state.posts,
                        records : action.records
                    }
                }
            };

        case ADD_RECORD:
            return {
                ...state,
                ...{
                    posts : {
                        ...state.posts,
                        addRecord : action.record
                    }
                }
            };

        case DELETE_RECORD:
            return Object.assign( {}, state, {
                posts : {
                    deleteRecord : action.recordId
                }
            } );
    }

};