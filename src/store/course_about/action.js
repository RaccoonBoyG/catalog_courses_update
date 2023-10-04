import openeduService from "../../services/openurfu";
import * as fetchSelectors from "../course_about/reducer";
import { useNavigate } from "react-router-dom";

// import { browserHistory } from 'react-router'

export function fetchAbout(id, nav) {
  return async dispatch => {

    try {
      let getAbout = await openeduService.getAboutItem(id);
      dispatch(fetchSelectors.fetchAboutSuccess(getAbout));
    } catch (error) {
      nav("/404", { replace: true })
    }
  };
}
