import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

type TypeUser = {
  displayName: string;
  photoUrl: string;
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: { uid: "", photoUrl: "", dispalayName: "" },
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = { uid: "", photoUrl: "", dispalayName: "" };
    },
    updeteUserProfile: (state, action: PayloadAction<TypeUser>) => {
      state.user.dispalayName = action.payload.displayName;
      state.user.photoUrl = action.payload.photoUrl;
    },
  },
});

export const { login, logout, updeteUserProfile } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
