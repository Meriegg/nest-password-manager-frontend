import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthSliceTypes } from '../../types/redux'

const initialState: AuthSliceTypes = {
  value: {
    token: null,
  },
}

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    refreshToken: (
      state: AuthSliceTypes,
      action: PayloadAction<{ token: string }>,
    ) => {
      state.value.token = action.payload.token
    },

    removeRefreshToken: (state: AuthSliceTypes) => {
      state.value.token = null
    },
  },
})

export const { refreshToken } = authSlice.actions
export const authReducer = authSlice.reducer
