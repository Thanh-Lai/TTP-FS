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
export const fetchTransactions = () => {
    return dispatch => {
        axios.get('/api/transactions')
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
                // console.log('Hello',createTransaction)
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
