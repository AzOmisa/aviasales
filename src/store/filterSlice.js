import { createSlice } from '@reduxjs/toolkit'

import { filterConstants } from '../services/constants'

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    selected: filterConstants.cheap
  },
  reducers: {
    onFilterClick: (state, action) => {
      if (state.selected !== action.payload) {
        state.selected = action.payload
      }
    }
  }
})
export const { onFilterClick } = filterSlice.actions
export default filterSlice.reducer
