import React, { Component } from 'react';
import ReactDOM from 'react';
import { connect } from 'react-redux';
// import { fetchPrograms, fetchAboutProgram } from '../store/programs/action';
import { fetchProjects } from '../store/projects/action';
import { fetchPrograms, fetchAboutProgram } from '../store/programs/action';
import 'animate.css/animate.min.css';
import withRouter from '../utils/withRouter';

// import Header from './Header';
// import ListCard from '../containers/ListCard';
import scroll from './scroll';
import ButtonScrollToTop from '../containers/ButtonScrollToTop';
import ListCard from '../containers/ListCard';
import { ArrayContent } from '../containers/Content';
import Spinner from '../containers/Spinner';
import Courses from "./Courses";

class ProjectsAbout extends Component {
  constructor(props) {
    super(props);

    this.postIdAPI = this.postIdAPI.bind(this);
  }

  async componentDidMount() {
    await this.props.fetchPrograms();
    await this.props.fetchProjects();
    scroll();
  }

  postIdAPI(id) {
    this.props.fetchAboutProgram(id);
  }

  render() {
    const { loading, data, data_programs, loading_programs } = this.props;
    if (loading && loading_programs) {
      return <Spinner />;
    }
   data.map(i => {
    if (i.slug_project === this.props.location.pathname.replace('/projects/', '')){
      if (i.hide_menu) {
        let menu = document.getElementsByClassName('navbar');
        menu[0].setAttribute("style", "display:none;")
      }
      else {
        let menu = document.getElementsByClassName('navbar');
        menu[0].setAttribute("style", "display:flex;")
      }
    }
   })
    return (
      <>
        {data.map(item => {
          if (item.slug_project === this.props.location.pathname.replace('/projects/', '')) {
            return (
              <React.Fragment key={item.name + item.slug_project}>
                <div className="d-flex flex-row backImgCourse margin-custom-catalog">
                  <div className={`container container-course_about p-custom-2 pb-4 pl-2 d-flex flex-column text-light animated fadeIn faster mb-3`}>
                    <div className=" d-flex title_catalog align-items-start justify-content-start " style={{ textAlign: 'left' }}>
                      <h2 className="d-flex align-items-start justify-content-start">{item.name}</h2>
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-column margin-custom-catalog container">
                  {item.content.map((i, key) => {
                    return (
                      <div className="text-custom-dark2 m-3 p-5 shadow-sm bg-white" key={key} dangerouslySetInnerHTML={{ __html: i.content }}></div>
                    );
                  })}
                  <ArrayContent data_content={data} />
                  <div className="m-3 d-flex flex-wrap flex-row">
                    {data_programs.map(item => {
                      return item.project_slug === this.props.location.pathname.replace('/projects/', '') ? (
                        <ListCard
                          key={item.name + item.slug_program}
                          name={item.name}
                          slug={item.slug_program}
                          logo={item.logo}
                          image_background={item.image_background}
                          url={this.props.location}
                          edu_start_date={item.edu_start_date}
                          edu_end_date={item.edu_end_date}
                          handleClick={this.postIdAPI}
                        />
                      ) : null;
                    })}
                  </div>
                </div>
              </React.Fragment>
            );
          } else return null;
        })}
        <ButtonScrollToTop />
      </>
    );
  }
}

const mapStateToProps = state => ({
  data: state.projects.items,
  loading: state.projects.loading,
  data_programs: state.programs.items,
  loading_programs: state.programs.loading
});

const mapDispatchToProps = {
  fetchProjects,
  fetchPrograms,
  fetchAboutProgram
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProjectsAbout)
);
