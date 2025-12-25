import { api } from "@/api/initialize";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getHistoryAction = createAsyncThunk(
  "history/getHistoryAction",
  async (
    { limit = 5, offset = 0 }: { limit?: number; offset?: number },
    thunkAPI
  ) => {
    try {
      const response = await api.get("/transaction/history", {
        params: { limit, offset },
      });
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
  items: [] as any[],
  limit: 5,
  offset: 0,
  hasMore: true,
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    resetHistoryState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = "";
      state.items = [];
      state.offset = 0;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHistoryAction.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(getHistoryAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        const arg = action.meta.arg as { limit?: number; offset?: number };
        const data = action.payload?.data;
        const payloadItems = Array.isArray(data)
          ? data
          : Array.isArray(data?.records)
          ? data.records
          : Array.isArray(action.payload)
          ? action.payload
          : [];
        state.limit = arg?.limit ?? state.limit;
        state.offset = arg?.offset ?? state.offset;
        if ((arg?.offset ?? 0) === 0) {
          state.items = payloadItems;
        } else {
          state.items = [...state.items, ...payloadItems];
        }
        state.hasMore =
          Array.isArray(payloadItems) && payloadItems.length >= state.limit;
      })
      .addCase(getHistoryAction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = action.payload as string;
      });
  },
});

export const { resetHistoryState } = historySlice.actions;
export default historySlice.reducer;
