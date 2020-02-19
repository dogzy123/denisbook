import React, {useCallback} from "react";
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import AddPosts from "./AddPosts";
import Posts from "./Posts";
import {useDispatch, useSelector} from "react-redux";
import {setError} from "../../actions/actions";

const Feed = () => {
    const dispatch = useDispatch();
    const error = useSelector( state => state.error );

    const closeSnackbar = useCallback( () => {
        dispatch( setError({isError: false, errorMsg: ''}) );
    }, [error.isError] );

    return (
        <div className="feed-body">
            <div className="main-container">
                <AddPosts/>
                <Posts />
                <Snackbar
                    open={error.isError}
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
                            {error.errorMsg}
                        </span>}
                        action={[
                            <IconButton
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                onClick={closeSnackbar}
                            >
                                <CloseIcon />
                            </IconButton>
                        ]}
                    />
                </Snackbar>
            </div>
        </div>
    );
};

export default Feed;