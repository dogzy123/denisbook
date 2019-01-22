import {Component} from "react";
import { connect } from "react-redux";
import {post} from "../../requests";
import {addMyMessage, setMyMessages} from "../../actions/actions";
import CryptHelper from "../../utils/CryptHelper";

const storage = window.localStorage;

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
            const msg =  {
                message     : this.state.text,
                author      : this.props.user.getBasicProfile().getEmail(),
                recipient   : this.props.currentDialog.email,
                date        : ''
            };

            if (!storage.getItem('myMessages') || storage.getItem('myMessages').length < 3)
            {
                storage.setItem('myMessages', JSON.stringify([msg]));
            }
            else
            {
                const messages = JSON.parse( storage.getItem('myMessages') );

                messages.push( msg );

                storage.setItem('myMessages', JSON.stringify( messages ));
            }

            CryptHelper.encryptMessage( CryptHelper.base64toArrayBuffer(this.props.publicKey), btoa(this.state.text) )
                .then( resp => {
                    console.log('ENCRYPTED', resp);
                    post({
                        func        : 'sendPrivateMessage',
                        message     : btoa( String.fromCharCode( ...new Uint8Array(resp.encryptedPm) ) ) + ':' + btoa( String.fromCharCode( ...new Uint8Array(resp.encryptedAesKey) ) ) ,
                        recipient   : this.props.currentDialog.email,
                        encryption  : "CryptHelper_v001"
                    }).then( response => {
                        if ( response.message === "ok")
                        {
                            //this.props.dispatch( addMyMessage( {recipient: this.props.currentDialog.rowId, message: this.state.text, date: new Date()} ) );
                        }
                    } );
                } );

            this.props.dispatch( setMyMessages(JSON.parse( storage.getItem('myMessages') )) );
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
    privateKey : state.privateKey,
    user : state.user
});

export default connect(mapStateToProp)(PmSendMessageInput);