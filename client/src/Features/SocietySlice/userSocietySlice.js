import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch society by ID
export const getSocietyByID = createAsyncThunk(
  "society/fetchSocietyByID",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/user/student/societies/${id}`,
        {
          method: 'GET',
          credentials: "include",
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch society");
      }

      const result = await response.json();
      console.log(result)
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSocietySlice = createSlice({
  name: 'society',
  initialState: {
    societyData: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSocietyData: (state) => {
      state.societyData = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSocietyByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSocietyByID.fulfilled, (state, action) => {
        state.loading = false;
        state.societyData = action.payload.data;
      })
      .addCase(getSocietyByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
      });
  },
});

export const { clearSocietyData } = userSocietySlice.actions;
export default userSocietySlice.reducer;
