import { connect } from "react-redux";
import React, { Component } from 'react';
import {post} from "../../requests";
import {addPost} from "../../actions/actions";
import Modal from '@material-ui/core/Modal';

const getImageModalStyles = () => {
    return {
        position : 'absolute',
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
    };
};

const getImageStyles = () => {
    return {
        maxHeight : '575px',
        maxWidth  : '100%'
    };
};

class AddPosts extends Component {
    constructor (props) {
        super(props);

        this.state = {
            text : '',
            pastedImages : [],
            isError : false,
            fullImage : '',
            newLine : {
                16 : false, // shift
                13 : false  // enter
            }
        };

        this.onKeyDown  = this.onKeyDown.bind(this);
        this.onInput    = this.onInput.bind(this);
        this.onKeyUp    = this.onKeyUp.bind(this);
        this.onPaste    = this.onPaste.bind(this);

        this.fullImageClose   = this.fullImageClose.bind(this);
        this.fullImageOpen    = this.fullImageOpen.bind(this);
    }

    addPost () {
        const data = { text : this.state.text };

        if (this.state.pastedImages.length > 0)
        {
            this.state.pastedImages.forEach( img => {
                data.text = data.text + `![](${img})\n`;
            } );
        }

        post({func: "addPost", componentDispatch: this.props.dispatch, ...data})
            .then( response => {
                const newPost = {
                    rowId   : response.rowId,
                    author  : response.author,
                    ...data
                };

                this.props.dispatch( addPost( newPost ) );
            } );

        this.setState({
            ...this.state,
            text : '',
            pastedImages : []
        })
    }

    onInput (e) {
        this.setState({
            ...this.state,
            text : e.target.value,
            isError : e.target.value.length < 1
        });
    }

    removePreviewImage (index) {
        const images = this.state.pastedImages;

        images.splice(index, 1);

        this.setState({
            ...this.state,
            pastedImages : images
        });
    }

    onPaste (e) {
        const items = (e.clipboardData || e.originalEvent.clipboardData).items;

        for (let index in items) {
            let item = items[index];

            if (item.kind === 'file')
            {
                const blob      = item.getAsFile();
                const reader    = new FileReader();

                reader.onload = event => {
                    const imgBase64 = event.target.result;

                    post({
                        func: "uploadImage",
                        fileName : blob.name,
                        imageBase64: imgBase64.substring(imgBase64.indexOf("base64,") + 7, imgBase64.length)
                    })
                        .then( response => {
                            if (response && response['message'] === "ok")
                            {
                                this.setState({
                                    ...this.state,
                                    pastedImages : this.state.pastedImages.concat([response.imageUrl])
                                });
                            }
                        } );
                };

                reader.readAsDataURL(blob)
            }
        }
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
                e.preventDefault();

                if (e.target.value.length < 1 && this.state.pastedImages.length < 1)
                {
                    return this.setState({
                        ...this.state,
                        isError : true
                    })
                }

                return this.addPost();
            }
        }
    }

    fullImageOpen (url) {
        this.setState({ ...this.state, fullImage : url });
    }

    fullImageClose () {
        this.setState({ ...this.state, fullImage : '' });
    }

    render() {
        const previewImages = [];

        if (this.state.pastedImages.length > 0)
        {
            this.state.pastedImages.forEach( (imageUrl, i) => {
                previewImages.push(
                    <div className="preview-image-wrapper" key={i}>
                        <span className="preview-image-remove" onClick={ () => this.removePreviewImage(i) }>
                            <svg className="close-svg" viewBox="0 0 40 40">
                                <path className="close-svg-path" d="M 10,10 L 30,30 M 30,10 L 10,30" />
                            </svg>
                        </span>
                        <img src={imageUrl} alt={"preview" + i} onClick={ e => this.fullImageOpen(imageUrl) }/>
                    </div>
                );
            } );
        }

        return (
            <div className="create-post">
                <div className="create-post-wrapper">
                    <textarea value={this.state.text} onPaste={this.onPaste} className={"create-post-text" + (this.state.isError ? " error" : "") } onKeyDown={this.onKeyDown} onKeyUp={this.onKeyUp} onChange={this.onInput} placeholder="Type a message..." />
                </div>
                {this.state.pastedImages.length > 0 &&
                    <div className="create-post-image-preview">
                        {previewImages}
                        <Modal
                            open={this.state.fullImage.length > 0}
                            onClose={this.fullImageClose}
                        >
                            <div style={getImageModalStyles()}>
                                <div>
                                    <img src={this.state.fullImage} style={getImageStyles()}/>
                                </div>
                            </div>
                        </Modal>
                    </div>
                }
            </div>
        );
    }
}

export default connect(null)(AddPosts);
