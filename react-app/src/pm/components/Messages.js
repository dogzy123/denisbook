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
                        if (msg.message && msg.message.split(':').length > 1)
                        {
                            CryptHelper.decryptMessageB64(this.props.privateKey, msg.message)
                                .then(decrypted => {
                                    console.log('zhopa decryptd', decrypted);
                                });
                        }

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
    messages : state.messages,
    privateKey : state.privateKey
});

export default connect(mapStateToProps)(Messages);