import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { serverBaseUrl } from "../config";

const initialState = {
  emails: [],
  emailsLoading: false,
  emailsError: false,
}

export const fetchEmails = createAsyncThunk(
  "emails/get",
  async () => {
    const response = await axios.get(`${serverBaseUrl}/emails`, {
      headers: { token: localStorage.getItem("token") },
    });
    return response.data;
  }
);

const emailSlice = createSlice({
  name: "emailSlice",
  initialState,
  reducers: {

  },
  extraReducers: {
    [fetchEmails.pending.type]: (state) => {
      state.emailsLoading = true;
      state.emailsError = "";
    },
    [fetchEmails.fulfilled.type]: (state, action) => {
      state.emails = action.payload;
      state.emailsLoading = false;
      state.emailsError = "";
    },
    [fetchEmails.rejected.type]: (state, action) => {
      state.emails = [];
      state.emailsLoading = false;
      state.emailsError = "Could not load emails";
    },
  },
});

export default emailSlice.reducer;
