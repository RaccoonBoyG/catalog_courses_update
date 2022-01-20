import React from 'react';

// import HeaderBackground from "../containers/HeaderBackground";
import HeaderTitle from '../containers/HeaderTitle';
import HeaderTitleProgram from '../containers/HeaderTitleProgram';

// 'top-txt-container'

const withEither = (conditionalRenderingFn, EitherComponent) => Component => props => {
  return conditionalRenderingFn(props) ? (
    <>
      {/* HeaderTitleProgram  */}
      <EitherComponent
        title={props.name}
        class={props.class}
        description={props.description}
        isAuth={props.isAuth}
        program_slug={props.program_slug}
        data_enroll={props.data_enroll}
        enrollment_allowed={props.enrollment_allowed}
      />
    </>
  ) : (
    <>
      {/* HeaderTitle */}
      <Component
        title={props.name}
        class={props.class}
        invitation_only={props.invitation_only}
        description={props.description}
        isAuth={props.isAuth}
        course_enroll_user={props.course_enroll_user}
        params={props.params}
        modes_data={props.modes_data}
        program_slug={props.program_slug}
        changeEnroll={props.changeEnroll}
      />
    </>
  );
};

const isViewConditionFn = props => props.modes_data === undefined;

const withEditContionalRendering = withEither(isViewConditionFn, HeaderTitleProgram);
const AboutRender = withEditContionalRendering(HeaderTitle);

export default AboutRender;
