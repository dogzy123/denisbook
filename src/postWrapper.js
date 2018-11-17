import moment from "moment";
import {post} from "./requests";

const mainPostsBlock = document.getElementById('user-posts');

export const MakePost = data => {
    const postBlock = document.createElement('div');
    postBlock.classList.add('post');

    const postWrapper = document.createElement('div');
    postWrapper.classList.add('post-wrapper');

    postBlock.appendChild( postWrapper );

    const close     = document.createElement('div');
    close.innerHTML = "⨯";
    close.classList.add('post-remove');
    close.onclick  = () => {
        post({func: 'deletePost', rowId: data['rowId']})
            .then();
    };

    postWrapper.appendChild( close );

    const postTitle = document.createElement('h3');
    postTitle.innerHTML = data['title'];

    postWrapper.appendChild(postTitle);

    const postSubTitle  = document.createElement('div');
    postSubTitle.classList.add('post-sub-title');

    const postSubTitleAuthor = document.createElement('div');
    postSubTitleAuthor.classList.add('post-author');
    postSubTitleAuthor.innerHTML = data['author'];

    postSubTitle.appendChild( postSubTitleAuthor );

    const postDate  = document.createElement('div');
    const date      = moment(data['date']).format("DD MMMM, hh:mm");
    postDate.classList.add('post-date');
    postDate.innerHTML = date;

    postSubTitle.appendChild( postDate );

    postWrapper.appendChild( postSubTitle );

    const postBody  = document.createElement('div');
    postBody.classList.add('post-body');
    postBody.innerHTML = data['body'];

    postWrapper.appendChild( postBody );

    return mainPostsBlock.appendChild( postBlock );
};