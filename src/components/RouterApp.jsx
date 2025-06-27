import React, { useEffect } from 'react';

import Projects from './Projects';
import ProjectsAbout from './ProjectsAbout';
// import Programs from "./Programs";
import ProgramAbout from './ProgramAbout';
import Footer from './Footer';
// import AboutUs from '../containers/AboutUs';
import Tech from '../containers/Tech';
import Privacy from '../containers/Privacy';
import OrganizationAbout from './OrganizationAbout';
import NotFound from '../containers/NotFound';
import Header from './Header';
import Catalog from './Catalog';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import CourseAbout from './CourseAbout';
import Organization from './Organization';
import { useDispatch } from 'react-redux';
import { fetchUserState } from '../store/user/userSlice';
import Help from './Help';

const RouterApp = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserState());
    // dispatch(fetchEnrollState());
  }, [dispatch]);

  return (
    <main className="App" id="app">
      <BrowserRouter>
        <Header />
        <div>
          <Routes>
            <Route path="/" element={<Catalog />} />
            {/* <Route path="/about" element={<AboutUs />} /> */}
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/tech" element={<Tech />} />
            <Route path="/help" element={<Help />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="/orgs/:org" element={<OrganizationAbout />} />
            <Route path="/orgs" element={<Organization />} />
            {/* <Route path="/programs/:program" component={ProgramAbout} />
              <Route path="/programs" component={Programs} /> */}
            <Route path="/projects/:project/:program" element={<ProgramAbout />} />
            <Route path="/projects/:project" element={<ProjectsAbout />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/:id" element={<CourseAbout />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </main>
  );
};

export default RouterApp;
