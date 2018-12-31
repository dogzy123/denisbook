import { Component } from "react";
import { connect } from "react-redux";
import {post} from "../../requests";

class Messages extends Component {

    constructor (props) {
        super(props);
    }


    render () {
        const msgs = [];

        if (this.props.currentDialog)
        {
            post({
                func : 'getPrivateMessages',
                encryption : 'CryptHelper_v001'
            });
        }

        return (
            <div></div>
        );
    }

}

const mapStateToProps = state => ({
    currentDialog : state.currentDialog
});

export default connect(mapStateToProps)(Messages);