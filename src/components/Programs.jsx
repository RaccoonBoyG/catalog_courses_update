import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchPrograms, fetchAboutProgram } from '../store/programs/programsSlice';
import 'animate.css/animate.min.css';

// import Header from "./Header";
import ListCard from '../containers/ListCard';
import scroll from './scroll';
import ButtonScrollToTop from '../containers/ButtonScrollToTop';
import Spinner from '../containers/Spinner';

const Programs = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  
  const { loading, data } = useSelector(state => ({
    data: state.programs.items,
    loading: state.programs.loading
  }));

  useEffect(() => {
    dispatch(fetchPrograms());
    scroll();
  }, [dispatch]);

  const postIdAPI = useCallback((id) => {
    dispatch(fetchAboutProgram(id));
  }, [dispatch]);

  if (loading && data.length === 0) {
    return <Spinner />;
  }

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
        url={location}
        handleClick={postIdAPI}
      />
    );
  });

  return (
    <React.Fragment>
      <div className="d-flex flex-column margin-custom-catalog">
        <div className="container d-flex flex-wrap flex-row">{ProgramsList}</div>
      </div>
      <ButtonScrollToTop />
    </React.Fragment>
  );
};

export default Programs;
