import { configureStore } from "@reduxjs/toolkit";
import dishesSlice from "../provider/dishesSlice";
import userSlice from "../provider/userSlice";

export const store = configureStore({
  reducer: {
    dishes: dishesSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
