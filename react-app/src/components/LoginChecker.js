import React, { Component } from "react";
import LoginPanel from "./LoginPanel";
import { BarLoader } from "react-spinners";
import {connect} from "react-redux";
import {logOut, setUserSession} from "../actions/actions";
import Navigation from "./Navigation";
import {makeStyles} from "@material-ui/core";

const useLoaderStyles = makeStyles( theme => ({
    loader: {
        color: theme.denisbookPrimary,
    }
}) );

const Loader = () => {
    const styles = useLoaderStyles();

    return (
        <div className="loader">
            <BarLoader className={styles.loader} width='100%' height={5} />
        </div>
    );
};

class LoginChecker extends Component {

    constructor (props) {
        super(props);
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

                return dispatch( logOut() );
            } );
        } ) ;
    }

    getContext () {
        if (!this.props.loggedIn)
        {
            if (!this.props.user)
            {
                return (
                    <React.Fragment>
                        <Navigation />
                        <Loader />
                    </React.Fragment>
                );
            }

            return (
                <React.Fragment>
                    <Navigation />
                    <div className="main-container">
                        <LoginPanel/>
                    </div>
                </React.Fragment>
            );
        }

        return (
            <React.Fragment>
                <Navigation />
                {this.props.body}
            </React.Fragment>
        );
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

export default connect(mapStateToProps)(LoginChecker);