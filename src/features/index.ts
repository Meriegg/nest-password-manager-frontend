import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './auth/auth'
import { userReducer } from './user/userSlice'

export const reduxStore = configureStore({
  reducer: {
    auth: authReducer,
    userData: userReducer,
  },
})
