// @flow
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    AppBar,
    Tab,
    Tabs,
    Toolbar,
    Typography,
    makeStyles
} from '@material-ui/core';

export const HEADERS_HEIGHT = 50;

const useStyles = makeStyles((theme) =>{
    return ({
        mainHeader: {
            'background': theme.palette.primary.main,
            'color': theme.palette.primary.contrastText,
            'textDecoration': 'none',
            'height': HEADERS_HEIGHT,
            'minHeight': HEADERS_HEIGHT,
            '& a': {
                margin: 5
            }
        },
        headerText: {
            color: theme.palette.primary.contrastText,
            textDecoration: 'none'
        },
        tabsRoot: {
            fontSize: 16,
            flexGrow: 1
        },
        tabsIndicator: {
            backgroundColor: '#fff'
        },
        tabRoot: {
            fontSize: '1rem'
        },
        marginLeftAuto: {
            marginLeft: 'auto !important'
        }
    });
});

const Header = () => {
    const classes = useStyles();
    const location = useLocation();

    return (
        <AppBar position="fixed">
            <Toolbar className={classes.mainHeader}>
                <Typography
                    component={Link}
                    to="/"
                    className={classes.headerText}
                    variant="h6"
                    noWrap
                >
                    CU SURJ Resources
                </Typography>
                <Tabs
                    classes={{
                        root: classes.tabsRoot,
                        indicator: classes.tabsIndicator
                    }}
                    centered
                    value={location.pathname.split('/')[1]}
                >
                    <Tab
                        className={`${classes.marginLeftAuto} ${classes.tabRoot}`}
                        label="Home"
                        component={Link}
                        to="/"
                        value=""
                    />
                    <Tab
                        className={classes.tabRoot}
                        label="Books"
                        component={Link}
                        to="/books"
                        value="books"
                    />
                </Tabs>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
