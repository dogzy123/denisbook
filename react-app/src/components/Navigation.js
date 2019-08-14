import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Icon from "@material-ui/core/Icon";
import Badge  from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import {connect} from "react-redux";


const AppNavigation = withStyles( theme => ({
    root: {
        backgroundColor: '#098c7f',

        [theme.breakpoints.up('sm')]: {
            boxShadow: 'none'
        }
    }
}) )(AppBar);

const useStyles = makeStyles( theme => ({
    navigationTitle: {
        color: '#fff',
        textTransform: 'uppercase',
        flexGrow: 1
    },
    buttonsPanel: {
        display: 'flex'
    }
}) );


const Navigation = props => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [unread, setUnread] = React.useState(0);

    const isMenuOpen = Boolean(anchorEl);

    function handleProfileMenu (event) {
        setAnchorEl( event.currentTarget );
    }

    function closeProfileMenu () {
        setAnchorEl( null );
    }

    function handleUnreadBadge(num) {
        setUnread(num);
    }

    function handleLogout() {
        window.auth2.signOut();
        window.location.reload();
    }

    function checkUnreadPosts() {
        if (window.localStorage)
        {
            const unreadPosts = localStorage.getItem('unreadPosts');

            if (unreadPosts && unreadPosts.length)
            {
                handleUnreadBadge( parseInt(unreadPosts) );
            }
        }
    }

    useEffect( () => {
        checkUnreadPosts()
    }, [] );

    useEffect( () => {
        handleUnreadBadge( props.unseenPostsCount );
    }, [props.unseenPostsCount] );

    return (
        <React.Fragment>
            <AppNavigation position='sticky'>
                <Toolbar>
                    <Typography className={classes.navigationTitle} variant="h6" noWrap>Denisbook</Typography>
                    { props.loggedIn && (
                        <div className={classes.buttonsPanel}>
                            <IconButton
                                onClick={ () => checkUnreadPosts() }
                            >
                                <Badge badgeContent={unread} color='secondary'>
                                    <Icon>chat</Icon>
                                </Badge>
                            </IconButton>
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-haspopup="true"
                                onClick={handleProfileMenu}
                            >
                                <Icon>person</Icon>
                            </IconButton>
                        </div>
                    ) }
                </Toolbar>
            </AppNavigation>
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={closeProfileMenu}
            >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </React.Fragment>
    );
};

const mapStateToProps = state => ({
    loggedIn : state.loggedIn,
    user: state.user,
    posts: state.posts,
    unseenPostsCount: state.unseenPostsCount
});

export default connect(mapStateToProps)(Navigation);


