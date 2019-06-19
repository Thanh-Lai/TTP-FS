import React, { Component } from 'react'
import axios from 'axios';
import { connect } from 'react-redux'
import { iexToken } from '../../secrets'
import PortfolioItem from './portfolio-list'

class Portfolio extends Component {
    constructor(props) {
        super(props)
        this.state = {
            uniqueTransactions: [],
            openPrice: {},
            currPrice: {}
        }
        this.fetchOHLC = this.fetchOHLC.bind(this)
        this.fetchTransactions = this.fetchTransactions.bind(this)
        this.fetchCurrPrice = this.fetchCurrPrice.bind(this)
        this.controller = new AbortController();
    }

    fetchOHLC = async (symbol) => {
        try {
            return await axios.get(`https://cloud.iexapis.com/v1/stock/${symbol}/ohlc/?token=${iexToken}`, {
                signal: this.controller.signal
            })

        } catch (err) {
            console.log(err)
        }
    }

    fetchCurrPrice = async (symbol) => {
        try {
            return await axios.get(`https://cloud.iexapis.com/v1/stock/${symbol}/price/?token=${iexToken}`, {
                signal: this.controller.signal
            })
        } catch (err) {
            console.log(err)
        }
    }

    fetchTransactions = async (id) => {
        const res = await axios.get(`/api/transactions/unique/${id}`, {
            signal: this.controller.signal
        })
        this.setState({ uniqueTransactions: res.data })
        const temp = {}
        const tempCurrPrice = {}
        res.data.map(transaction => {
            const symbol = transaction.symbol;
            this.fetchOHLC(symbol)
                .then(res => res.data)
                .then(data => {
                    temp[symbol] = data.open.price
                })
                .catch(console.error())
            this.fetchCurrPrice(symbol)
                .then(res => res.data)
                .then(data => {
                    tempCurrPrice[symbol] = data;
                })
        })

        this.timeOut = setTimeout(() => {
            this.setState({ openPrice: temp, currPrice: tempCurrPrice })
        }, 500);
    }

    componentDidMount() {
        this.fetchTransactions(this.props.id)
        this.timeInterval = setInterval(() => {
            this.fetchTransactions(this.props.id)
        }, 300)
    }

    componentWillUnmount() {
        this.controller.abort()
        clearInterval(this.timeInterval)
        clearTimeout(this.timeOut)
    }

    render() {
        return <PortfolioItem portfolio={this.state.uniqueTransactions} openPrice={this.state.openPrice} currPrice={this.state.currPrice} />
    }
}
const mapState = (state) => {
    return {
        id: state.user.id,
    }
}

export default connect(mapState)(Portfolio)
