 import { Component } from "react";
 import { post } from "../../requests";
 import { connect } from "react-redux";
 import {loadDialogs, loadMessages} from "../../actions/actions";
 import Dialog from "./Dialog";

class Dialogs extends Component {
    constructor (props) {
        super(props);
    }

    componentDidMount () {
        post({func : 'getUserList'})
            .then( resp => {
                this.props.dispatch( loadDialogs( {dialogs: resp['records']} ) );
            } );

        post({
            func : 'getPrivateMessages',
            encryption : 'CryptHelper_v001'
        }).then( response => {
            this.props.dispatch( loadMessages( response['records'] ) );
        } );
    }

    render () {
        const dialogs = [];

        if (this.props.dialogs)
        {
            this.props.dialogs.map( user => {
                dialogs.push(
                    <Dialog key={user.rowId} user={user} />
                );
            } );
        }

        return (
            <div className="pm-dialogs">{ dialogs }</div>
        );
    }
}

const mapStateToProps = state => ({
    dialogs : state.dialogs
});

export default connect(mapStateToProps)(Dialogs);