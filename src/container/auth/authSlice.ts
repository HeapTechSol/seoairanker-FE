import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { MaybeNull } from "@/utils/commonTypes";

import { UserTypes } from "./authTypes";

type initialType = {
  user: MaybeNull<UserTypes>;
};
const initialState: initialType = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<MaybeNull<UserTypes>>
    ) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
