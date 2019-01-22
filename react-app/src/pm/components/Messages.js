import { Component } from "react";
import { connect } from "react-redux";
import Message from "./MessageTemplate";
import CryptHelper from "../../utils/CryptHelper";

class Messages extends Component {

    constructor (props) {
        super(props);
    }

    render () {
        const currentDialogMessages = [];
        const messages = [];

        if (this.props.currentDialog)
        {
            if (this.props.currentDialogPublicKey)
            {
                this.props.messages.map(  msg => {
                    if (msg.sender === this.props.currentDialog.email)
                    {
                        console.log(msg.message.split(':')[0]);
                        console.log(msg.message.split(':')[1]);

                        CryptHelper.decryptMessage( CryptHelper.base64toArrayBuffer(this.props.privateKey), {
                            encryptedAesKey: CryptHelper.base64toArrayBuffer(msg.message.split(':')[0]),
                            encryptedPm: CryptHelper.base64toArrayBuffer(msg.message.split(':')[1]),
                        }).then( resp => {
                            console.log(resp);
                        } );

                        currentDialogMessages.push(msg);
                    }
                } );
            }

            if (this.props.myMessages.length)
            {
                this.props.myMessages.map( (msg, i) => {
                    if (msg.recipient === this.props.currentDialog.email)
                    {
                        messages.push(
                            <Message key={i} data={msg} />
                        );
                    }
                } );

                return (
                    <div>{messages}</div>
                );
            }
        }

        return (
            <div></div>
        );
    }

}

const mapStateToProps = state => ({
    currentDialog : state.currentDialog,
    currentDialogPublicKey : state.currentDialogPublicKey,
    myMessages : state.myMessages,
    messages : state.messages
});

export default connect(mapStateToProps)(Messages);