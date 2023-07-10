import { combineReducers } from '@reduxjs/toolkit'
import profileReducer from './profile'
import messageReducer from './message'
import transferReducer from './transfer'

const reducer = combineReducers({
  profile: profileReducer,
  message: messageReducer,
  transfer: transferReducer,
})

export default reducer
