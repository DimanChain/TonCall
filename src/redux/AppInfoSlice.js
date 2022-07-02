import { createSlice } from "@reduxjs/toolkit";

const AppInfoSlice = createSlice({
  name: "appInfo",
  initialState: {
      publicKey: "",
      secretKey: "",
      walletAddress: "",
    balance : 10
  },
  reducers: {
    setUserInfo(state, action) {
      return action.payload;
    },
  },
});

export const { setUserInfo } = AppInfoSlice.actions;
export default AppInfoSlice.reducer;
