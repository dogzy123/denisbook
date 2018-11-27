import { Component } from "react";
import AddPosts from "./AddPosts";
import Posts from "./Posts";
import LoginPanel from "./LoginPanel";
import { BarLoader } from "react-spinners";
import {connect} from "react-redux";
import {logIn, logOut, setUserSession} from "../actions/actions";

class MainBlock extends Component {

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
                    <div className="loader">
                        <BarLoader
                            color={'#26A69A'}
                            width={200}
                            height={5}
                        />
                    </div>
                );
            }

            return (
                <LoginPanel/>
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