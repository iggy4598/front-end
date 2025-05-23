import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axiosInstance.get("/api/admin/users", {
    headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
  });
  return response.data;
});

const usersSlice = createSlice({
  name: "users",
  initialState: { users: [], error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export default usersSlice.reducer;
