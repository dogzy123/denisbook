import { Component } from "react";
import AddPosts from "./AddPosts";
import Posts from "./Posts";
import GoogleLogin from "react-google-login";
import {connect} from "react-redux";
import {logIn} from "../actions/actions";

class MainBlock extends Component {

    constructor (props) {
        super(props);
    }

    onSignIn ( dispatch ) {
        return function ( googleUser ) {
            dispatch( logIn(googleUser) );
        }
    }

    getContext () {
        if (!this.props.loggedIn)
        {
            return (
                <GoogleLogin
                    clientId="521166378127-vhkak167b5ghngfkk5r6ukrq059njoo8.apps.googleusercontent.com"
                    buttonText="Sign In"
                    onSuccess={this.onSignIn(this.props.dispatch)}
                />
            );
        }

        return (
            <div className="main-app">
                <AddPosts/>
                <Posts/>
            </div>
        )
    }

    render () {
        return (
            this.getContext()
        );
    }
}

const mapStateToProps = state => ({
    loggedIn : state.loggedIn,
    user: state.user
});

export default connect(mapStateToProps)(MainBlock);