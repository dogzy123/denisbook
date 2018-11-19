import {post} from "./utils/requests";
import Posts from "./posts/postsClass";

const posts = new Posts();

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
                if (resp)
                {
                    posts.refresh();
                }
            } );
    }
};

posts.refresh();