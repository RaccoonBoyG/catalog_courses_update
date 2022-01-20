import openeduService from '../../services/openurfu';
import * as fetchSelectors from '../user/reducer';

export function fetchUserState() {
  return async (dispatch) => {
    let checkSessionID = await openeduService.checkSession();
    dispatch(fetchSelectors.fetchUserStart());
    if (checkSessionID) {
      try {
        let getUser = await openeduService.CheckAuthAPI();
        // let getCourseEnroll = await openeduService.CheckEnrollCourseAPI()
        // console.log(getUser, getCourseEnroll);
        dispatch(fetchSelectors.fetchUserSuccess(getUser));
        // dispatch(fetchSelectors.fetchCourseEnroll(getCourseEnroll))
      } catch (error) {
        dispatch(fetchSelectors.fetchUserFailure(error));
        console.log(error);
      }
    } else {
      dispatch(fetchSelectors.UserUnAuth());
    }
  };
}

export function fetchEnrollState() {
  return async (dispatch, getState) => {
    fetchUserState();
    getState();

    // let responseStatus = await openeduSerice.ResponseStatusAPI();
    let checkSessionID = await openeduService.checkSession();
    if (checkSessionID) {
      // let getUser = await openeduService.CheckAuthAPI();
      let getCourseEnroll = await openeduService.CheckEnrollCourseAPI(getState().user.items_user[0].username, getState().course_about.items.id);
      let filterCourseEnroll = getCourseEnroll.some((item) => {
        return item.is_active;
      });

      dispatch(fetchSelectors.fetchCourseEnroll(filterCourseEnroll, getCourseEnroll));
    } else {
      dispatch(fetchSelectors.UserUnAuth());
    }
  };
}

export function clearLoadingUser() {
  return async (dispatch) => {
    dispatch(fetchSelectors.clearLoadingUserSelector());
  };
}
