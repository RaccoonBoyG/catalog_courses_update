import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import openeduService from '../../services/openurfu';

const initialState = {
  items: [],
  item_all: [],
  num_obj: 10,
  input: '',
  err: null,
  page: 2,
  loading: true,
  filter_data: []
};

// Async thunks
export const fetchCards = createAsyncThunk(
  'cards/fetchCards',
  async (_, { rejectWithValue }) => {
    try {
      const getCard = await openeduService.getCardAPI();
      const getNextPage = await openeduService.getNextPageAPI();
      return { cards: getCard, hasNextPage: getNextPage !== null };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCardsAll = createAsyncThunk(
  'cards/fetchCardsAll',
  async (_, { rejectWithValue }) => {
    try {
      const getAllCard = await openeduService.getAllCardApi();
      return getAllCard;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loadMoreCards = createAsyncThunk(
  'cards/loadMoreCards',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState().cards;
      const page = state.page;
      const length = state.items.length + 10;
      
      const getBodySize = await openeduService.getCardBodySizeCheck();
      const getCard = await openeduService.getCardLoadMoreAPI({ page });
      
      return { cards: getCard, length, getBodySize };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    searchInput: (state, action) => {
      const input = action.payload;
      const filter = state.item_all.filter(val => 
        input.length === 0 ? true : val.name.toLowerCase().includes(input.toLowerCase())
      );
      
      state.input = input;
      state.items = filter;
      state.filter_data = filter;
    },
    resetSearch: (state) => {
      state.items = state.item_all;
      state.input = '';
      state.filter_data = state.item_all;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchCards
      .addCase(fetchCards.pending, (state) => {
        state.loading = true;
        state.page = 2;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.cards;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.loading = false;
        state.err = action.payload;
      })
      
      // fetchCardsAll
      .addCase(fetchCardsAll.fulfilled, (state, action) => {
        state.item_all = action.payload;
        state.loading = false;
        state.filter_data = action.payload;
      })
      
      // loadMoreCards
      .addCase(loadMoreCards.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadMoreCards.fulfilled, (state, action) => {
        const { cards, length, getBodySize } = action.payload;
        state.items = state.items.concat(cards);
        state.page = state.page + 1;
        state.loading = false;
      })
      .addCase(loadMoreCards.rejected, (state, action) => {
        state.loading = false;
        state.err = action.payload;
      });
  },
});

export const { searchInput, resetSearch } = cardsSlice.actions;

// Selectors
export const selectLoadMoreDataPage = (state) => state.cards.page;
export const selectLoadMoreDataLength = (state) => state.cards.items.length;

export default cardsSlice.reducer; 