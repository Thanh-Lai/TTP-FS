import axios from 'axios'

//Action types
const GET_TRANSACTIONS = 'GET_TRANSACTIONS';
const POST_TRANSACTION = 'POST_TRANSACTION';

//Initial State
const initialState = {
    allTransactions: []
}

//Action creators
const getTransactions = allTransactions => ({type: GET_TRANSACTIONS, allTransactions})
const createTransaction = transaction => ({type: POST_TRANSACTION, transaction})

//Thunk creators
export const fetchTransactions = (id) => {
    return dispatch => {
        axios.get(`/api/transactions/${id}`)
            .then(res => res.data)
            .then(allTransactions => {
                let uniqueCheck = {}
                const uniqueTranactions = [];
                allTransactions.forEach(transaction => {
                    const symbol = transaction.symbol
                    if (uniqueCheck[symbol]) {
                        uniqueCheck[symbol].quantity += transaction.quantity;
                    } else {
                        uniqueCheck[symbol] = transaction
                    }
                })
                for (let key in uniqueCheck) {
                    uniqueTranactions.push(uniqueCheck[key])
                }
                dispatch(getTransactions(uniqueTranactions))
            })
            .catch(console.error)
    }
}

export const postTransaction = (transaction) => {
    return dispatch => {
        axios.post('/api/transactions', transaction)
            .then(res => res.data)
            .then(createdTransaction => {
                dispatch(createTransaction(createdTransaction))
            })
            .catch(console.error)
    }
}

//Reducers
export default function (state = initialState, action) {
    switch (action.type) {
      case GET_TRANSACTIONS:
        return {
            ...state,
            allTransactions: action.allTransactions
        }
      case POST_TRANSACTION:
        return {
            ...state,
            allTransactions: [...state.allTransactions, action.transaction]
        }
      default:
        return state
    }
  }
