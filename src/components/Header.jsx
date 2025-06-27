import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import RenderProfileYes from '../containers/RenderProfileYes';
import RenderProfileNo from '../containers/RenderProfileNo';
import MyCourses from '../containers/MyCourses';

const Header = () => {
  const { isAuth } = useSelector((state) => ({
    data: state.user.items_user,
    isAuth: state.user.isAuth,
  }));

  return (
    <React.Fragment>
      <div className="container mt-2">
        <nav className="navu">
          <NavLink to="/">
            <div className="logo"></div>
          </NavLink>

          <div className="justify-content-md-center" id="navbarSupportedContent">
            <ul className="navbar-nav navigate">
              <li className="nav-item">{/* Navigation items can go here */}</li>
              {isAuth && <MyCourses />}
            </ul>
          </div>

          <div className="d-flex navbtns">
            <NavLink to="/help" className="u-button u-button-outline">
              <h4 className="u-fw-400 mb-0">Задать вопрос</h4>
            </NavLink>
            {isAuth ? <RenderProfileYes /> : <RenderProfileNo />}
          </div>
        </nav>
      </div>
    </React.Fragment>
  );
};

export default Header;
