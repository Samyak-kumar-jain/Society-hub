import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  societyList: [],
  admin:[],
};

// Async thunk to fetch societies created by the logged-in admin

export const fetchAdminSocieties = createAsyncThunk(
  "/Society/fetchAdminSocieties",
  async () => { // Accept the token as a parameter
    const response = await fetch(
      "http://localhost:5000/api/admin/societies/admin-societies", // Adjust the URL if needed
      {
        method: 'GET',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch societies");
    }
    
    const result = await response.json();
    console.log(result)
    return result; // Adjust based on your API response structure
  }
);


export const addNewSociety = createAsyncThunk(
  "/Society/addnewSociety",
  async (formData) => {
    const response = await fetch(
      "http://localhost:5000/api/admin/societies/add",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    const result = await response.json();
    console.log(result);

    return result;
  }
);

export const fetchAllSociety = createAsyncThunk(
  "/Society/fetchAllSociety",
  async () => {
    const response = await fetch(
      "http://localhost:5000/api/admin/societies/get-All-Society"
    );
    const result = await response.json();
    console.log("fetch" , result)
    return result;
  }
);

export const editSociety = createAsyncThunk(
  "/Society/editSociety",
  async ({ id, formData }) => {
    const response = await fetch(
      `http://localhost:5000/api/admin/societies/edit/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    const result = await response.json();
    return result;
  }
);

export const deleteSociety = createAsyncThunk(
  "/Society/deleteSociety",
  async (id) => {
    const response = await fetch(
      `http://localhost:5000/api/admin/societies/delete/${id}`,
      {
        method: "DELETE",
      }
    );
    const result = await response.json();
    console.log("delete",result)
    return result;
  }
);

const AdminSocietySlice = createSlice({
  name: "adminSociety",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminSocieties.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAdminSocieties.fulfilled, (state, action) => {
        state.isLoading = false;
        state.admin = action.payload.data; // Adjust based on the actual response structure
      })
      .addCase(fetchAdminSocieties.rejected, (state) => {
        state.isLoading = false;
        state.admin = [];
      })
      .addCase(fetchAllSociety.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllSociety.fulfilled, (state, action) => {
        state.isLoading = false;
        state.societyList = action.payload.data; // Adjust based on the actual response structure
      })
      .addCase(fetchAllSociety.rejected, (state) => {
        state.isLoading = false;
        state.societyList = [];
      });
  },
});

export default AdminSocietySlice.reducer;
