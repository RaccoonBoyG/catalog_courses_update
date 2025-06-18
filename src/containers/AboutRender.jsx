// AboutRender.jsx
import React from 'react';
import HeaderTitle from './HeaderTitle';
import HeaderTitleProgram from './HeaderTitleProgram';

const withEither = (conditionalRenderingFn, EitherComponent) => (Component) => (props) =>
  conditionalRenderingFn(props) ? (
    <EitherComponent {...props} />
  ) : (
    <Component {...props} />
  );

const isViewConditionFn = (props) => props.modes_data === undefined;

const withEditConditionalRendering = withEither(isViewConditionFn, HeaderTitleProgram);
const AboutRender = withEditConditionalRendering(HeaderTitle);

export default AboutRender;
