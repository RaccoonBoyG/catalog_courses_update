import { combineReducers } from "@reduxjs/toolkit";
import cardsReducer from "./cards/cardsSlice";
import courseAboutReducer from "./course_about/courseAboutSlice";
import programsReducer from "./programs/programsSlice";
import projectsReducer from "./projects/projectsSlice";
import organizationsReducer from "./organizations/organizationsSlice";
import userReducer from "./user/userSlice";

export default combineReducers({
  organizations: organizationsReducer,
  programs: programsReducer,
  projects: projectsReducer,
  cards: cardsReducer,
  course_about: courseAboutReducer,
  user: userReducer
});
