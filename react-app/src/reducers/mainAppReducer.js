import {ADD_POST, FETCH_POSTS} from "../actions/actions";

const initialState = {
    posts : []
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

        default:
            return {...state};
    }
}