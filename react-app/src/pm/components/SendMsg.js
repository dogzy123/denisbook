import {Component} from "react";
import { connect } from "react-redux";
import {post} from "../../requests";
import {addMyMessage} from "../../actions/actions";

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
            post({
                func: 'sendPrivateMessage',
                message: this.state.text,
                recipient: this.props.currentDialog.email,
                encryption: 'plainText'
            }).then( response => {
                if ( response.message === "ok")
                {
                    this.props.dispatch( addMyMessage( {recipient: this.props.currentDialog.rowId, message: this.state.text, date: new Date()} ) );

                    window.localStorage.setItem('myMessages', JSON.stringify(this.props.myMessages));
                }
            } );
        }
    }

    render () {
        return (
            <textarea className="pm-send-msg" onKeyDown={this.onKeyDown} onInput={this.onInput}></textarea>
        );
    }
}

const mapStateToProp = state => ({
    currentDialog : state.currentDialog,
    myMessages: state.myMessages
});

export default connect(mapStateToProp)(PmSendMessageInput);