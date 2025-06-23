import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import openeduService from '../../services/openurfu';

const initialState = {
  items: [],
  items_about: {},
  items_card_about: {},
  items_enroll: {},
  items_offer: {},
  loading: true,
  loading_card_about: true,
  error: null,
};

// Async thunks
export const fetchPrograms = createAsyncThunk(
  'programs/fetchPrograms',
  async (_, { rejectWithValue }) => {
    try {
      const getPrograms = await openeduService.getProgramsAPI();
      return getPrograms;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAboutProgram = createAsyncThunk(
  'programs/fetchAboutProgram',
  async (program, { rejectWithValue }) => {
    try {
      const getAboutProgram = await openeduService.getAboutProgramItem(program);
      return getAboutProgram;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchEnrollProgram = createAsyncThunk(
  'programs/fetchEnrollProgram',
  async (program, { getState, rejectWithValue }) => {
    try {
      const isAuth = getState().user.isAuth;
      if (isAuth) {
        const getEnrollProgram = await openeduService.CheckEnrollProgramAPI(program);
        return getEnrollProgram;
      }
      return {};
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAboutProgramList = createAsyncThunk(
  'programs/fetchAboutProgramList',
  async (program, { rejectWithValue }) => {
    try {
      const getAboutProgramList = await openeduService.getAboutProgramList(program);
      return getAboutProgramList;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchOfferData = createAsyncThunk(
  'programs/fetchOfferData',
  async (program, { rejectWithValue }) => {
    try {
      const getOffer = await openeduService.getOffer(program);
      return getOffer;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const programsSlice = createSlice({
  name: 'programs',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchPrograms
      .addCase(fetchPrograms.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPrograms.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPrograms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // fetchAboutProgram
      .addCase(fetchAboutProgram.fulfilled, (state, action) => {
        state.items_about = action.payload;
      })
      .addCase(fetchAboutProgram.rejected, (state, action) => {
        state.error = action.payload;
      })
      
      // fetchEnrollProgram
      .addCase(fetchEnrollProgram.fulfilled, (state, action) => {
        state.items_enroll = action.payload;
      })
      
      // fetchAboutProgramList
      .addCase(fetchAboutProgramList.pending, (state) => {
        state.loading_card_about = true;
      })
      .addCase(fetchAboutProgramList.fulfilled, (state, action) => {
        state.loading_card_about = false;
        state.items_card_about = action.payload;
      })
      .addCase(fetchAboutProgramList.rejected, (state, action) => {
        state.loading_card_about = false;
        state.error = action.payload;
      })
      
      // fetchOfferData
      .addCase(fetchOfferData.fulfilled, (state, action) => {
        state.items_offer = action.payload;
      });
  },
});

export const { clearError } = programsSlice.actions;

export default programsSlice.reducer; 