const { createSlice } = require('@reduxjs/toolkit')

const initialState = {
  message: '',
}

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload
    },
    clearMessage: () => {
      return initialState
    },
  },
})

export const { setMessage, clearMessage } = messageSlice.actions
export default messageSlice.reducer
