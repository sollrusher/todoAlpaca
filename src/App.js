import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';

import Auth from './authPage';
import './app.css';
import Register from './registerPage';
import TodoList from './todoList';
import PrivateRoute from './utils/privateRoute';
import { connect } from 'react-redux';
import { logoutUser } from './store/action/action';

import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
} from '@material-ui/core';

const mapStateToProps = (store) => ({
  initialized: store.initialized,
  store,
});

const mapDispatchToProps = {
  logoutUser,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const connector = connect(mapStateToProps, mapDispatchToProps);

function App(props) {
  const { initialized, logoutUser } = props;
  const classes = useStyles();
  return (
    <>
      <Router>
        <div className={classes.root}>
          <AppBar position='static'>
            <Toolbar>
              <Typography variant='h4' className={classes.title}>
                ToDo List
              </Typography>

              {!initialized ? (
                <>
                  <Button color='inherit' component={Link} to='/'>
                    Login
                  </Button>
                  <Button color='inherit' component={Link} to='/register'>
                    Register
                  </Button>
                </>
              ) : (
                <Button
                  color='inherit'
                  onClick={() => logoutUser()}
                  component={Link}
                  to='/'
                >
                  Logout
                </Button>
              )}
            </Toolbar>
          </AppBar>
        </div>
        <div className='app'>
          <Switch>
            <Route exact path='/'>
              {initialized ? <Redirect to='/todolist' /> : <Auth />}
            </Route>
            <Route path='/register'>
              {initialized ? <Redirect to='/todolist' /> : <Register />}
            </Route>
            <PrivateRoute path='/todolist' auth={initialized}>
              <TodoList/>
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default connector(App);
