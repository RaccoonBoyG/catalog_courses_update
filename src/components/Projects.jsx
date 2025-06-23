import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchProjects, fetchAboutProject } from '../store/projects/projectsSlice';
import { fetchPrograms } from '../store/programs/programsSlice';
import 'animate.css/animate.min.css';

import ListCard from '../containers/ListCard';
import scroll from './scroll';
import ButtonScrollToTop from '../containers/ButtonScrollToTop';
import Spinner from '../containers/Spinner';

const Projects = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  
  const { loading, data, data_program } = useSelector(state => ({
    data: state.projects.items,
    loading: state.projects.loading,
    data_program: state.programs.items
  }));

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchPrograms());
    scroll();
  }, [dispatch]);

  const postIdAPI = useCallback((id) => {
    dispatch(fetchAboutProject(id));
  }, [dispatch]);

  useEffect(() => {
    const menu = document.getElementsByClassName('navbar');
    if (menu[0]) {
      menu[0].setAttribute("style", "display:flex;");
    }
  }, []);

  if (loading && data.length === 0) {
    return <Spinner />;
  }

  const ProjectsList = data.map(item => {
    return (
      <ListCard
        key={item.name + item.slug}
        name={item.name}
        slug={item.slug_project}
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
        <div className="container d-flex flex-wrap flex-row">{ProjectsList}</div>
      </div>
      <ButtonScrollToTop />
    </React.Fragment>
  );
};

export default Projects;
