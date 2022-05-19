import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserSliceTypes } from '../../types/redux'

const initialState: UserSliceTypes = {
  value: {
    userData: null,
  },
}

const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUserData: (state: UserSliceTypes, action: PayloadAction<any>) => {
      state.value = action.payload
    },

    logout: (state: UserSliceTypes) => {
      state.value.userData = null
    },
  },
})

export const { setUserData, logout } = userSlice.actions
export const userReducer = userSlice.reducer
