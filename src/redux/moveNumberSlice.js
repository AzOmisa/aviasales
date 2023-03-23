import { createSlice } from '@reduxjs/toolkit'

import { moveNumberConstants } from '../services/constants'

export const moveNumberSlice = createSlice({
  name: 'moveNumber',
  initialState: {
    all: false,
    without: true,
    one: false,
    two: false,
    three: false
  },
  reducers: {
    toggleFilter: (state, action) => {
      switch (action.payload) {
        case moveNumberConstants.all:
          if (state.all) {
            for (let key in state) {
              state[key] = false
            }
          } else {
            for (let key in state) {
              state[key] = true
            }
          }
          break
        case moveNumberConstants.without:
          state.without = !state.without
          break
        case moveNumberConstants.one:
          state.one = !state.one
          break
        case moveNumberConstants.two:
          state.two = !state.two
          break
        case moveNumberConstants.three:
          state.three = !state.three
          break
        default:
          break
      }
      let allStatus
      for (let key in state) {
        if (key !== 'all' && !state[key]) {
          allStatus = true
        }
      }
      state.all = allStatus ? false : true
    }
  }
})

export const { toggleFilter } = moveNumberSlice.actions
export default moveNumberSlice.reducer
