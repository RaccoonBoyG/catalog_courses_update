import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import openeduService from '../../services/openurfu';

const initialState = {
  items: {},
  loading: true,
  error: null,
};

// Async thunks
export const fetchAbout = createAsyncThunk(
  'courseAbout/fetchAbout',
  async ({ id, navigate }, { rejectWithValue }) => {
    try {
      const getAbout = await openeduService.getAboutItem(id);
      return getAbout;
    } catch (error) {
      if (navigate) {
        navigate("/404", { replace: true });
      }
      return rejectWithValue(error.message);
    }
  }
);

const courseAboutSlice = createSlice({
  name: 'courseAbout',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCourseAbout: (state) => {
      state.items = {};
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchAbout
      .addCase(fetchAbout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAbout.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAbout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearCourseAbout } = courseAboutSlice.actions;

export default courseAboutSlice.reducer; 