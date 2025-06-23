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
export const fetchOrganizations = createAsyncThunk(
  'organizations/fetchOrganizations',
  async (_, { rejectWithValue }) => {
    try {
      const getOrg = await openeduService.getOrgAPI();
      return getOrg;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAboutOrganization = createAsyncThunk(
  'organizations/fetchAboutOrganization',
  async (organizations, { rejectWithValue }) => {
    try {
      const getAboutProgram = await openeduService.getAboutOrgItem(organizations);
      return getAboutProgram;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAboutOrganizationList = createAsyncThunk(
  'organizations/fetchAboutOrganizationList',
  async (slug, { rejectWithValue }) => {
    try {
      const getAboutProgramList = await openeduService.getAboutOrgList(slug);
      return getAboutProgramList;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const organizationsSlice = createSlice({
  name: 'organizations',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchOrganizations
      .addCase(fetchOrganizations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrganizations.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchOrganizations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // fetchAboutOrganization
      .addCase(fetchAboutOrganization.fulfilled, (state, action) => {
        state.items_about = action.payload;
      })
      .addCase(fetchAboutOrganization.rejected, (state, action) => {
        state.error = action.payload;
      })
      
      // fetchAboutOrganizationList
      .addCase(fetchAboutOrganizationList.fulfilled, (state, action) => {
        state.items_card_about = action.payload;
      })
      .addCase(fetchAboutOrganizationList.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearError } = organizationsSlice.actions;

export default organizationsSlice.reducer; 