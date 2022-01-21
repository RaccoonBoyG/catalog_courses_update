import React, { Component } from 'react';

import Projects from './Projects';
import ProjectsAbout from './ProjectsAbout';
// import Programs from "./Programs";
import ProgramAbout from './ProgramAbout';
import Footer from './Footer';
import AboutUs from '../containers/AboutUs';
import Tech from '../containers/Tech';
import Privacy from '../containers/Privacy';
import OrganizationAbout from './OrganizationAbout';
import NotFound from '../containers/NotFound';
import Header from './Header';
import Catalog from './Catalog';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import CourseAbout from './CourseAbout';
import Organization from './Organization';
import { connect } from 'react-redux';
import { fetchUserState } from '../store/user/action';

class RouterApp extends Component {
  componentDidMount() {
    this.props.fetchUserState();
    // this.props.fetchEnrollState();
  }
  render() {
    return (
      <main className="App" id="app">
        <BrowserRouter>
          <Header />
          <div style={{ background: '#f5f5f5' }}>
            <Routes>
              <Route path="/" element={<Catalog />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/tech" element={<Tech />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="/orgs/:org" element={<OrganizationAbout />} />
              <Route path="/orgs" element={<Organization />} />
              {/* <Route path="/programs/:program" component={ProgramAbout} />
                <Route path="/programs" component={Programs} /> */}
              <Route path="/projects/:project/:program" element={<ProgramAbout/>} />
              <Route path="/projects/:project" element={<ProjectsAbout/>} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/:id" element={<CourseAbout />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </main>
    );
  }
}

const mapDispatchToProps = {
  fetchUserState,
};

export default connect(null, mapDispatchToProps)(RouterApp);
