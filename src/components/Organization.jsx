import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrg, fetchAboutOrg, fetchAboutOrgList } from '../store/organizations/action';
import 'animate.css/animate.min.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
// import HeaderBackground from '../containers/HeaderBackground';
// import HeaderTitle from '../containers/HeaderTitle';
import ListCard from '../containers/ListCard';
import scroll from './scroll';
import ButtonScrollToTop from '../containers/ButtonScrollToTop';
import Spinner from '../containers/Spinner';
import withRouter from '../utils/withRouter';

class Organizations extends Component {
  componentDidMount() {
    this.props.fetchOrg();
    scroll();
  }

  postIdAPI(id) {
    this.props.fetchAboutOrg(id);
    this.props.fetchAboutOrgList(id);
  }

  render() {
    const { data, loading } = this.props;
    const OrgList = data.map(item => {
      return (
        <ListCard
          key={item.name + item.slug}
          name={item.name}
          slug={item.slug}
          logo={item.logo}
          image_background={item.image_background}
          url={this.props.location}
          handleClick={this.postIdAPI.bind(this)}
        />
      );
    });

    if (loading && data.length === 0) {
      return <Spinner />;
    }

    return (
      <React.Fragment>
        <div className="d-flex flex-column margin-custom-catalog">
          <div className="container d-flex flex-wrap flex-row">{OrgList}</div>
        </div>
        <ButtonScrollToTop />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  data: state.organizations.items,
  loading: state.organizations.loading
});

const mapDispatchToProps = {
  fetchOrg,
  fetchAboutOrg,
  fetchAboutOrgList
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Organizations));
