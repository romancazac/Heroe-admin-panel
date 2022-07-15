import { configureStore } from '@reduxjs/toolkit'
import filter from './slices/filterSlice'
import heroes from './slices/heroeSlice'

export const store = configureStore({
  reducer: {
   filter,
   heroes
  },
})