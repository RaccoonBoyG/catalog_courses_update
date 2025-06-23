import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import openeduService from '../../services/openurfu';

const initialState = {
  items_user: [],
  items_user_enroll: [],
  loading: true,
  error: null,
  isAuth: false,
};

// Async thunks
export const fetchUserState = createAsyncThunk(
  'user/fetchUserState',
  async (_, { rejectWithValue }) => {
    try {
      const checkSessionID = await openeduService.checkSession();
      
      if (checkSessionID) {
        const getUser = await openeduService.CheckAuthAPI();
        return { user: getUser, isAuth: true };
      } else {
        return { user: [], isAuth: false };
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchEnrollState = createAsyncThunk(
  'user/fetchEnrollState',
  async (_, { getState, rejectWithValue }) => {
    try {
      const checkSessionID = await openeduService.checkSession();
      
      if (checkSessionID) {
        const state = getState();
        const username = state.user.items_user[0]?.username;
        const courseId = state.course_about.items.id;
        
        if (username && courseId) {
          const getCourseEnroll = await openeduService.CheckEnrollCourseAPI(username, courseId);
          const filterCourseEnroll = getCourseEnroll.some(item => item.is_active);
          
          return { filterCourseEnroll, getCourseEnroll };
        }
      }
      
      return { filterCourseEnroll: false, getCourseEnroll: [] };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearLoading: (state) => {
      state.loading = false;
    },
    userUnAuth: (state) => {
      state.isAuth = false;
      state.items_user = [];
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchUserState
      .addCase(fetchUserState.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserState.fulfilled, (state, action) => {
        const { user, isAuth } = action.payload;
        state.loading = false;
        state.items_user = user;
        state.isAuth = isAuth;
      })
      .addCase(fetchUserState.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuth = false;
      })
      
      // fetchEnrollState
      .addCase(fetchEnrollState.fulfilled, (state, action) => {
        const { filterCourseEnroll, getCourseEnroll } = action.payload;
        state.items_user_enroll = getCourseEnroll;
        // Additional logic can be added here for enrollment state
      })
      .addCase(fetchEnrollState.rejected, (state, action) => {
        state.error = action.payload;
        state.isAuth = false;
      });
  },
});

export const { clearLoading, userUnAuth } = userSlice.actions;

export default userSlice.reducer; 