import AsyncStorage from '@react-native-community/async-storage';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';

import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import rootReducer from './reducers';

const persistConfig = {
  // Root
  key: 'root',
  // Storage Method (React Native)
  storage: AsyncStorage,
}; // Middleware: Redux Persist Persisted Reducer

const logger = createLogger();

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const getStore = () => {
  return store;
};

export const store = createStore(persistedReducer, applyMiddleware(thunkMiddleware, logger));
export const persistor = persistStore(store);

export default store;
