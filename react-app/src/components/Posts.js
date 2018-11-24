import React, { Component } from 'react';
import { connect } from "react-redux";
import moment from "moment";
import {post} from "../../../src/utils/requests";
import {FETCH_POSTS} from "../actions/actions";

class Posts extends Component {
    componentWillMount () {
        post({func : 'getRelevantPosts'})
            .then( response => {
                this.props.dispatch({
                    type    : FETCH_POSTS,
                    posts   : response['records']
                })
            } );
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.newPost)
        {
            this.props.posts.unshift( nextProps.newPost );
        }
    }

    render() {
        const posts = this.props.posts.map( post => (
            <div className="post">
                <div className="post-wrapper">
                    <div className="post-remove">⨯</div>
                    <h3>{post.title}</h3>
                    <div className="post-sub-title">
                        <div className="post-author">
                            <span>{post.author}</span>
                        </div>
                        <div className="post-date">{moment(post.dt).format("DD MMMM, hh:mm")}</div>
                    </div>
                    <div className="post-body">{post.text}</div>
                </div>
            </div>
        ) );

        return (
            <div className="user-posts">{posts}</div>
        );
    }
}

const mapStateToProps = state => ({
    posts   : state.posts,
    newPost : state.newPost
});

export default connect(mapStateToProps)(Posts);
