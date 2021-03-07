import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import './authPage.css';
import { onLogin } from './utils/get-user';
import { loginUser } from './store/action/action';
import { Link } from 'react-router-dom';

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
} from '@material-ui/core';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const mapDispatchToProps = {
  loginUser,
};

function Auth(props) {
  const [authData, setAuthData] = useState({ login: '', password: '' });

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    if (/ /g.test(value) || value.length > 10) return;

    setAuthData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (event) => {
    const { loginUser } = props;
    const { login, password } = authData;
    if (
      login !== '' &&
      login.length < 20 &&
      password !== '' &&
      password.length < 20
    ) {
      await onLogin(login, password);
      loginUser(login, password);
    }
  };

  const classes = useStyles();
  console.log(authData);
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Login'
            name='login'
            autoFocus
            onChange={handleInputChange}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            onChange={handleInputChange}
          />
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />
          <Button
            type='button'
            fullWidth 
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/register">Регистрация</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default connect(null, mapDispatchToProps)(Auth);
