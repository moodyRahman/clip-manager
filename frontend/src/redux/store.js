import { configureStore, combineReducers, } from '@reduxjs/toolkit'
import authReducer from "./authStore"
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    // auth: persistReducer(persistConfig, authReducer)
    auth: authReducer
})

const store = configureStore({
    reducer: rootReducer
})


export { store }