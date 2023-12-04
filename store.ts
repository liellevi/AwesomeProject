import { configureStore} from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist';
import {combineReducers} from "redux"; 

import AsyncStorage from '@react-native-async-storage/async-storage';



import expensesReducer from './src/expensesSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}
const reducers = combineReducers({
  expenses: expensesReducer
 });
const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
    
  })
  
  export const persistor = persistStore(store)

  export type RootState = ReturnType<typeof store.getState>
  export type AppDispatch = typeof store.dispatch
