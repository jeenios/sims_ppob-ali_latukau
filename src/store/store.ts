import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import transactionReducer from "./balanceSlice";
import serviceReducer from "./serviceSlice";
import bannerReducer from "./bannerSlice";
import topupReducer from "./topupSlice";
import paymentReducer from "./paymentSlice";
import historyReducer from "./historySlice";
import profileReducer from "./profileSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transaction: transactionReducer,
    service: serviceReducer,
    banner: bannerReducer,
    topup: topupReducer,
    payment: paymentReducer,
    history: historyReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
