import { combineReducers } from '@reduxjs/toolkit'
import profileReducer from './profile'
import messageReducer from './message'

const reducer = combineReducers({
  profile: profileReducer,
  message: messageReducer,
})

export default reducer
