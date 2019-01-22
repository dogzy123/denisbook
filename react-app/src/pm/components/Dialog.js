import { Component } from "react";
import { connect } from "react-redux";
import {initMyMessages, setCurrentDialog} from "../../actions/actions";

class Dialog extends Component {
    constructor (props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick () {
        return this.props.dispatch( setCurrentDialog(this.props.user) );
    }

    render () {
        let active = "";

        if (this.props.currentDialog)
        {
            if (this.props.currentDialog.rowId === this.props.user.rowId)
            {
                active = " active";
            }
        }

        return (
            <div onClick={this.onClick} className={ "dialog-wrapper" + active }>
                <div className="dialog-inner">
                    <div className="dialog-user">{ this.props.user.displayName } ({ this.props.user.email })</div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    dialogs : state.dialogs,
    currentDialog : state.currentDialog,
    myMessages : state.myMessages
});

export default connect(mapStateToProps)(Dialog);