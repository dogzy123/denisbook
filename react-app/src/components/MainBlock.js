import { Component } from "react";
import AddPosts from "./AddPosts";
import Posts from "./Posts";
import GoogleLogin from "react-google-login";
import {connect} from "react-redux";
import {logIn, setUserSession} from "../actions/actions";

class MainBlock extends Component {

    constructor (props) {
        super(props);
    }

    onSignIn ( dispatch ) {
        return function ( googleUser ) {
            dispatch( logIn(googleUser) );
        }
    }

    componentDidMount () {
        let auth2;

        const dispatch = this.props.dispatch;

        gapi.load( 'auth2', function () {
            auth2 = gapi.auth2.init({
                client_id: "521166378127-vhkak167b5ghngfkk5r6ukrq059njoo8.apps.googleusercontent.com"
            }).then( resp => {
                if ( resp.isSignedIn.get() )
                {
                    window.auth2 = resp;

                    return dispatch( setUserSession( {session: resp, user: resp.currentUser.get()} ) );
                }
            } );
        } ) ;
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