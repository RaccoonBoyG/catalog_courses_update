import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchProjects } from '../store/projects/projectsSlice';
import { fetchPrograms, fetchAboutProgram } from '../store/programs/programsSlice';
import 'animate.css/animate.min.css';

import scroll from './scroll';
import ButtonScrollToTop from '../containers/ButtonScrollToTop';
import ListCard from '../containers/ListCard';
import { ArrayContent } from '../containers/Content';
import Spinner from '../containers/Spinner';

const ProjectsAbout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  
  const { loading, data, data_programs, loading_programs } = useSelector(state => ({
    data: state.projects.items,
    loading: state.projects.loading,
    data_programs: state.programs.items,
    loading_programs: state.programs.loading
  }));

  const currentProjectSlug = location.pathname.replace('/projects/', '');

  useEffect(() => {
    const loadData = async () => {
      await dispatch(fetchPrograms());
      await dispatch(fetchProjects());
      scroll();
    };
    
    loadData();
  }, [dispatch]);

  // Handle menu visibility based on project settings
  useEffect(() => {
    const currentProject = data.find(project => 
      project.slug_project === currentProjectSlug
    );
    
    if (currentProject) {
      const menu = document.getElementsByClassName('navbar');
      if (menu[0]) {
        menu[0].setAttribute(
          "style", 
          currentProject.hide_menu ? "display:none;" : "display:flex;"
        );
      }
    }
  }, [data, currentProjectSlug]);

  const postIdAPI = useCallback((id) => {
    dispatch(fetchAboutProgram(id));
  }, [dispatch]);

  if (loading && loading_programs) {
    return <Spinner />;
  }

  const currentProject = data.find(item => 
    item.slug_project === currentProjectSlug
  );

  if (!currentProject) {
    return null;
  }

  const relatedPrograms = data_programs.filter(program => 
    program.project_slug === currentProjectSlug
  );

  return (
    <>
      <div className="d-flex flex-row backImgCourse margin-custom-catalog">
        <div className={`container container-course_about p-custom-2 pb-4 pl-2 d-flex flex-column text-light animated fadeIn faster mb-3`}>
          <div className=" d-flex title_catalog align-items-start justify-content-start " style={{ textAlign: 'left' }}>
            <h2 className="d-flex align-items-start justify-content-start">{currentProject.name}</h2>
          </div>
        </div>
      </div>
      
      <div className="d-flex flex-column margin-custom-catalog container">
        {currentProject.content.map((contentItem, key) => (
          <div 
            className="text-custom-dark2 m-3 p-5 shadow-sm bg-white" 
            key={key} 
            dangerouslySetInnerHTML={{ __html: contentItem.content }}
          />
        ))}
        
        <ArrayContent data_content={data} />
        
        <div className="m-3 d-flex flex-wrap flex-row">
          {relatedPrograms.map(program => (
            <ListCard
              key={program.name + program.slug_program}
              name={program.name}
              slug={program.slug_program}
              logo={program.logo}
              image_background={program.image_background}
              url={location}
              edu_start_date={program.edu_start_date}
              edu_end_date={program.edu_end_date}
              handleClick={postIdAPI}
            />
          ))}
        </div>
      </div>
      
      <ButtonScrollToTop />
    </>
  );
};

export default ProjectsAbout;
