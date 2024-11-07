// src/redux/slices/bulletinSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    bulletins: [],
    loading: false,
    error: null,
};

// Async thunk for fetching bulletins
export const fetchUserBulletins = createAsyncThunk(
    'bulletin/fetchUserBulletins',
    async (_, thunkAPI) => {
        const response = await fetch('http://localhost:5000/api/admin/bulletin/get-All-bulletins', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',  // Include credentials
        });
        if (!response.ok) {
            const error = await response.json();
            return thunkAPI.rejectWithValue(error.message);
        }
        const result = await response.json();
        console.log(result)
        return result;
    }
);

// Async thunk for adding a bulletin
export const addBulletin = createAsyncThunk(
    'bulletin/addBulletin',
    async (bulletinData, thunkAPI) => {
        const response = await fetch('http://localhost:5000/api/admin/bulletin/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bulletinData),
            credentials: 'include',  // Include credentials
        });
        if (!response.ok) {
            const error = await response.json();
            return thunkAPI.rejectWithValue(error.message);
        }
        const result = await response.json();
        console.log(result)
        return result;
    }
);

// Async thunk for updating a bulletin
export const updateBulletin = createAsyncThunk(
    'bulletin/updateBulletin',
    async ({ bulletinId, bulletinData }, thunkAPI) => {
        const response = await fetch(`http://localhost:5000/api/admin/bulletin/edit/${bulletinId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bulletinData),
            credentials: 'include',  // Include credentials
        });
        if (!response.ok) {
            const error = await response.json();
            return thunkAPI.rejectWithValue(error.message);
        }
        return await response.json();
    }
);

// Async thunk for deleting a bulletin
export const deleteBulletin = createAsyncThunk(
    'bulletin/deleteBulletin',
    async ({bulletinId}, thunkAPI) => {
        const response = await fetch(`http://localhost:5000/api/admin/bulletin/delete/${bulletinId}`, {
            method: 'DELETE',
            credentials: 'include',  // Include credentials
        });
        if (!response.ok) {
            const error = await response.json();
            return thunkAPI.rejectWithValue(error.message);
        }
        return await response.json();
    }
);

// Create the bulletin slice
const bulletinSlice = createSlice({
    name: 'bulletin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserBulletins.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserBulletins.fulfilled, (state, action) => {
                state.loading = false;
                
                state.bulletins = action.payload.data;
            })
            .addCase(fetchUserBulletins.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addBulletin.pending, (state) => {
                state.loading = true;
               
            })
            .addCase(addBulletin.fulfilled, (state, action) => {
                state.loading = false;
               
            })
            .addCase(addBulletin.rejected, (state, action) => {
                state.loading = false;
                
            })
           
           
    },
});

// Export the actions if any (none in this case)
// export const { } = bulletinSlice.actions;

// Export the reducer
export default bulletinSlice.reducer;
