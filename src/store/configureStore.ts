import {configureStore} from '@reduxjs/toolkit';
import {reduxStorage} from '@utils/mmkv';
import {persistReducer, persistStore} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import {rootReducer} from './rootReducer';
import {rootSaga} from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}
const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  whitelist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middlewares),
  enhancers: [],
});

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export const configuredStore = {
  store,
  persistor,
};
