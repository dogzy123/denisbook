import {Component} from "react";
import {connect} from "react-redux";
import Dialogs from "../pm/components/Dialogs";
import Body from  "../pm/components/Body";
import PmSendMessageInput from "../pm/components/SendMsg";
import {setMyMessages} from "../actions/actions";

class Pm extends Component {
    componentDidMount () {
        const myMessages = localStorage.getItem('myMessages');

        if (!myMessages || !myMessages.length)
        {
            localStorage.setItem('myMessages', "{}");
        }

        this.props.dispatch( setMyMessages( JSON.parse(localStorage.getItem('myMessages')) ) );

    /*    if (!localStorage.getItem('publicKey'))
        {
            localStorage.setItem('publicKey', );
        }*/
    }

    render () {
        return (
            <div className="pm-container">
                <Dialogs />
                <div className="pm-body">
                    <Body/>
                    <div className="pm-text-field">
                        <PmSendMessageInput/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentDialog : state.currentDialog
});

export  default connect(mapStateToProps)(Pm);