import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get("/api/users");
  return response.data;
});

export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  await axios.delete(`/api/users/${id}`);
  return id;
});

export const updateUser = createAsyncThunk("users/updateUser", async ({ id, userData }) => {
  const response = await axios.put(`/api/users/${id}`, userData);
  return response.data;
});

const usersSlice = createSlice({
  name: "users",
  initialState: { users: [], error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) state.users[index] = action.payload;
      });
  },
});

export default usersSlice.reducer;
