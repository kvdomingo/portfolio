import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import courseworkReducer from "./courseworkSlice";
import devReducer from "./devSlice";
import generalReducer from "./generalSlice";
import photographyReducer from "./photographySlice";

export const store = configureStore({
  reducer: {
    general: generalReducer,
    photography: photographyReducer,
    dev: devReducer,
    coursework: courseworkReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
