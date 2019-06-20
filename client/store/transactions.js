import axios from 'axios'

//Action types
const GET_TRANSACTIONS = 'GET_TRANSACTIONS'
const POST_TRANSACTION = 'POST_TRANSACTION'
const UPDATE_UNIQUE_TRANSACTIONS = 'UPDATE_UNIQUE_TRANSACTIONS'

//Initial State
const initialState = {
    allTransactions: [],
    uniqueTransactions: {}
}

//Action creators
const getTransactions = allTransactions => ({type: GET_TRANSACTIONS, allTransactions})
const createTransaction = transaction => ({type: POST_TRANSACTION, transaction})
const updateUniqueTransactions = transactions => ({type: UPDATE_UNIQUE_TRANSACTIONS, transactions})

//Thunk creators
export const fetchTransactions = (id) => {
    return dispatch => {
        axios.get(`/api/transactions/${id}`)
            .then(res => res.data)
            .then(allTransactions => {
                dispatch(getTransactions(allTransactions))
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

export const updateUnique = (transactions) => {
    return dispatch => {
        dispatch(updateUniqueTransactions(transactions))
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
      case UPDATE_UNIQUE_TRANSACTIONS:
        return {
            ...state,
            uniqueTransactions: action.transactions
        }
      default:
        return state
    }
  }
