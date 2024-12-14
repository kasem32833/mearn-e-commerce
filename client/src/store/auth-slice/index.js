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
      .post("http://localhost:5000/api/auth", formData, {
        withCredential: true
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
        
    }
})



export const { setUser } = authSlice.actions;
export default authSlice.reducer;
