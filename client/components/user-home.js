import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {userName} = props

  return (
    <div>
      <h3>Welcome, {userName}</h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    userName: state.user.userName
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  userName: PropTypes.string
}
