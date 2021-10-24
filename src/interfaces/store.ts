import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import errorReducer from "../reducers/errorReducer";
import scheduleReducer from "../reducers/scheduleReducer";
import userReducer from "../reducers/userReducer";


const userPersistConfig = {
  key: "userInfo",
  storage,
  whitelist: ["credentials"],
}

const scheduleConfig = {
  key: "schedule",
  storage
}
const persistedUserReducer = persistReducer(userPersistConfig, userReducer)
const persistedScheduleReducer = persistReducer(scheduleConfig, scheduleReducer)
export const store = configureStore({

  reducer: {
    userInfo: persistedUserReducer,
    error: errorReducer,
    schedule: persistedScheduleReducer
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({
      serializableCheck: {
        ignoredActions: ['schedule/postSchedule', 'schedule/getSchedule', 'schedule/selectSchedule']
      }
    })
  ,

});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;