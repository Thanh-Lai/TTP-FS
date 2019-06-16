import React, { Component } from 'react'
import axios from 'axios';
import { connect } from 'react-redux'
import { fetchTransactions } from '../store/transactions'
import { iexToken } from '../../secrets'

class Portfolio extends Component {
    constructor(props) {
        super(props)
        this.state = {
            uniqueTransactions: {},
            allTransactions: null
        }
        this.fetchOHLC = this.fetchOHLC.bind(this)
        this.getData = this.getData.bind(this)
    }

    fetchOHLC = async (symbol) => {
        try {
            return await axios.get(`https://cloud.iexapis.com/v1/stock/${symbol}/ohlc/?token=${iexToken}`)
        } catch (err) {
            console.log(err)
        }
    }

    componentDidMount() {
        this.props.userTransactions(this.props.id)
        // this.getData()
        // console.log('here',myData)
    }

    getData = () => {
        const promises = []
        let unique = {}
        // console.log('getMe', this.props.transactions)
        this.props.transactions.map(transaction => {
            const stockSymbol = transaction.symbol

            if (unique[stockSymbol]) {
                unique[stockSymbol].quantity += transaction.quantity
            }
            else if (!unique[stockSymbol]) {
                unique[stockSymbol] = transaction
                promises.push(this.fetchOHLC(stockSymbol))
                Promise.all(promises)
                    .then(res => {
                        res.forEach(elem => {
                            
                            // console.log('getMe', elem)
                            const lowerCaseSymbol = elem.data.symbol.toLowerCase()
                            unique[lowerCaseSymbol]["openPrice"] = elem.data.open.price
                        })
                        // this.setState({uniqueTransactions: unique})
                    })
            }
        })
            console.log('unique',unique)
        // this.setState({uniqueTransactions: unique})
        return  unique
    }


    render() {
        let data = this.getData()
        // let dataKeys = Object.keys(data['f'])
        console.log('state',data['f'])


        // console.log('unique', this.state.uniqueTransactions)
        const style = { border: "1px solid black" }

        return (
            <ul>
                {Object.keys(data).map(symbol => {
                    const transaction = data[symbol]
                    console.log('map', Object.keys(data[symbol]))
                    console.log('OP', data[symbol].openPrice)

                    return (
                        <table style={style} key={transaction.id}>
                            <thead>
                                <tr>
                                    <th style={style}>Symbol</th>
                                    <th style={style} >Shares</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr >
                                    <td style={style} >{transaction.symbol}</td>
                                    <td style={style}>{transaction.quantity}</td>
                                </tr>
                            </tbody>
                        </table>


                    )
                })}
            </ul>
        )

    }
}
const mapState = (state) => {
    return {
        id: state.user.id,
        transactions: state.transactions.allTransactions
    }
}

const mapDispatch = (dispatch) => {
    return {
        userTransactions: (id) => {
            dispatch(fetchTransactions(id))
        }
    }
}

export default connect(mapState, mapDispatch)(Portfolio)
