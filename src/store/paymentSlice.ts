import { api } from "@/api/initialize";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const postTransactionAction = createAsyncThunk(
  "payment/postTransactionAction",
  async (service_code: string, thunkAPI) => {
    try {
      const response = await api.post("/transaction", { service_code });
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

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    resetPaymentState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postTransactionAction.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(postTransactionAction.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.errorMessage = "";
      })
      .addCase(postTransactionAction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = action.payload as string;
      });
  },
});

export const { resetPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;

