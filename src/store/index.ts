import { configureStore } from "@reduxjs/toolkit";
import { calcReducer } from "./slices/calculator";
import { resultReducer } from "./slices/result";

const store = configureStore({
  reducer: {
    result: resultReducer,
    calculator: calcReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
