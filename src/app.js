import {createStore} from 'redux';
import {post} from "./utils/requests";
import Posts from "./posts/postsClass";
import {postsReducer} from "./reducers/postsReducer";
import {addRecord, loadRecords} from "./actions/actions";
import Post from "./posts/postClass";

const posts = new Posts();

const textarea = document.getElementById('create-post');

console.log('xyu');

textarea.onkeypress = e => {
    if (e.keyCode === 13)
    {
        const opts = {
            author: 'admin',
            title: 'test',
            text: textarea.value
        };

        textarea.value = '';
        textarea.blur();

        store.dispatch( addRecord({...opts}) );

        /*post({func: "addPost", ...opts})
            .then( resp => {
                if (resp)
                {
                    store.dispatch( addRecord({...opts}) );
                }
            } );*/
    }
};


export const store = createStore(postsReducer);

store.subscribe( () => {
    console.log( 'STORE UPDATED', store.getState() );

    posts.render( store.getState() );
} );


post({func : 'getRelevantPosts'})
    .then( resp => {
        posts.loadPosts( resp['records'] );
    } );