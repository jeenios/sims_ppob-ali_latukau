import { api } from "@/api/initialize";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getBalanceAction = createAsyncThunk(
  "transaction/getBalanceAction",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/balance");
      return response.data;
    } catch (error: any) {
      console.error("Get Balance Error:", error);
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
  balance: 0,
};

const balanceSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    resetTransactionState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Balance
      .addCase(getBalanceAction.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(getBalanceAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.balance = action.payload?.data?.balance || 0;
      })
      .addCase(getBalanceAction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = action.payload as string;
      });
  },
});

export const { resetTransactionState } = balanceSlice.actions;
export default balanceSlice.reducer;
