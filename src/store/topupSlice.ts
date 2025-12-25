import { api } from "@/api/initialize";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const postTopupAction = createAsyncThunk(
  "topup/postTopupAction",
  async (amount: number, thunkAPI) => {
    try {
      const response = await api.post("/topup", { top_up_amount: amount });
      return response.data;
    } catch (error: any) {
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
};

const topupSlice = createSlice({
  name: "topup",
  initialState,
  reducers: {
    resetTopupState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postTopupAction.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(postTopupAction.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.errorMessage = "";
      })
      .addCase(postTopupAction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = action.payload as string;
      });
  },
});

export const { resetTopupState } = topupSlice.actions;
export default topupSlice.reducer;
