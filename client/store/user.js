import axios from 'axios'
import history from '../history'

//Action Types
const GET_USER = 'GET_USER'
const GET_BALANCE = 'GET_BALANCE'
const UPDATE_BALANCE = 'UPDATE_BALANCE'
const REMOVE_USER = 'REMOVE_USER'


//Initial State
 
const defaultUser = {
  cash: 0,
}

//Action Creators
const getUser = user => ({ type: GET_USER, user })
const removeUser = () => ({ type: REMOVE_USER })
const getBalance = balance => ({ type: GET_BALANCE, balance })
const updateBalance = balance => ({type: UPDATE_BALANCE, balance})

//Thunk Creators
export const fetchBalance = (id) => {
  return dispatch => {
    axios.get(`/api/users/${id}`)
      .then(res => res.data)
      .then(balance => {
        dispatch(getBalance(balance))
      })
  }
}

export const putBalance = (balance) => {
  return dispatch => {
    console.log('in store',balance)
    axios.put(`/api/users/${balance.id}`, balance)
      .then(res => res.data)
      .then(updatedBalance => {
        dispatch(updateBalance(updatedBalance))
      })
      .catch(console.error)
  }
}

export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res =>
        dispatch(getUser(res.data || defaultUser)))
      .catch(err => console.log(err))

export const auth = (userName, email, password, method) =>
  dispatch =>
    axios.post(`/auth/${method}`, { userName, email, password })
      .then(res => {
        dispatch(getUser(res.data))
        history.push('/home')
      }, authError => { // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getUser({ error: authError }))
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(_ => {
        dispatch(removeUser())
        history.push('/login')
      })
      .catch(err => console.log(err))

//Reducers
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case GET_BALANCE:
      return {
        ...state,
        cash: action.balance
      }
    case UPDATE_BALANCE:
      return {
        ...state,
        cash: action.balance
      }
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
