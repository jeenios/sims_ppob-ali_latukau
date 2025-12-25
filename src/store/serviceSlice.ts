import { api } from "@/api/initialize";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getServicesAction = createAsyncThunk(
  "service/getServicesAction",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/services");
      return response.data;
    } catch (error: any) {
      console.error("Get Services Error:", error);
      const message =
        error.response?.data?.message ||
        `Terjadi kesalahan: ${error.response?.status || "Server Error"}`;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: "",
  services: [],
};

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    resetServiceState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getServicesAction.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(getServicesAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.services = action.payload?.data || [];
      })
      .addCase(getServicesAction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = action.payload as string;
      });
  },
});

export const { resetServiceState } = serviceSlice.actions;
export default serviceSlice.reducer;
