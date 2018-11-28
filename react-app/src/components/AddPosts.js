import { connect } from "react-redux";
import React, { Component } from 'react';
import {post} from "../requests";
import {addPost} from "../actions/actions";

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
        const data = { text : this.state.text };

        post({func: "addPost", ...data})
            .then( response => {
                const newPost = {
                    rowId   : response.rowId,
                    author  : response.author,
                    ...data
                };

                this.props.dispatch( addPost( newPost ) );
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
