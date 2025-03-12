import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import reviewsReducer from "./slices/reviewsSlice.js"
import usersReducer from "./slices/usersSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    reviews: reviewsReducer,
    users: usersReducer,
  },
});

export default store;