import { combineReducers } from '@reduxjs/toolkit'
import profileReducer from './profile'

const reducer = combineReducers({
  profile: profileReducer,
})

export default reducer
