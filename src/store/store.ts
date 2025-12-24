import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import transactionReducer from "./balanceSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transaction: transactionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
