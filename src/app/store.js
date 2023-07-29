import { configureStore } from "@reduxjs/toolkit";

import transactionReducer from "../app/slices/transactionSlice";
import userReducer from "../app/slices/userSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    transaction: transactionReducer,
  },
  devTools: process.env.NODE_ENV === "development",
});
