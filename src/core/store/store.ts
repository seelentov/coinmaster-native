import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { api, rtkQueryErrorLogger } from './api/api'
import { authSlice } from './auth/auth.store'
// eslint-disable-next-line @typescript-eslint/no-unused-vars

export const actions = {
  ...authSlice.actions
}

export const reducers = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authSlice.reducer
})

export const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(api.middleware)
      // .concat(rtkQueryErrorLogger)
})