import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Credentials, UserInfo, UserInfoStore } from "../interfaces/extapi/userInfo";

const initialState: UserInfoStore = {
  info: {
    userId: "",
    email: "",
    tel: "",
    firstname: ""
  },
  credentials: {
    accessToken: '',
    idToken: '',
    refleshToken: ''
  },
  isLoading: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserInfo: (state, action: PayloadAction<UserInfo>) => {
      (Object.keys(action.payload) as (keyof UserInfo)[]).forEach((key) => {
        state.info[key] = action.payload[key];
      })
    },
    getCredentials: (state, action: PayloadAction<Credentials>) => {
      state.credentials = action.payload;
    },
    getAccessTokenAndIdToken: (state, action: PayloadAction<Credentials>) => {
      state.credentials.accessToken = action.payload.accessToken;
      state.credentials.idToken = action.payload.idToken
    }
  }
})

export const { getUserInfo, getCredentials, getAccessTokenAndIdToken } = userSlice.actions;

export default userSlice.reducer;