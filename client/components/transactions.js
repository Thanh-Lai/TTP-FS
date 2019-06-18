import React, { Component } from 'react'
import { fetchTransactions } from '../store/transactions'
import { connect } from 'react-redux'

class Transactions extends Component {

    componentDidMount() {
        this.props.getTransactions(this.props.id)
        console.log(this.props.id)
    }



    render() {
        console.log('trans',this.props.transactions)
        return <h1>Hi asdfjaksdfjaksdfja'skdfjad</h1>
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

