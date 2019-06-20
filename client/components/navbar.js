import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <nav>
      {isLoggedIn ? (
        <AppBar position="static">
          {/* The navbar will show these links after you log in */}
          <Tabs>
            <Link to="/home">Home</Link>
            <Link to="/transactions">Transactions</Link>
            <a href="#" onClick={handleClick}>
              Logout
          </a>
          </Tabs>
        </AppBar>
      ) : (
          <AppBar>
            {/* The navbar will show these links before you log in */}
            <Tabs>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </Tabs>
          </AppBar>
        )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
