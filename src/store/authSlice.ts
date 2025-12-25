import { api } from "@/api/initialize";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const registerActionUser = createAsyncThunk(
  "register/registerActionUser",
  async (data: any, thunkAPI) => {
    try {
      const response = await api.post("/registration", data);
      return response.data;
    } catch (error: any) {
      console.error("Register Error:", error);
      const message =
        error.response?.data?.message ||
        `Terjadi kesalahan: ${error.response?.status || "Server Error"}`;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const loginActionUser = createAsyncThunk(
  "auth/loginActionUser",
  async (data: any, thunkAPI) => {
    try {
      const response = await api.post("/login", data);
      return response.data;
    } catch (error: any) {
      console.error("Login Error:", error);
      const message =
        error.response?.data?.message ||
        `Terjadi kesalahan: ${error.response?.status || "Server Error"}`;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get profile dipindahkan ke profileSlice

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: "",
  token: localStorage.getItem("token") || null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = "";
    },
    logout: (state) => {
      state.token = null;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = "";
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerActionUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(registerActionUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.errorMessage = "";
      })
      .addCase(registerActionUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = action.payload as string;
      })

      // Login
      .addCase(loginActionUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(loginActionUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.errorMessage = "";

        // Simpan token
        const token = action.payload?.data?.token;
        if (token) {
          state.token = token;
          localStorage.setItem("token", token);
        }
      })
      .addCase(loginActionUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = action.payload as string;
      });
  },
});

export const { resetState, logout } = authSlice.actions;
export default authSlice.reducer;
