import { connect } from "react-redux";
import React, { Component } from 'react';
import {post} from "../../../src/utils/requests";
import {ADD_POST} from "../actions/actions";

class AddPosts extends Component {
    constructor (props) {
        super(props);

        this.state = {
            text : ''
        };

        this.onKeyDown  = this.onKeyDown.bind(this);
        this.onInput    = this.onInput.bind(this);
    }


    addPost () {
        const data = {
            author  : 'admin',
            title   : 'Add post',
            text    : this.state.text
        };

        post({func: "addPost", ...data})
            .then( response => {
                const newPost = {
                    id : response.id || 4324,
                    ...data
                };

                this.props.dispatch({
                    type : ADD_POST,
                    post : newPost
                });
            } );
    }

    onInput (e) {
        this.setState({
            text : e.target.value
        });
    }

    onKeyDown (e) {
        if (e.keyCode === 13)
        {
            e.target.blur();
            e.target.value = "";
            this.addPost();
        }
    }

    render() {
        return (
            <div className="create-post">
                <textarea className="create-post-text" onKeyDown={this.onKeyDown} onInput={this.onInput} placeholder="Write something here..."></textarea>
            </div>
        );
    }
}

export default connect(null)(AddPosts);
