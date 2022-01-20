import * as types from "./actionTypes";

const initialState = {
  items: [],
  items_about: {},
  items_card_about: {},
  loading: true,
  error: null
};

export default function organizationsReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case types.FETCH_ORG_SUCCESS:
      return {
        ...state,
        items: payload.data,
        loading: false
      };

    case types.FETCH_ORG_ABOUT_SUCCESS:
      return {
        ...state,
        items_about: payload.data_about
      };

    case types.FETCH_ORG_ABOUT_LIST_SUCCESS:
      return {
        ...state,
        items_card_about: payload.data_list
      };

    default:
      return state;
  }
}

//selectors

export const fetchOrgSuccess = data => ({
  type: types.FETCH_ORG_SUCCESS,
  payload: { data }
});

export const fetchOrganizationAboutSuccess = data_about => ({
  type: types.FETCH_ORG_ABOUT_SUCCESS,
  payload: { data_about }
});

export const fetchOrganizationAboutList = data_list => ({
  type: types.FETCH_ORG_ABOUT_LIST_SUCCESS,
  payload: { data_list }
});
