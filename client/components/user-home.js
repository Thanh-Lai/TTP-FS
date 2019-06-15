import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { postTransaction } from '../store/transactions'


/**
 * COMPONENT
 */
class UserHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      transactions: [],
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const ticker = evt.target.ticker.value
    const quantity = evt.target.quantity.value
    const price = evt.target.price.value
    console.log('dfdsf', price)
    this.props.addTransaction({ticker: ticker, quantity: quantity, price: price})
  }
render() {

  return (
    <div>
      <h3>Welcome, {this.props.userName}</h3>

      <form onSubmit={this.handleSubmit} name={name}>
        <div>
          <label htmlFor="ticker"><small>Ticker</small></label>
          <input name="ticker" type="text" />
        </div>
        <div>
          <label htmlFor="quantity"><small>Quantity</small></label>
          <input name="quantity" type="text" />
        </div>
        <div>
          <label htmlFor="price"><small>Price</small></label>
          <input name="price" type="text" />
        </div>
        <div>
          <button type="submit">Buy</button>
        </div>
        {/* {error && error.response && <div> {error.response.data} </div>} */}
      </form>
    </div>
  )
}

}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    userName: state.user.userName
  }
}

const mapDispatch = (dispatch) => {
  return {
    addTransaction: (transaction) => {
      dispatch(postTransaction(transaction))
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  userName: PropTypes.string
}
