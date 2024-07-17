import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import authSlice from '@/container/auth/authSlice'
import sitesSlicer from '@/container/sites/sitesSlice'
import billingSlice from '@/container/billing/billingSlice'

import { baseQueryApi } from './queryAPI'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
}

export const rootReducer = combineReducers({
  auth: authSlice,
  billing: billingSlice,
  sites: sitesSlicer,
  [baseQueryApi.reducerPath]: baseQueryApi.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseQueryApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const persister = persistStore(store)

export const clearPersistedValues = () => {
  persister.pause()
  persister.flush().then(() => {
    return persister.purge()
  })
}
