import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { apiConstants } from '../services/constants'

export const fetchId = createAsyncThunk('tickets/fetchId', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(apiConstants.getSearchId)
    if (!response.ok) {
      throw new Error(response.status)
    }
    return response.json()
  } catch (error) {
    return rejectWithValue(error)
  }
})
export const fetchPackOfTickets = createAsyncThunk(
  'tickets/fetchPackOfTickets',
  async (searchId, { rejectWithValue }) => {
    try {
      const response = await fetch(apiConstants.getTickets + apiConstants.searchId + searchId)
      if (!response.ok) {
        throw new Error(response.status)
      }
      return response.json()
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    searchId: null,
    ticketsData: [],
    renderingAmount: 5,
    status: null,
    error: false
  },
  reducers: {
    showMore: (state) => {
      state.renderingAmount += 5
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchId.fulfilled, (state, action) => {
        state.searchId = action.payload.searchId
        state.status = 'pending'
      })
      .addCase(fetchId.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(fetchId.rejected, (state) => {
        state.status = 'rejected'
        state.error = true
      })
      .addCase(fetchPackOfTickets.fulfilled, (state, action) => {
        state.ticketsData.push(...action.payload.tickets)
        if (action.payload.stop === true) {
          state.status = 'fulfilled'
        } else {
          state.status = 'pending'
        }
        state.error = false
      })
      .addCase(fetchPackOfTickets.pending, (state) => {
        state.error = false
        state.status = 'pending'
      })
      .addCase(fetchPackOfTickets.rejected, (state, action) => {
        if (action.payload !== '500') {
          state.error = true
        }
        state.status = 'rejected'
      })
  }
})
export const { showMore } = ticketsSlice.actions
export default ticketsSlice.reducer
