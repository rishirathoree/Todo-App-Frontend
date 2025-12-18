import { configureStore } from '@reduxjs/toolkit'
import { authSlice, timingSlice, todoSlice } from './slices'
import { useDispatch } from 'react-redux'

const store = configureStore({
  reducer: {
    todos: todoSlice,
    auth: authSlice,
    timings: timingSlice,
  },
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export type RootState = ReturnType<typeof store.getState>

export default store
