import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const verifyAuth = createAsyncThunk(
  "auth/verifyAuth",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Starting verifyAuth  -  /verify-token");
      const response = await axios.get(
        "http://localhost:5000/api/auth/verify-token",
        {
          withCredentials: true,
          timeout: 5000,
        }
      );
      console.log("Full verify-token response:", response.data);
      if (response.data.message === "Token is valid") {
        return { isValid: true, user: response.data.user || {} };
      } else {
        throw new Error(
          `Unexpected response: ${JSON.stringify(response.data)}`
        );
      }
    } catch (error) {
      console.error("Token verification failed:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });

      if (error.response?.status === 401) {
        console.log("Attempting token refresh due to 401...");
        try {
          const refreshResponse = await axios.post(
            "http://localhost:5000/api/auth/refresh-token",
            {},
            { withCredentials: true }
          );
          console.log("Refresh token response:", refreshResponse.data);
          if (refreshResponse.data.message === "Token refreshed successfully") {
            const retryResponse = await axios.get(
              "http://localhost:5000/api/auth/verify-token",
              { withCredentials: true }
            );
            if (retryResponse.data.message === "Token is valid") {
              return { isValid: true, user: retryResponse.data.user || {} };
            }
          }
        } catch (refreshError) {
          console.error("Refresh token failed:", refreshError.message);
          throw new Error(
            refreshError.response?.data?.message || "Refresh token failed"
          );
        }
      }
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Token verification failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    isLoading: true,
    error: null,
    user: null,
    tripCount: 0,
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(verifyAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.error.message;
      });
  },
});

export const { logout, resetLoading } = authSlice.actions;
export default authSlice.reducer;
