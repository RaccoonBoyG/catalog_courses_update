import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import openeduService from '../../services/openurfu';

const initialState = {
  items: [],
  items_about: {},
  items_card_about: {},
  loading: true,
  error: null,
};

// Async thunks
export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (_, { rejectWithValue }) => {
    try {
      const getProjects = await openeduService.getProjectsAPI();
      return getProjects;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAboutProject = createAsyncThunk(
  'projects/fetchAboutProject',
  async (project, { rejectWithValue }) => {
    try {
      const getAboutProject = await openeduService.getAboutProjectsItem(project);
      return getAboutProject;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAboutProjectList = createAsyncThunk(
  'projects/fetchAboutProjectList',
  async (project, { rejectWithValue }) => {
    try {
      const getAboutProjectList = await openeduService.getAboutProjectList(project);
      return getAboutProjectList;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchProjects
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // fetchAboutProject
      .addCase(fetchAboutProject.fulfilled, (state, action) => {
        state.items_about = action.payload;
      })
      .addCase(fetchAboutProject.rejected, (state, action) => {
        state.error = action.payload;
      })
      
      // fetchAboutProjectList
      .addCase(fetchAboutProjectList.fulfilled, (state, action) => {
        state.items_card_about = action.payload;
      })
      .addCase(fetchAboutProjectList.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearError } = projectsSlice.actions;

export default projectsSlice.reducer; 