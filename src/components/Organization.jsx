import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchOrganizations, fetchAboutOrganization, fetchAboutOrganizationList } from '../store/organizations/organizationsSlice';
import 'animate.css/animate.min.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
// import HeaderBackground from '../containers/HeaderBackground';
// import HeaderTitle from '../containers/HeaderTitle';
import ListCard from '../containers/ListCard';
import scroll from './scroll';
import ButtonScrollToTop from '../containers/ButtonScrollToTop';
import Spinner from '../containers/Spinner';

const Organizations = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  
  const { data, loading } = useSelector(state => ({
    data: state.organizations.items,
    loading: state.organizations.loading
  }));

  useEffect(() => {
    dispatch(fetchOrganizations());
    scroll();
  }, [dispatch]);

  const postIdAPI = useCallback((id) => {
    dispatch(fetchAboutOrganization(id));
    dispatch(fetchAboutOrganizationList(id));
  }, [dispatch]);

  if (loading && data.length === 0) {
    return <Spinner />;
  }

  const OrgList = data.map(item => {
    return (
      <ListCard
        key={item.name + item.slug}
        name={item.name}
        slug={item.slug}
        logo={item.logo}
        image_background={item.image_background}
        url={location}
        handleClick={postIdAPI}
      />
    );
  });

  return (
    <React.Fragment>
      <div className="d-flex flex-column margin-custom-catalog">
        <div className="container d-flex flex-wrap flex-row">{OrgList}</div>
      </div>
      <ButtonScrollToTop />
    </React.Fragment>
  );
};

export default Organizations;
