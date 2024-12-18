import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData) => {
    const response = await axios
      .post("http://localhost:5000/api/auth/register", formData, {
        withCredential: true
      })
      
    return response.data;
  }
);
export const loginUser = createAsyncThunk(
  "/auth/login",
  async (formData) => {
    const response = await axios
      .post("http://localhost:5000/api/auth/login", formData, {
        withCredential: true
      })
      
    return response.data;
  }
);
export const checkAuth = createAsyncThunk(
  "/auth/check-auth",
  async () => {
    const response = await axios
      .get("http://localhost:5000/api/auth/check-auth", {
        withCredential: true,
        headers: {
          "Cache-Control": "no-store, no-cache, must-validate, proxy-revalidate"
        },
       
      })
      
    return response.data;
  }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action)=>{},
    },
    extraReducers: (builder)=>{
        builder
        .addCase(registerUser.pending, (state)=>{
            state.isLoading = true
        }).addCase(registerUser.fulfilled, (state, action)=>{
            state.isLoading= false,
            state.isAuthenticated = false,
            state.user = null
        }).addCase(registerUser.rejected, (state, action)=>{
            state.isLoading = false,
            state.isAuthenticated = false,
            state.user = null
        })
        .addCase(loginUser.pending, (state)=>{
            state.isLoading = true
        }).addCase(loginUser.fulfilled, (state, action)=>{
            state.isLoading= false,
            state.isAuthenticated = action.payload.success
            state.user = action.payload.success? action.payload.user : null
        }).addCase(loginUser.rejected, (state, action)=>{
            state.isLoading = false,
            state.isAuthenticated = false,
            state.user = null
        })
    }
})



export const { setUser } = authSlice.actions;
export default authSlice.reducer;
