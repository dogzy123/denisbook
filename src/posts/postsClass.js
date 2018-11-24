import Post from "./postClass";
import {post} from "../utils/requests";
import Component from "../utils/component";
import {store} from "../app";
import {loadRecords} from "../actions/actions";

const mainContainer = document.getElementById('main');

export default class Posts {
    constructor () {
        this.context    = new Component('div#user-posts');
        this.posts      = [];

        mainContainer.appendChild( this.context.context );

        return this;
    }

    add ( post ) {
        if (!this.context.subscribers.length)
        {
            this.context.appendChild( post.getContext() );
        }

        this.context.context.insertBefore( post.getContext(), this.context.subscribers[0].context );
    }

    append ( post ) {
        this.context.observe( post.component );
    }

    loadPosts ( records ) {
        this.posts = records.map( el => new Post( el, this ));
        store.dispatch( loadRecords( records ) );
    }

    render ( state ) {
        this.posts.map( post => {
            this.context.observe( post.component );
        } );

        this.context.render( state );
    }

    refresh () {
        post({func : "getRelevantPosts"})
            .then( resp => {
                store.dispatch( loadRecords( resp['records'] ) );
              /*
                else
                {

                    resp['records'].map( record => {
                        let newRecord = true;

                        this.posts.map( post => {
                            // check for new record
                            if (record['rowId'] === post['rowId'])
                            {
                                newRecord = false;
                            }
                        } );

                        if (newRecord)
                        {
                            this.posts.unshift( new Post( record, this ) );
                            this.add( this.posts[0] );
                        }

                    } );

                }

                return this.posts.map( el => this.append( el ) );*/
            } );
    }
}