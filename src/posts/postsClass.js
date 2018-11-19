import Post from "./postClass";
import {post} from "../utils/requests";

export default class Posts {
    constructor () {
        this.context    = document.getElementById('user-posts');
        this.posts      = [];
        this.newPosts   = [];
    }

    add ( post ) {
        if (!this.context.children.length)
        {
            this.context.appendChild( post.getContext() );
        }

        this.context.insertBefore(post.getContext(), this.context.children[0]);
    }

    append ( post ) {
        this.context.appendChild( post.getContext() );
    }

    refresh () {
        post({func : "getRelevantPosts"})
            .then( resp => {
                if (!this.posts.length)
                {
                    resp['records'].map( record => this.posts.push( new Post( record, this ) ) );
                }
                else
                {
                    resp['records'].map( record => {
                        let newRecord = true;

                        this.posts.map( post => {
                            if (record['rowId'] === post['rowId'])
                            {
                                newRecord = false;
                            }
                        } );

                        if (newRecord)
                        {
                            this.newPosts.push( new Post( record, this ) );
                        }

                    } );

                }

                if (this.newPosts.length)
                {
                    this.newPosts.map( el => this.add( el ) );

                    return this.posts = this.newPosts.concat(this.posts);
                }

                return this.posts.map( el => this.append( el ) );
            } );
    }
}