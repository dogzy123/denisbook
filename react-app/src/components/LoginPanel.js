import { Component } from "react";
import { connect } from "react-redux";
import {logIn} from "../actions/actions";

class LoginPanel extends Component {

    constructor (props) {
        super(props);
    }

    onSignIn ( dispatch ) {
        return function ( googleUser ) {
            dispatch( logIn(googleUser) );
        }
    }

    componentDidMount () {
        const signIn = this.onSignIn(this.props.dispatch);

        gapi.signin2.render('google-signin', {
            'scope': 'profile email',
            'width': 240,
            'height': 50,
            'longtitle': true,
            'theme': 'dark',
            'onsuccess' : signIn
        })
    }

    render () {
        return (
            <div id="login-panel">
                <div className="login-wrapper">
                    <div className="login-title">
                        <h1>Choose login form</h1>
                    </div>
                    <div className="login-body">
                        <div id="google-signin"></div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn : state.loggedIn,
    user: state.user
});

export default connect(mapStateToProps)(LoginPanel);