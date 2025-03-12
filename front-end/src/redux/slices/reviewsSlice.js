import { createSlice } from "@reduxjs/toolkit";

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: { reviews: [] },
  reducers: {
    addReview: (state, action) => {
      state.reviews.push(action.payload);
    },
    updateReview: (state, action) => {
      const index = state.reviews.findIndex((r) => r.id === action.payload.id);
      if (index !== -1) {
        state.reviews[index] = action.payload;
      }
    },
    deleteReview: (state, action) => {
      state.reviews = state.reviews.filter((r) => r.id !== action.payload);
    },
  },
});

export const { addReview, updateReview, deleteReview } = reviewsSlice.actions;
export default reviewsSlice.reducer;