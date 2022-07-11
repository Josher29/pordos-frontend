import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import appSlice from "./Slices/appSlice";
import userSlice from "./Slices/userSlice";
import opinionSlice from "./Slices/opinionSlice";
import themeSlice from "./Slices/themeSlice";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'


const reducers = combineReducers({
  app: appSlice,
  user: userSlice,
  opinion: opinionSlice,
  theme:themeSlice
});

const rootPersistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(rootPersistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER],
      },
    }),
});

export default store;
