import React, { Component } from 'react';
import { connect } from "react-redux";
import moment from "moment";
import {post} from "../requests";
import {FETCH_POSTS, showPosts} from "../actions/actions";

class Posts extends Component {
    constructor (props) {
        super(props);

        this.updateInterval = null;
    }

    componentWillMount () {
        const updatePostsToShow = e => {
            if (window.pageYOffset + 1000 > document.body.clientHeight)
            {
                if (this.props.posts.length)
                {
                    let step = this.props.showPostStep + 35;

                    if (this.props.showPostStep >= this.props.posts.length)
                    {
                        this.props.dispatch( showPosts( {
                            showPosts : this.props.showPosts,
                            showPostStep : this.props.posts.length
                        } ) );

                        return window.removeEventListener('scroll', updatePostsToShow);
                    }

                    this.props.dispatch( showPosts( {
                        showPosts: this.props.showPosts.concat( this.props.posts.slice(this.props.showPosts.length, step) ),
                        showPostStep : step
                    }) );
                }
            }
        };

        const fetchPosts = () => post({func : 'getRelevantPosts'})
            .then( response =>
                this.props.dispatch({
                    type    : FETCH_POSTS,
                    posts   : response['records'] || []
                })
            )
            .then( () => {
                this.props.dispatch( showPosts( {showPosts: this.props.showPosts, showPostStep: this.props.showPostStep}) );
            } );

       fetchPosts()
           .then( () => {
               this.props.dispatch( showPosts( {showPosts: this.props.posts.slice(0, 35), showPostStep: 35} ) );

               window.addEventListener('scroll', updatePostsToShow)
           } );

       this.updateInterval = setInterval( fetchPosts, 1000 );
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.newPost && nextProps.newPost.rowId !== this.props.posts[0].rowId)
        {
            this.props.posts.unshift( nextProps.newPost );
            this.props.showPosts.unshift( nextProps.newPost );
        }
    }

    render() {
        const posts = [];

        if (this.props.showPosts.length)
        {
            this.props.showPosts.map( post => (
                posts.push(
                    <div key={post.rowId} className="post">
                        <div className="post-wrapper">
                            <div className="post-remove">⨯</div>
                            <div className="post-sub-title">
                                <div className="post-author">
                                    <span>{post.author}</span>
                                </div>
                                <div className="post-date">{moment(post.dt).format("DD MMMM, HH:mm")}</div>
                            </div>
                            <div className="post-body">{post.text}</div>
                        </div>
                    </div>
                )
            ) )
        }

        return (
            <div className="user-posts">{ posts }</div>
        );
    }
}

const mapStateToProps = state => ({
    posts   : state.posts,
    showPosts   : state.showPosts,
    showPostStep : state.showPostStep,
    newPost : state.newPost
});

export default connect(mapStateToProps)(Posts);
