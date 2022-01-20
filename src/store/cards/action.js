import openeduService from "../../services/openurfu";
import * as fetchSelectors from "../cards/reducer";

export function fetchCards() {
  return async dispatch => {
    dispatch(fetchSelectors.fetchCardsStart());
    try {
      let getCard = await openeduService.getCardAPI();
      let getNextPage = await openeduService.getNextPageAPI();
      dispatch(fetchSelectors.fetchCardsSuccess(getCard));
      if (getNextPage === null) {
        // dispatch(fetchSelectors.LoadMoreDataHideButton());
      }
    } catch (error) {
      dispatch(fetchSelectors.fetchCardsFailure(error));
      console.log(error);
    }
  };
}

export const fetchCardsAll = () => {
  return async dispatch => {
    let getAllCard = await openeduService.getAllCardApi();
    dispatch(fetchSelectors.fetchCardsAllSuccess(getAllCard));
  };
};

export function LoadMoreTest() {
  return async (dispatch, getState) => {
    const page = fetchSelectors.LoadMoreDataPage(getState());
    const length = fetchSelectors.LoadMoreDataLength(getState()) + 10;
    dispatch(fetchSelectors.LoadMoreDataStart());
    let getBodySize = await openeduService.getCardBodySizeCheck();
    let getCard = await openeduService.getCardLoadMoreAPI({ page });

    if (length <= getBodySize) {
      try {
        dispatch(fetchSelectors.LoadMoreDataSuccess(getCard));
      } catch (error) {
        dispatch(fetchSelectors.LoadMoreDataFailure(error));
        console.log(error);
      }
    } else {
      dispatch(fetchSelectors.LoadMoreDataSuccess(getCard));
      // dispatch(fetchSelectors.LoadMoreDataHideButton());
    }
  };
}

// export function LoadMore(){
//   return dispatch => {
//     dispatch(fetchSelectors.LoadMoreData())
//   }
// }

export function searchInput(value) {
  return dispatch => {
    dispatch(fetchSelectors.searchInputData(value));
    // dispatch(fetchSelectors.LoadMoreDataHideButton());
    // fetchSelectors.searchInputDataFilter(getState(),value)
  };
}

export const resetSearch = () => {
  return dispatch => {
    dispatch(fetchSelectors.resetSearchInputData());
  };
};

// export function chooseViewCard(){
//   return dispatch => {
//     dispatch(fetchSelectors.chooseViewDataCard())
//   }
// }

// export function chooseViewList(){
//   return dispatch => {
//     dispatch(fetchSelectors.chooseViewDataList())
//   }
// }
