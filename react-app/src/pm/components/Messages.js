import { Component } from "react";
import { connect } from "react-redux";
import Message from "./MessageTemplate";
import CryptHelper from "../../utils/CryptHelper";

const storage = window.localStorage;

class Messages extends Component {

    constructor (props) {
        super(props);

        this.state = {
            asyncMessages : []
        };
    }

    componentWillUpdate (nextProps) {
        if (this.props.currentDialog !== nextProps.currentDialog)
        {
            this.setState({
                asyncMessages : []
            })
        }
    }

    async getAsyncMessages() {
        const messages = [];

        if (this.props.currentDialogPublicKey)
        {
            for (let [i, msg] of Object.entries(this.props.messages)) {
                if (msg.sender === this.props.currentDialog.email)
                {
                    if (msg.message && msg.message.split(':').length > 1)
                    {
                        let decrypted;

                        try {
                            decrypted = await CryptHelper.decryptMessageB64(storage.getItem('privateKey'), msg.message)
                        } catch (e) {
                            console.log("Invalid private key for these messages, eh.");
                        }

                        if (decrypted)
                        {
                            const msgProps = {
                                author      : msg.sender,
                                userMessage : false,
                                msg         : decrypted,
                                date        : msg.dt,
                                key         : msg.sender + i
                            };

                            messages.push( msgProps );
                        }
                    }
                }
            }
        }

        return messages;
    }

    render () {
        let messages = [];

        if (this.props.currentDialog)
        {
            if (this.props.myMessages.length)
            {
                this.props.myMessages.map( (msg, i) => {
                    if (msg.recipient === this.props.currentDialog.email)
                    {
                        const msgProps = {
                            author      : msg.author,
                            userMessage : true,
                            msg         : msg.message,
                            date        : msg.date,
                            key         : msg.author + i
                        };

                        messages.push( msgProps );
                    }
                } );
            }
        }

        const asyncMessages = this.getAsyncMessages();

        asyncMessages.then( array => {
            if (array.length > 0 && !this.state.asyncMessages.length)
            {
                this.setState({
                    asyncMessages : array
                });
            }
        } );

        messages = messages
            .concat( this.state.asyncMessages )
            .sort(  (a, b) => {
                return new Date(a.date) - new Date(b.date);
            } );

        const renderedMessages = messages.map( msg => {
            return <Message userMessage={msg.userMessage} key={msg.key} data={msg} />
        } );

        return (
            <div>{renderedMessages}</div>
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