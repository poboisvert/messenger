import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Paper,
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
} from '@material-ui/core';
import { login } from './store/utils/thunkCreators';

import { makeStyles } from '@material-ui/core/styles';
import image from './themes/images/bg-img.png';

const useStyles = makeStyles((theme) => ({
  navButton: {
    textAlign: 'center',
    variant: 'contained',
    background: 'white',
    height: 50,
    width: 160,
  },
  sidebar__header: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 40,
    paddingRight: 40,
    paddingBottom: 60,
  },
  sidebar__box: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  sidebar__container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  sidebar__suggestion: {
    paddingRight: 40,
  },

  sidebar: {
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    height: '100vh',
  },
  content: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
}));

const Login = (props) => {
  const history = useHistory();
  const classes = useStyles();

  const { user, login } = props;

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to='/home' />;
  }

  return (
    <>
      <Grid container direction='row' justifyContent='flex-start'>
        <Grid container xs={6} item className={classes.sidebar}></Grid>
        <Grid container direction='column' xs={6}>
          <Box className={classes.sidebar__header}>
            <Typography className={classes.sidebar__suggestion}>
              Don't have an account?
            </Typography>
            <Paper elevation={3}>
              <Button onClick={() => history.push('/register')}>
                Create account
              </Button>
            </Paper>
          </Box>

          <Grid className={classes.sidebar__container} item xs={6}>
            <Box pt={10} className={classes.sidebar__box}>
              <Typography className={classes.sidebar__header} variant='h3'>
                Welcome Back!
              </Typography>
              <form onSubmit={handleLogin}>
                <Grid container direction='column' spacing={3}>
                  <Grid item>
                    <FormControl margin='normal' required>
                      <TextField
                        aria-label='username'
                        label='Username'
                        name='username'
                        type='text'
                      />
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl margin='normal' required>
                      <TextField
                        label='password'
                        aria-label='password'
                        type='password'
                        name='password'
                      />
                    </FormControl>
                  </Grid>

                  <Grid item>
                    <Box pt={4} textAlign='center'>
                      <Button
                        type='submit'
                        color='primary'
                        variant='contained'
                        size='large'
                      >
                        Login
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
