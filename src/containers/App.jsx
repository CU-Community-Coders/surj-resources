import React from 'react';
import {
  Link,
  Switch,
  Route,
  useLocation
} from 'react-router-dom';
import {
  AppBar,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  makeStyles
} from '@material-ui/core';

import articles from '../data/articles.csv';
import books from '../data/books.csv';
import groups from '../data/groups.csv';
import media from '../data/media.csv';
import scholarly from '../data/scholarly.csv';
import videos from '../data/videos.csv';

import Home from './Home';
import Table from './Table';

export const HEADERS_HEIGHT = 50;

const useStyles = makeStyles((theme) => ({
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
  headerTitle: {
    flexGrow: 1
  },
  headerText: {
    color: theme.palette.primary.contrastText,
    textDecoration: 'none'
  },
  content: {
    position: 'fixed',
    top: HEADERS_HEIGHT,
    padding: 20,
    width: '100%',
    height: '100%',
    overflow: 'auto'
  }
}));

const App = () => {
  const classes = useStyles();

  const location = useLocation();

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.mainHeader}>
          <Typography
            component={Link}
            to="/"
            className={`${classes.headerTitle} ${classes.headerText}`}
            variant="h6"
            noWrap
          >
            CU SURJ Resources
          </Typography>
          <FormControl>
            <Select
              className={classes.headerText}
              value={location.pathname}
            >
              <MenuItem component={Link} to="/" value="/">Select a resource</MenuItem>
              <MenuItem component={Link} to="/articles" value="/articles">
                Articles
              </MenuItem>
              <MenuItem component={Link} to="/books" value="/books">
                Books
              </MenuItem>
              <MenuItem component={Link} to="/videos" value="/videos">
                Videos
              </MenuItem>
              <MenuItem component={Link} to="/media" value="/media">
                Media
              </MenuItem>
              <MenuItem component={Link} to="/scholarly" value="/scholarly">
                Scholarly
              </MenuItem>
              <MenuItem component={Link} to="/groups" value="/groups">
                Groups
              </MenuItem>
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>

      <Container className={classes.content} maxWidth={false}>
        <Grid>
          <Switch>
            <Route path="/articles">
              <Table dataUrl={articles} />
            </Route>
            <Route path="/books">
              <Table dataUrl={books} />
            </Route>
            <Route path="/videos">
              <Table dataUrl={videos} />
            </Route>
            <Route path="/media">
              <Table dataUrl={media} />
            </Route>
            <Route path="/scholarly">
              <Table dataUrl={scholarly} />
            </Route>
            <Route path="/groups">
              <Table dataUrl={groups} />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Grid>
      </Container>
    </>
  )
};

export default App;
