import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  REHYDRATE,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import persistedReducer from './persisted';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import categoriesReducer from './categories';

const combinedReducer = combineReducers({
  persisted: persistedReducer,
  categories: categoriesReducer,
});

const persistedCombinedReducer = persistReducer(
  {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['persisted'],
  },
  combinedReducer,
);

const getStores = () => {
  const store = configureStore({
    reducer: persistedCombinedReducer,
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      });
    },
  });

  const persistor = persistStore(store);

  return {store, persistor};
};

const {store, persistor} = getStores();

export {store, persistor};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
