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
      cash: 0
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.fetchStockPrice = this.fetchStockPrice.bind(this)
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


  handleSubmit(event) {
    event.preventDefault()
    const symbol = event.target.symbol.value
    const quantity = event.target.quantity.value
    console.log('sym', event.target.symbol.value)

    if (!Number.isInteger(Number(quantity))) alert('Please enter valid quantity.')
    // Fetch stock price
    this.fetchStockPrice(symbol)
      .then(res => {
        console.log('res', res)
        return res.data
      })
      .then(price => {
        const transaction = (this.state.cash - Number((Number.parseFloat(price) * Number.parseFloat(quantity)))).toFixed(2)
        //Only allows transaction if balance is greater than 0
        if (transaction <= 0) alert('Sorry you do not have enough cash.')
        if (transaction > 0 && !Number.isNaN(Number(price)) && Number.isInteger(Number(quantity))) {
          this.setState({
            cash: transaction
          })
          //Update Balance and addTransaction
          this.props.updateBalance({ id: this.props.id, balance: transaction })
          this.props.addTransaction({ symbol: symbol, quantity: quantity, price: price, userId: this.props.id })
        }
      })
      .catch(err => {
        // alert(`${symbol} is not a valid symbol.`)
        console.log(err)
      })
  }
  render() {

    return (
      <div>
        <h2>Welcome {this.props.userName}</h2>
        <div id="buy">
          <h3 id="cash">Cash: ${this.state.cash}</h3>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div>
              <Typography component="h1" variant="h5">
                Stocks
              </Typography>
              <form onSubmit={this.handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
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
                  fullWidth
                  id="quantity"
                  label="Quantity"
                  name="quantity"
                  autoComplete="quantity"
                  autoFocus
                  input="quantity"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Buy
                </Button>
              </form>
            </div>
          </Container>
        </div>
        <Portfolio transactions={this.props.transactions} />
      </div>
    )
  }

}


//  <form onSubmit={this.handleSubmit} name={name}>
//             <div>
//               <label htmlFor="symbol"><small>Symbol</small></label>
//               <input name="symbol" type="text" />
//             </div>
//             <div>
//               <label htmlFor="quantity"><small>Quantity</small></label>
//               <input name="quantity" type="text" />
//             </div>
//             <div>
//               <button type="submit">Buy</button>
//             </div>
//             {/* {error && error.response && <div> {error.response.data} </div>} */}
//             </form >


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
}
