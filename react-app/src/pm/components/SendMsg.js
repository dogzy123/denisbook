import {Component} from "react";
import { connect } from "react-redux";
import {post} from "../../requests";
import {addMyMessage} from "../../actions/actions";
import CryptHelper from "../../utils/CryptHelper";

class PmSendMessageInput extends Component {

    constructor (props) {
        super(props);

        this.state = {
            text : ''
        };

        this.onKeyDown  = this.onKeyDown.bind(this);
        this.onInput    = this.onInput.bind(this);
    }

    onInput (e) {
        this.setState({
            ...this.state,
            text : e.target.value
        })
    }

    onKeyDown (e) {
        if (e.keyCode === 13)
        {
            CryptHelper.encryptMessage( CryptHelper.base64toArrayBuffer(this.props.publicKey), btoa(this.state.text) )
                .then( resp => {
                    post({
                        func        : 'sendPrivateMessage',
                        message     : btoa( String.fromCharCode( ...new Uint8Array(resp.encryptedPm) ) ),
                        recipient   : this.props.currentDialog.email,
                        encryption  : "CryptHelper_v001"
                    }).then( response => {
                        console.log(response);
                        if ( response.message === "ok")
                        {
                            //this.props.dispatch( addMyMessage( {recipient: this.props.currentDialog.rowId, message: this.state.text, date: new Date()} ) );
                        }
                    } );
                } );
        }
    }

    render () {
        return (
            <textarea className="pm-send-msg" onKeyDown={this.onKeyDown} onInput={this.onInput} disabled={!this.props.currentDialog}></textarea>
        );
    }
}

const mapStateToProp = state => ({
    currentDialog : state.currentDialog,
    myMessages: state.myMessages,
    publicKey : state.publicKey,
    privateKey : state.privateKey
});

export default connect(mapStateToProp)(PmSendMessageInput);