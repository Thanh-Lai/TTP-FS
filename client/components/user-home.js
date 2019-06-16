import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { postTransaction } from '../store/transactions'
import { putBalance } from '../store/user'
import { iexToken } from '../../secrets'
import axios from 'axios'

class UserHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      transactions: [],
      cash: 0
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.fetchStockPrice = this.fetchStockPrice.bind(this)
  }

  componentDidMount() {
    this.setState({ cash: this.props.cash})
  }

  fetchStockPrice = async (symbol) => {
    try {
      return await axios.get(`https://cloud.iexapis.com/v1/stock/${symbol}/price/?token=${iexToken}`)
    } catch (err) {
      console.log(err)
    }

  }

  handleSubmit(event) {
    event.preventDefault()
    const symbol = event.target.symbol.value
    const quantity = event.target.quantity.value
    if (!Number.isInteger(Number(quantity))) alert('Please enter valid quantity.')
    // Fetch stock price
    this.fetchStockPrice(symbol)
      .then(res => res.data)
      .then(price => {
        if (typeof price !== "number") alert(`${symbol} is not a valid symbol.`)
        const transaction = (this.state.cash - Number((Number.parseFloat(price) * Number.parseFloat(quantity)))).toFixed(2)
        //Only allows transaction if balance is greater than 0
        if (transaction <= 0) alert('Sorry you do not have enough cash.')
        if (transaction > 0 && !Number.isNaN(Number(price)) && Number.isInteger(Number(quantity))) {
          this.setState({
            cash: transaction
          })
          this.props.updateBalance({ id: this.props.id, balance: transaction })
          this.props.addTransaction({ symbol: symbol, quantity: quantity, price: price })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  render() {

    return (
      <div>
        <h3>Welcome, {this.props.userName}</h3>

        <div id="cash">Cash: ${this.state.cash}</div>
        <form onSubmit={this.handleSubmit} name={name}>
          <div>
            <label htmlFor="symbol"><small>Symbol</small></label>
            <input name="symbol" type="text" />
          </div>
          <div>
            <label htmlFor="quantity"><small>Quantity</small></label>
            <input name="quantity" type="text" />
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

//Container
const mapState = (state) => {
  return {
    userName: state.user.userName,
    cash: state.user.cash,
    id: state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    addTransaction: (transaction) => {
      dispatch(postTransaction(transaction))
    },
    updateBalance: (balance) => {
      dispatch(putBalance(balance))
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)

//Prop Types
UserHome.propTypes = {
  userName: PropTypes.string,
  // cash: PropTypes.number
}
