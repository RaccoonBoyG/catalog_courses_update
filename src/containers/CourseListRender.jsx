import React from "react";
import CourseCardOrg from "../components/CourseCardOrg";

const CourseListRender = props => {
  return props.item.map((e, key) => <CourseCardOrg item={e} key={key} />);
};

export default CourseListRender;
