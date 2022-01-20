import * as types from "./actionTypes";

const initialState = {
  items: [],
  items_about: {},
  items_card_about: {},
  loading: true,
  error: null
};

export default function projectsReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case types.FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        items: payload.data,
        loading: false
      };

    case types.FETCH_PROJECT_ABOUT_SUCCESS:
      return {
        ...state,
        items_about: payload.data
      };

    case types.FETCH_PROJECT_ABOUT_LIST_SUCCESS:
      return {
        ...state,
        items_card_about: payload.data_list
      };

    default:
      return state;
  }
}

//selectors

export const fetchProjectSuccess = data => ({
  type: types.FETCH_PROJECTS_SUCCESS,
  payload: { data }
});

export const fetchProjectAboutSuccess = data => ({
  type: types.FETCH_PROJECT_ABOUT_SUCCESS,
  payload: { data }
});

export const fetchProjectAboutListSuccess = data_list => ({
  type: types.FETCH_PROJECT_ABOUT_LIST_SUCCESS,
  payload: { data_list }
});
