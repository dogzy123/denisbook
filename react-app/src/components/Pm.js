import {Component} from "react";
import {connect} from "react-redux";
import Dialogs from "../pm/components/Dialogs";
import Body from  "../pm/components/Body";
import PmSendMessageInput from "../pm/components/SendMsg";
import {setMyMessages} from "../actions/actions";

class Pm extends Component {
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