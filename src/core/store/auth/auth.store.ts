import { createSlice } from "@reduxjs/toolkit"

export interface AuthStore { token: string }

const initialState: AuthStore = {
  token: ""
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, { payload: action }) => {
      state.token = action
    },
  },
})