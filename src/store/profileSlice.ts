import { api } from "@/api/initialize";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getProfileAction = createAsyncThunk(
  "profile/getProfileAction",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/profile");
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        `Terjadi kesalahan: ${error.response?.status || "Server Error"}`;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateProfileAction = createAsyncThunk(
  "profile/updateProfileAction",
  async (
    data: { email?: string; first_name?: string; last_name?: string },
    thunkAPI
  ) => {
    try {
      const response = await api.put("/profile/update", data);
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        `Terjadi kesalahan: ${error.response?.status || "Server Error"}`;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateProfileImageAction = createAsyncThunk(
  "profile/updateProfileImageAction",
  async (file: File, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await api.put("/profile/image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
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
  user: null as any,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    resetProfileState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = "";
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfileAction.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(getProfileAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.user = action.payload?.data ?? action.payload ?? null;
      })
      .addCase(getProfileAction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = action.payload as string;
      })
      .addCase(updateProfileAction.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(updateProfileAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.errorMessage = "";
        if (state.user && action.payload?.data) {
          state.user = { ...state.user, ...action.payload.data };
        }
      })
      .addCase(updateProfileAction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = action.payload as string;
      })
      .addCase(updateProfileImageAction.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(updateProfileImageAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.errorMessage = "";
        if (state.user && action.payload?.data?.profile_image) {
          state.user = {
            ...state.user,
            profile_image: action.payload.data.profile_image,
          };
        }
      })
      .addCase(updateProfileImageAction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = action.payload as string;
      });
  },
});

export const { resetProfileState } = profileSlice.actions;
export default profileSlice.reducer;
