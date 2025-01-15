import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {  createSlice } from '@reduxjs/toolkit';
import cobitResultsReducer from './cobitResultsSlice'; 



const persistConfig = {
  key: 'root',
  storage,
};



const rootReducer = combineReducers({
  cobitResult: cobitResultsReducer 
});



const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };

