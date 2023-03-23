import { combineReducers, configureStore } from '@reduxjs/toolkit'

import filterReducer from './filterSlice'
import moveNumberReducer from './moveNumberSlice'
import ticketsReducer from './ticketsSlice'

const rootReducer = combineReducers({
  filter: filterReducer,
  moveNumber: moveNumberReducer,
  tickets: ticketsReducer
})
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false
    })
})
