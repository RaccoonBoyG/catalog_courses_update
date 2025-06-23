import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import {
  fetchAboutProgram,
  fetchAboutProgramList,
  fetchEnrollProgram,
} from '../store/programs/programsSlice';
import 'animate.css/animate.min.css';
import AboutRender from '../containers/AboutRender';
import CourseListRender from '../containers/CourseListRender';
import scroll from './scroll';
import ButtonScrollToTop from '../containers/ButtonScrollToTop';
import { ObjectContent } from '../containers/Content';
import Spinner from '../containers/Spinner';
import { fetchUserState } from '../store/user/userSlice';

const ProgramAbout = () => {
  const dispatch = useDispatch();
  const { program } = useParams();
  const location = useLocation();

  const {
    data,
    loading,
    isAuth,
    data_enroll,
    loading_card_about,
    data_card,
  } = useSelector((state) => ({
    data: state.programs.items_about,
    data_card: state.programs.items_card_about,
    loading: state.programs.loading,
    loading_card_about: state.programs.loading_card_about,
    isAuth: state.user.isAuth,
    data_enroll: state.programs.items_enroll,
  }));

  useEffect(() => {
    const loadData = async () => {
      window.scrollTo(0, 0);
      await dispatch(fetchUserState());
      await dispatch(fetchAboutProgram(program));
      await dispatch(fetchEnrollProgram(program));
      await dispatch(fetchAboutProgramList(program));
      scroll();
    };

    loadData();
  }, [dispatch, program]);

  if (loading && loading_card_about) {
    return <Spinner />;
  }

  return (
    <React.Fragment>
      <AboutRender
        name={data.name}
        enrollment_allowed={data.enrollment_allowed}
        image_background={data.image_background}
        height={100}
        className={'top-txt-container-sub'}
        program_slug={program}
        search={location.search}
        isAuth={isAuth}
        data_enroll={data_enroll}
      />
      <div className="container text-custom-dark p-3 mb-3">
        <ObjectContent data_content={data.content} />
        <div className="text-custom-dark2 mt-3 p-5 shadow-sm bg-white">
          <h3>Онлайн-модуль</h3>
          <RenderCourseListProgram
            data_card={data_card}
            loading_card_about={loading_card_about}
          />
        </div>
      </div>
      <ButtonScrollToTop />
    </React.Fragment>
  );
};

const NoneCourseProgram = () => (
  <div style={{ height: '300px' }}>
    <h2>У данной программы пока нет курсов</h2>
  </div>
);

const withEither = (conditionalRenderingFn, EitherComponent) => (Component) => (props) =>
  conditionalRenderingFn(props) ? (
    <>
      <EitherComponent {...props} />
    </>
  ) : (
    <>
      <Component item={props.data_card.courses} />
    </>
  );

const isViewConditionFn = (props) => Object.keys(props.data_card).length === 0;

const withEditContionalRendering = withEither(isViewConditionFn, NoneCourseProgram);
const RenderCourseListProgram = withEditContionalRendering(CourseListRender);

export default ProgramAbout;
