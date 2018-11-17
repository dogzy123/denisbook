import {post} from "./requests";
import {MakePost} from "./postWrapper";
import Post from "./posts/postClass";

let posts = [];

const refreshPosts = () => {

    post({func : "getRelevantPosts"})
        .then( resp => {
            let newRecords = [];

            if (!posts.length)
            {
                resp['records'].map( record => {
                    posts.push( new Post( record ) );
                } );
            }
            else
            {
                resp['records'].map( record => {
                    let newRecord = true;

                    posts.map( post => {
                        if (record['rowId'] === post['rowId'])
                        {
                            newRecord = false;
                        }
                    } );

                    if (newRecord)
                    {
                        newRecords.push( new Post( record ) );
                    }

                } );

            }

            if (newRecords.length)
            {
                newRecords.map( el => MakePost( el ) );

                return posts = posts.concat(newRecords);
            }

            return posts.map( el => MakePost( el ) );
        } );
};

const textarea = document.getElementById('create-post');

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

        post({func: "addPost", ...opts})
            .then( resp => {
                refreshPosts();
            } );
    }
};

refreshPosts();