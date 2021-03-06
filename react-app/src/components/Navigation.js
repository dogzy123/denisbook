import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Icon from "@material-ui/core/Icon";
import Badge  from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import {connect, useDispatch, useSelector} from "react-redux";
import {setTheme} from "../actions/actions";
import classNames from "classnames";


const AppNavigation = withStyles( theme => ({
    root: {
        backgroundColor: theme.denisbookPrimary, //#ce4444

        [theme.breakpoints.up('sm')]: {
            boxShadow: 'none'
        }
    }
}) )(AppBar);

const ThemedTabs = withStyles( theme => ({
    root: {
        minHeight: '24px',
    }
}) )(Tabs);

const ThemeTab = withStyles( theme => ({
   root: {
       minHeight: '24px',
       minWidth: '84px',
   },
}) )(Tab);

const useStyles = makeStyles( theme => ({
    navigationTitle: {
        color: '#fff',
        textTransform: 'uppercase',
        flexGrow: 1
    },
    buttonsPanel: {
        display: 'flex'
    },
    toolbarRoot: {
        [theme.breakpoints.up('lg')]: {
            minHeight: '48px'
        }
    },
    colorSquire: {
        height: '24px',
        width: '24px',
    },
    redColor: {
        backgroundColor: '#ce4444'
    },
    defaultColor: {
        backgroundColor: '#098c7f'
    }
}) );

const Navigation = props => {
    const themeState = useSelector( state => state.themeState );
    const dispatch = useDispatch();
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [unread, setUnread] = React.useState(0);
    const [configMenuAnchor, setConfigMenuAnchor] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isConfigMenuOpen = Boolean(configMenuAnchor);

    function handleProfileMenu (event) {
        setAnchorEl( event.currentTarget );
    }

    const handleConfigMenu = (e) => {
        setConfigMenuAnchor( e.currentTarget );
    };

    const closeConfigMenu = () => {
        setConfigMenuAnchor( null );
    }

    function closeProfileMenu () {
        setAnchorEl( null );
    }

    function handleUnreadBadge(num) {
        setUnread(num);
    }

    function changeTheme (theme) {
        if (themeState !== theme)
        {
            dispatch( setTheme(theme) );
        }

        window.localStorage.setItem('theme', theme);
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

    const getColoredIcon = color => {
        switch (color) {
            case 'red':
                return (
                    <div className={classNames(classes.colorSquire, classes.redColor)}/>
                );
            case 'default':
                return (
                    <div className={classNames(classes.colorSquire, classes.defaultColor)}/>
                );
        }
    };

    useEffect( () => {
        checkUnreadPosts()
    }, [] );

    useEffect( () => {
        handleUnreadBadge( props.unseenPostsCount );
    }, [props.unseenPostsCount] );

    return (
        <React.Fragment>
            <AppNavigation position='fixed'>
                <Toolbar classes={{
                    root: classes.toolbarRoot
                }}>
                    <Typography className={classes.navigationTitle} variant="h6" noWrap>Denisbook</Typography>
                    { props.loggedIn && (
                        <div className={classes.buttonsPanel}>
                            <IconButton
                                aria-label="settings"
                                aria-haspopup="true"
                                onClick={handleConfigMenu}
                            >
                                <Icon>palette</Icon>
                            </IconButton>
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
            <Menu
                anchorEl={configMenuAnchor}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={isConfigMenuOpen}
                onClose={closeConfigMenu}
            >
                <ThemedTabs
                    variant="fullWidth"
                    indicatorColor="secondary"
                    textColor="secondary"
                    aria-label="theme select"
                >
                    <ThemeTab
                        icon={getColoredIcon('default')}
                        onClick={ () => changeTheme('default') }
                    />
                    <ThemeTab
                        icon={getColoredIcon('red')}
                        onClick={ () => changeTheme('red') }
                    />
                </ThemedTabs>
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


