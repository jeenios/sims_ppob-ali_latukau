import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "@/api/initialize";

export const getBannerAction = createAsyncThunk(
  "banner/getBannerAction",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/banner");
      return response.data;
    } catch (error: any) {
      console.error("Get Banner Error:", error);
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
  banners: [],
};

const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    resetBannerState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = "";
      state.banners = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBannerAction.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getBannerAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.banners = action.payload?.data || [];
      })
      .addCase(getBannerAction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = action.payload as string;
      });
  },
});

export const { resetBannerState } = bannerSlice.actions;
export default bannerSlice.reducer;
