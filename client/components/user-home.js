import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { postTransaction } from '../store/transactions'
import { putBalance } from '../store/user'
import { iexToken } from '../../secrets'
import axios from 'axios'
import Portfolio from './portfolio'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'


class UserHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cash: 0,
      buy: true
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSellChange = this.handleSellChange.bind(this)
    this.handleBuyChange = this.handleBuyChange.bind(this)
    this.fetchStockPrice = this.fetchStockPrice.bind(this)
    this.handleBuy = this.handleBuy.bind(this)
    this.handleSell = this.handleSell.bind(this)
  }

  componentDidMount() {
    this.setState({
      cash: this.props.cash,
    })

  }

  fetchStockPrice = async (symbol) => {
    try {
      return await axios.get(`https://cloud.iexapis.com/v1/stock/${symbol}/price/?token=${iexToken}`)
    } catch (err) {
      console.log(err)
    }
  }

  handleBuyChange() {
    this.setState({ buy: true })
  }

  handleSellChange() {
    this.setState({ buy: false })
  }

  handleSubmit(event) {
    event.preventDefault()
    const symbol = event.target.symbol.value
    const quantity = event.target.quantity.value
    if (this.state.buy) {
      //Handle Buy if buy is true
      this.handleBuy(symbol, quantity)
    } else {
      //Hanld Sell if buy is false
      this.handleSell(symbol, quantity)
    }
  }

  handleBuy(symbol, quantity) {
    if (!Number.isInteger(Number(quantity)) || quantity <= 0) alert('Please enter valid quantity.')
    // Fetch stock price
    this.fetchStockPrice(symbol)
      .then(res => {
        return res.data
      })
      .then(price => {
        const transaction = (Number(this.state.cash) - Number((Number.parseFloat(price) * Number.parseFloat(quantity)))).toFixed(2)
        //Only allows transaction if balance is greater than 0
        if (transaction <= 0) alert('Sorry you do not have enough cash.')
        if (quantity > 0 && transaction > 0 && !Number.isNaN(Number(price)) && Number.isInteger(Number(quantity))) {
          this.setState({
            cash: transaction
          })
          //Update Balance and addTransaction
          this.props.updateBalance({ id: this.props.id, balance: transaction })
          this.props.addTransaction({ symbol: symbol, quantity: quantity, price: price, userId: this.props.id })
        }
      })
      .catch(err => {
        alert(`${symbol} is not a valid symbol.`)
        console.log(err)
      })
  }

  handleSell(symbol, quantity) {
    if (!Number.isInteger(Number(quantity)) || quantity <= 0) alert('Please enter valid quantity.')
    // Fetch stock price
    if (this.props.uniqueTransactions[symbol] === undefined || this.props.uniqueTransactions[symbol].quantity <= 0) alert('You do not have enough stock to sell.')
    this.fetchStockPrice(symbol)
      .then(res => {
        return res.data
      })
      .then(price => {
        const transaction = (Number(this.state.cash) + Number((Number.parseFloat(price) * Number.parseFloat(quantity)))).toFixed(2)
        //Only allows transaction if balance is greater than 0
        console.log('sell', price, quantity, transaction)
        if (quantity > 0 && transaction > 0 && !Number.isNaN(Number(price)) && Number.isInteger(Number(quantity))) {
          this.setState({
            cash: transaction
          })
          //Update Balance and addTransaction
          this.props.updateBalance({ id: this.props.id, balance: transaction })
          this.props.addTransaction({ symbol: symbol, quantity: -quantity, price: price, userId: this.props.id })
        }
      })
      .catch(err => {
        alert(`${symbol} is not a valid symbol.`)
        console.log(err)
      })
  }

  render() {
    // console.log('uni', this.props.uniqueTransactions)

    return (
      <div>
        <h2>Welcome {this.props.userName}</h2>
        <div id="buy">
          <h3 id="cash">Balance: ${this.state.cash}</h3>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div>
              <Typography component="h1" variant="h5">
                Get them while they're hot!
              </Typography>
              <form onSubmit={this.handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth={true}
                  id="symbol"
                  label="Symbol"
                  name="symbol"
                  autoComplete="symbol"
                  autoFocus
                  input="symbol"
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth={true}
                  id="quantity"
                  label="Quantity"
                  name="quantity"
                  autoComplete="quantity"
                  autoFocus
                  input="quantity"
                />
                <Button
                  type="submit"
                  fullWidth={true}
                  variant="contained"
                  color="primary"
                  onClick={this.handleBuyChange}
                >
                  Buy
                </Button>
                <br />
                <br />
                <Button
                  fullWidth={true}
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={this.handleSellChange}
                >
                  Sell
                </Button>
              </form>
            </div>
          </Container>
        </div>
        <div>
          <br />
          <br />
        </div>
        <Portfolio transactions={this.props.transactions} />
      </div>
    )
  }

}

//Container
const mapState = (state) => {
  return {
    userName: state.user.userName,
    cash: state.user.cash,
    id: state.user.id,
    uniqueTransactions: state.transactions.uniqueTransactions
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
}
