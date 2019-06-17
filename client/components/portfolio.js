import React, { Component } from 'react'
import axios from 'axios';
import { connect } from 'react-redux'
// import { fetchTransactions } from '../store/transactions'
import { iexToken } from '../../secrets'
import PortfolioItem from './portfolio-list'

class Portfolio extends Component {
    constructor(props) {
        super(props)
        this.state = {
            uniqueTransactions: [],
            openPrice: {}
        }
        this.fetchOHLC = this.fetchOHLC.bind(this)
        this.fetchTransactions = this.fetchTransactions.bind(this)
        this.fetchCurrPrice = this.fetchCurrPrice.bind(this)
    }

    fetchOHLC = async (symbol) => {
        try {
            return await axios.get(`https://cloud.iexapis.com/v1/stock/${symbol}/ohlc/?token=${iexToken}`)

        } catch (err) {
            console.log(err)
        }
    }

    fetchCurrPrice = async (symbol) => {
        try {
            return await axios.get(`https://cloud.iexapis.com/v1/stock/${symbol}/price/?token=${iexToken}`)
        } catch (err) {
            console.log(err)
        }
    }

    fetchTransactions = async (id) => {
        const res = await axios.get(`/api/transactions/${id}`)
        this.setState({ uniqueTransactions: res.data })
        const temp = {}
        let priceData = {}
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
                    temp[symbol]['currPrice'] = data
                })
        })

        setTimeout(() => {
            priceData = temp
            this.setState({ openPrice: priceData })
        }, 300);
    }


    componentDidMount() {
        this.fetchTransactions(this.props.id)
        setInterval(() => {
            this.fetchTransactions(this.props.id)
        }, 1000)
    }

    render() {
        return <PortfolioItem portfolio={this.state.uniqueTransactions} price={this.state.openPrice} />
    }
}
const mapState = (state) => {
    return {
        id: state.user.id,
    }
}

export default connect(mapState)(Portfolio)
