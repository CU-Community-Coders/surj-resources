import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { Container, makeStyles } from '@material-ui/core';

import Header, { HEADERS_HEIGHT } from './Header';
import Home from './Home';
import Books from './Books';

const useStyles = makeStyles({
  content: {
    position: 'fixed',
    top: HEADERS_HEIGHT,
    padding: 20,
    width: '100%',
    height: '100%',
    overflow: 'auto'
  }
});

const App = () => {
  const classes = useStyles();

  return (
    <Router>
      <Header />

      <Container className={classes.content}>
        <Switch>
          <Route path="/books">
            <Books />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Container>
    </Router>
  )
};

export default App;
