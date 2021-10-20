import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { serverBaseUrl } from "../config";

const initialState = {
  user: null,
  token: null,
  verifyingTokenLoading: null,
  loginLoading: false,
  loginError: false,
  loadingRegister: false,
  errorRegister: false
};

export const login = createAsyncThunk(
  "authSlice/login",
  async (userObj) => {
    const response = await axios.post(`${serverBaseUrl}/users/login`,
    {
        email: userObj.email,
        password: userObj.password
    },
    {
      headers: { token: localStorage.getItem("token") },
    });
    return response.data;
  }
);

export const verifyToken = createAsyncThunk(
    "authSlice/verify",
    async () => {
      let token = localStorage.getItem(`token`);
      const response = await axios.get(`${serverBaseUrl}/users/me`, {
        headers: { token },
      });
      return response.data; 
    }
  );

export const register = createAsyncThunk(
  "authSlice/register",
  async (userObj) => {
    const response = await axios.post(`${serverBaseUrl}/users/register`,
    {
        email: userObj.email,
        password: userObj.password
    }
    , {
      headers: { token: localStorage.getItem("token") },
    });
    return response.data;
  }
);

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
      toggleLoginError: (state, action) => {
        state.loginError = action.payload;
      },
  },
  extraReducers: {
    [login.pending.type]: (state) => {
        state.loginLoading = true;
        state.loginError = "";
      },
      [login.fulfilled.type]: (state, action) => {
        const token = action.payload.token;
        localStorage.setItem('token', token)
        state.user = action.payload;
        state.token = token;
        state.loginLoading = false;
        state.loginError = "";
      },
      [login.rejected.type]: (state, action) => {
        state.loginLoading = false;
        state.loginError = "Could not login";
      },
      [register.pending.type]: (state) => {
        state.loadingAiGroups = true;
        state.errorAiGroups = "";
      },
      [register.fulfilled.type]: (state, action) => {
        const token = action.payload.token;
        localStorage.setItem('token', token)
        state.user = action.payload;
        state.token = token;
        state.errorRegister = false;
        state.loadingRegister = false;
      },
      [register.rejected.type]: (state, action) => {
        state.loadingRegister = false;
        state.errorRegister = "Could not register";
      },
      [verifyToken.pending.type]: (state) => {
        state.verifyingTokenLoading = true;
      },
      [verifyToken.fulfilled.type]: (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload;
        state.verifyingTokenLoading = false;
      },
      [verifyToken.rejected.type]: (state, action) => {
        state.verifyingTokenLoading = false;
      },
  },
});

export const {
  toggleLoginError,
} = authSlice.actions;

export default authSlice.reducer;

