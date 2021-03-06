import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { auth } from '../store'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
/**
 * COMPONENT: Handles Auth
 */

 //style for Material UI
const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
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

const AuthForm = (props) => {
  const { name, displayName, handleSubmit } = props
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {displayName}
        </Typography>
        <form onSubmit={handleSubmit} name={name} className={classes.form}>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth ={true}
            id="userName"
            label="User Name"
            name="userName"
            autoComplete="userName"
            autoFocus
            input="userName"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth ={true}
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            input="email"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth ={true}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            input="password"

          />
          <Button
            type="submit"
            fullWidth ={true}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
          {displayName}
          </Button>
        </form>
        <a href="/auth/google" >{displayName} with Google</a>
      </div>
    </Container>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */

const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const userName = evt.target.userName.value
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(userName, email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired
}
