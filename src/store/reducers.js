import { combineReducers } from "redux";
import cards from "./cards/reducer";
import course_about from "./course_about/reducer";
// import program_about from "./program_about/reducer";
import programs from "./programs/reducer";
import projects from "./projects/reducer";
import organizations from "./organizations/reducer";
import user from "./user/reducer";
import { routerReducer } from "react-router-redux";

export default combineReducers({
  routing: routerReducer,
  organizations,
  programs,
  projects,
  cards,
  course_about,
  // program_about,
  user
});
