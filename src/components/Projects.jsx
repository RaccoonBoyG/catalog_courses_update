import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProjects, fetchAboutProject } from '../store/projects/action';
import { fetchPrograms } from '../store/programs/action';
import 'animate.css/animate.min.css';

import ListCard from '../containers/ListCard';
import scroll from './scroll';
import ButtonScrollToTop from '../containers/ButtonScrollToTop';
import Spinner from '../containers/Spinner';

class Projects extends Component {
  constructor(props) {
    super(props);

    this.postIdAPI = this.postIdAPI.bind(this);
  }

  componentDidMount() {
    this.props.fetchProjects();
    this.props.fetchPrograms();
    scroll();
  }

  postIdAPI(id) {
    this.props.fetchAboutProject(id);
  }

  render() {
    const { loading, data } = this.props;
    const ProjectsList = data.map(item => {
      return (
        <ListCard
          key={item.name + item.slug}
          name={item.name}
          slug={item.slug_project}
          logo={item.logo}
          image_background={item.image_background}
          url={this.props.match.url}
          handleClick={this.postIdAPI}
        />
      );
    });
    if (loading && data.length === 0) {
      return <Spinner />;
    }
    let menu = document.getElementsByClassName('navbar');
    menu[0].setAttribute("style", "display:flex;");
    return (
      <React.Fragment>
        <div className="d-flex flex-column margin-custom-catalog">
          <div className="container d-flex flex-wrap flex-row">{ProjectsList}</div>
        </div>
        <ButtonScrollToTop />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  data: state.projects.items,
  loading: state.projects.loading,
  data_program: state.programs.items
});

const mapDispatchToProps = {
  fetchProjects,
  fetchPrograms,
  fetchAboutProject
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Projects);
