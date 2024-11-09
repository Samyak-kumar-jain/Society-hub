import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  bulletinsBySociety: {}, // Store bulletins for each society by its ID
  error: null,
  loading: false,
  isMember: false,
};

export const societyBulletinsById = createAsyncThunk(
  'Societybulletin/getBulletin',
  async (societyID, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/api/user/student/societies/${societyID}/bulletins`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error("Failed to fetch society bulletins");
      }

      const result = await response.json();
      return { societyId: societyID, data: result }; // Return societyId along with bulletins
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const joinSociety = createAsyncThunk(
  'society/joinSociety',
  async (societyId, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/api/user/student/societies/${societyId}/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue({ message: 'Error joining society' });
    }
  }
);

export const leaveSociety = createAsyncThunk(
  'society/leaveSociety',
  async (societyId, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/api/user/student/societies/${societyId}/leave`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue({ message: 'Error leaving society' });
    }
  }
);

const societyBuletinSlice = createSlice({
  name: "eachBuletin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(societyBulletinsById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(societyBulletinsById.fulfilled, (state, action) => {
        state.loading = false;
        // Store bulletins for the specific societyId
        state.bulletinsBySociety[action.payload.societyId] = action.payload.data;
      })
      .addCase(societyBulletinsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data;
      })
      // Handle joinSociety
      .addCase(joinSociety.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(joinSociety.fulfilled, (state, action) => {
        state.loading = false;
        state.isMember = action.payload.success ? true : false;
      })
      .addCase(joinSociety.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data;
      })
      // Handle leaveSociety
      .addCase(leaveSociety.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(leaveSociety.fulfilled, (state) => {
        state.loading = false;
        state.isMember = false;
      })
      .addCase(leaveSociety.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data;
      });
  }
});

export default societyBuletinSlice.reducer;
