import * as types from './actionTypes';

const initialState = {
  items: [],
  items_about: {},
  items_card_about: {},
  loading: true,
  loading_card_about: true,
  error: null,
  items_enroll: {},
  items_offer_data: {},
  loading_offer: true
};

export default function programsReducer(state = initialState, { type, payload }) {
  switch (type) {
    case types.FETCH_PROGRAMS_SUCCESS:
      return {
        ...state,
        items: payload.data,
        loading: false
      };
    case types.FETCH_PROGRAM_ABOUT_SUCCESS:
      return {
        ...state,
        items_about: payload.data,
        loading: false
      };
    case types.FETCH_PROGRAM_ABOUT_LIST_SUCCESS:
      return {
        ...state,
        items_card_about: payload.data_list,
        loading_card_about: false
      };
    case types.FETCH_ENROLL_PROGRAMS_SUCCESS:
      return {
        ...state,
        items_enroll: payload.data_enroll
      };
    case types.FETCH_OFFER_SUCCESS:
      return {
        ...state,
        items_offer_data: payload.data_offer,
        loading_offer: false
      };
    default:
      return state;
  }
}

//selectors

export const fetchProgramSuccess = data => ({
  type: types.FETCH_PROGRAMS_SUCCESS,
  payload: { data }
});

export const fetchProgramAboutSuccess = data => ({
  type: types.FETCH_PROGRAM_ABOUT_SUCCESS,
  payload: { data }
});

export const fetchProgramAboutListSuccess = data_list => ({
  type: types.FETCH_PROGRAM_ABOUT_LIST_SUCCESS,
  payload: { data_list }
});

export const fetchEnrollProgramSuccess = data_enroll => ({
  type: types.FETCH_ENROLL_PROGRAMS_SUCCESS,
  payload: { data_enroll }
});

export const fetchOfferDataSuccess = data_offer => ({
  type: types.FETCH_OFFER_SUCCESS,
  payload: { data_offer }
});
