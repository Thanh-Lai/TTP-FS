import React, { Component } from 'react'
import { fetchTransactions } from '../store/transactions'
import { connect } from 'react-redux'

class Transactions extends Component {

    componentDidMount() {
        this.props.getTransactions(this.props.id)
    }

    render() {
        const style = { border: "1px solid black" };
        
        return (
            <div>
                <h1>Your Transactions</h1>
                <table style={style}>
                    <thead>
                        <tr>
                            <th style={style}>Symbol</th>
                            <th style={style}>Shares</th>
                            <th style={style}>Price</th>
                            <th style={style}>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.transactions.map(item => {
                            const dataStyle = { border: "1px solid black", backgroundColor: "#e6e6ff" };
                            const datePurchased = new Date(item.createdAt)
                            const month = datePurchased.getMonth() +1
                            const day = datePurchased.getDate()
                            const year =datePurchased.getFullYear()

                            return (
                                <tr key={item.id}>
                                    <td style={dataStyle}>{item.symbol}</td>
                                    <td style={dataStyle}>{item.quantity}</td>
                                    <td style={dataStyle}>$ {item.price}</td>
                                    <td style={dataStyle}>{`${month}/${day}/${year}`}</td>
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </table>
            </div>
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
        getTransactions: (id) => {
            dispatch(fetchTransactions(id))
        }
    }
}

export default connect(mapState, mapDispatch)(Transactions)

