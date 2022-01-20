import openeduService from '../../services/openurfu';
import * as fetchSelectors from './reducer';

export function fetchProjects() {
  return async dispatch => {
    let getProjects = await openeduService.getProjectsAPI();
    dispatch(fetchSelectors.fetchProjectSuccess(getProjects));
  };
}

export function fetchAboutProject(project) {
  return async dispatch => {
    try {
      let getAboutProject = await openeduService.getAboutProjectsItem(project);
      dispatch(fetchSelectors.fetchProjectAboutSuccess(getAboutProject));
    } catch (error) {
      console.log(error);
    }
  };
}

export function fetchAboutProjectList(project) {
  return async dispatch => {
    try {
      let getAboutProjectList = await openeduService.getAboutProjectList(project);
      dispatch(fetchSelectors.fetchProjectAboutListSuccess(getAboutProjectList));
    } catch (error) {
      console.log(error);
    }
  };
}
