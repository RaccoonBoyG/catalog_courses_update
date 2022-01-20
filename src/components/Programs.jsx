import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPrograms, fetchAboutProgram } from '../store/programs/action';
import 'animate.css/animate.min.css';

// import Header from "./Header";
import ListCard from '../containers/ListCard';
import scroll from './scroll';
import ButtonScrollToTop from '../containers/ButtonScrollToTop';
import Spinner from '../containers/Spinner';

class Programs extends Component {
  constructor(props) {
    super(props);

    this.postIdAPI = this.postIdAPI.bind(this);
  }

  componentDidMount() {
    this.props.fetchPrograms();
    scroll();
  }

  postIdAPI(id) {
    this.props.fetchAboutProgram(id);
  }

  render() {
    const { loading, data } = this.props;
    const ProgramsList = data.map(item => {
      return (
        <ListCard
          key={item.name + item.slug}
          name={item.name}
          slug={item.slug_program}
          logo={item.logo}
          image_background={item.image_background}
          edu_start_date={item.edu_start_date}
          edu_end_date={item.edu_end_date}
          url={this.props.match.url}
          handleClick={this.postIdAPI}
        />
      );
    });
    if (loading && data.length === 0) {
      return <Spinner />;
    }
    return (
      <React.Fragment>
        <div className="d-flex flex-column margin-custom-catalog">
          <div className="container d-flex flex-wrap flex-row">{ProgramsList}</div>
        </div>
        <ButtonScrollToTop />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  data: state.programs.items,
  loading: state.programs.loading
});

const mapDispatchToProps = {
  fetchPrograms,
  fetchAboutProgram
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Programs);
