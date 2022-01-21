import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAboutProgram, fetchAboutProgramList, fetchEnrollProgram } from '../store/programs/action';
import 'animate.css/animate.min.css';
import AboutRender from '../containers/AboutRender';
import CourseListRender from '../containers/CourseListRender';
import scroll from './scroll';
import ButtonScrollToTop from '../containers/ButtonScrollToTop';
import { ObjectContent } from '../containers/Content';
import Spinner from '../containers/Spinner';
import withRouter from '../utils/withRouter';
import { fetchUserState } from '../store/user/action';

class ProgramAbout extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     data_local: []
  //   };
  // }

  async componentDidMount() {
    window.scrollTo(0, 0);
    await this.props.fetchUserState();
    await this.props.fetchAboutProgram(this.props.params.program);
    await this.props.fetchEnrollProgram(this.props.params.program);
    await this.props.fetchAboutProgramList(this.props.params.program);
    // this.setState(prevState => ({
    //   ...prevState,
    //   data_local: this.props.data_card.courses
    // }));
    scroll();
  }

  render() {
    const { data, loading, isAuth, location, data_enroll, loading_card_about, data_card } = this.props;
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
          class={'top-txt-container-sub'}
          program_slug={this.props.params.program}
          search={location.search}
          isAuth={isAuth}
          data_enroll={data_enroll}
        />
        <div className="container text-custom-dark p-3 mb-3">
          <ObjectContent data_content={data.content} />
          <div className="text-custom-dark2 mt-3 p-5 shadow-sm bg-white">
            <h3>Онлайн-модуль</h3>
            <RenderCourseListProgram data_card={data_card} loading_card_about={loading_card_about} />
          </div>
        </div>
        <ButtonScrollToTop />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  data: state.programs.items_about,
  data_card: state.programs.items_card_about,
  loading: state.programs.loading,
  loading_card_about: state.programs.loading_card_about,
  isAuth: state.user.isAuth,
  data_enroll: state.programs.items_enroll
});

const mapDispatchToProps = {
  fetchAboutProgram,
  fetchAboutProgramList,
  fetchEnrollProgram,
  fetchUserState
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProgramAbout)
);

const NoneCourseProgram = () => (
  <div style={{ height: '300px' }}>
    <h2>У данной программы пока нет курсов</h2>
  </div>
);

const withEither = (conditionalRenderingFn, EitherComponent) => Component => props =>
  conditionalRenderingFn(props) ? (
    <>
      <EitherComponent {...props} />
    </>
  ) : (
    <>
      <Component item={props.data_card.courses} />
    </>
  );

const isViewConditionFn = props => Object.keys(props.data_card).length === 0;

const withEditContionalRendering = withEither(isViewConditionFn, NoneCourseProgram);
const RenderCourseListProgram = withEditContionalRendering(CourseListRender);
