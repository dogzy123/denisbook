import { Component } from "react";
import { connect } from "react-redux";

class Body extends Component {
    constructor (props) {
        super(props)
    }

    render () {
        if (this.props.currentDialog)
        {
           // fetch( {func} )
        }

        return (
            <div className="pm-messages">

            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentDialog : state.currentDialog,
    currentDialogMessages : state.currentDialogMessages
});

export default connect(mapStateToProps)(Body);