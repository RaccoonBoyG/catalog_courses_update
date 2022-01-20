import * as types from "./actionTypes";

const initialState = {
  items: [],
  loading: true,
  error: null
};

export default function aboutsReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_ABOUT_SUCCESS:
      return {
        ...state,
        items: action.payload.data,
        loading: false
      };
    case types.FETCH_ABOUT_START:
      return {
        ...state
      };

    case types.FETCH_ABOUT_FAILURE:
      return {
        ...state,
        error: true
      };

    default:
      return state;
  }
}

//selectors

export const fetchAboutSuccess = data => ({
  type: types.FETCH_ABOUT_SUCCESS,
  payload: { data }
});

export const fetchCardsFailure = () => ({
  type: types.FETCH_ABOUT_FAILURE
});

export const fetchCardsStart = () => ({
  type: types.FETCH_ABOUT_START
});
