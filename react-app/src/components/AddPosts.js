import { connect } from "react-redux";
import React, { Component } from 'react';
import {post} from "../requests";
import {addPost} from "../actions/actions";

class AddPosts extends Component {
    constructor (props) {
        super(props);

        this.state = {
            text : '',
            isError : false,
            newLine : {
                16 : false, // shift
                13 : false  // enter
            }
        };

        this.onKeyDown  = this.onKeyDown.bind(this);
        this.onInput    = this.onInput.bind(this);
        this.onKeyUp    = this.onKeyUp.bind(this);
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
            ...this.state,
            text : e.target.value,
            isError : e.target.value.length < 1
        });
    }

    onKeyUp (e) {
        if (e.keyCode === 13 || e.keyCode === 16)
        {
            this.setState( {
                ...this.state,
                newLine: {
                    ...this.state.newLine,
                    [e.keyCode] : false
                }
            } );
        }
    }

    onKeyDown (e) {
        if (e.keyCode === 16 || e.keyCode === 13)
        {
            this.setState( {
                ...this.state,
                newLine : {
                    ...this.state.newLine,
                    [e.keyCode] : true
                }
            } );

            if (e.keyCode === 13 && !this.state.newLine['16'])
            {
                e.target.blur();

                if (e.target.value.length < 1)
                {
                    e.target.value = "";
                    return this.setState({
                        ...this.state,
                        isError : true
                    })
                }

                e.target.value = "";
                return this.addPost();
            }
        }
    }

    render() {
        return (
            <div className="create-post">
                <textarea className={"create-post-text" + (this.state.isError ? " error" : "") } onKeyDown={this.onKeyDown} onKeyUp={this.onKeyUp} onInput={this.onInput} placeholder="Write something here..."></textarea>
            </div>
        );
    }
}

export default connect(null)(AddPosts);
