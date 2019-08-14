import React, {Component} from "react";
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import AddPosts from "./AddPosts";
import Posts from "./Posts";
import {connect} from "react-redux";
import {setError} from "../../actions/actions";

class Feed extends Component {
    constructor(props) {
        super(props);

        this.closeSnackbar = this.closeSnackbar.bind(this);
    }

    closeSnackbar () {
        this.props.dispatch(setError({isError: false, errorMsg: ''}));
    }

    render () {
        return (
            <div className="feed-body">
                <div className="main-container">
                    <AddPosts/>
                    <Posts />
                    <Snackbar
                        open={this.props.error.isError}
                        autoHideDuration={6000}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <SnackbarContent
                            className='error-notification'
                            message={<span className='error-msg-content'>
                            <ErrorIcon className='error-msg-icon' />
                                {this.props.error.errorMsg}
                        </span>}
                            action={[
                                <IconButton
                                    key="close"
                                    aria-label="Close"
                                    color="inherit"
                                    onClick={this.closeSnackbar}
                                >
                                    <CloseIcon />
                                </IconButton>
                            ]}
                        />
                    </Snackbar>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    error : state.error
});

export default connect(mapStateToProps)(Feed);