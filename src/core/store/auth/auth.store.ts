import { createSlice } from "@reduxjs/toolkit"
import { LANG_KEY } from "../../../lang/lang"

export interface AuthStore {
  token: string
  lang: LANG_KEY
}

const initialState: AuthStore = {
  token: "",
  lang: "RU"
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, { payload: action }) => {
      state.token = action
    },
    setLang: (state, { payload: action }) => {
      state.lang = action
    }
  },
})