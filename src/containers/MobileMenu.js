import React from 'react';
import { NavLink } from 'react-router-dom';

import { MEDIA_LS_URL } from '../services/openurfu';

import MyCoursesMobile from './MyCoursesMobile';
import RenderProfileYes from '../containers/RenderProfileYes';

const MobileMenu = props => {
  return (
    <div className="mobile-menu">
      <ul className="menu">
        <li className="menu-item" onClick={props.onButtonClickMenuItem}>
          <NavLink to="/" className="nav-link">
            Каталог
          </NavLink>
        </li>
        <li className="menu-item" onClick={props.onButtonClickMenuItem}>
          <NavLink to="/orgs" className="nav-link">
            Организации
          </NavLink>
        </li>
        <li className="menu-item" onClick={props.onButtonClickMenuItem}>
          <NavLink to="/projects" className="nav-link">
            Программы
          </NavLink>
        </li>
        {/* <li className="menu-item">
          <NavLink to="/programs" className="nav-link">
            Программы
          </NavLink>
        </li> */}
        <li className="menu-item" onClick={props.onButtonClickMenuItem}>
          <NavLink to="/about" className="nav-link">
            О нас
          </NavLink>
        </li>
        {props.isAuth ? null : (
          <li className="menu-item" onClick={props.onButtonClickMenuItem}>
            <a href={`${MEDIA_LS_URL}/register`} className="nav-link" id="href">
              Регистрация
            </a>
          </li>
        )}
        {props.isAuth ? null : (
          <li className="menu-item" onClick={props.onButtonClickMenuItem}>
            <a href={`${MEDIA_LS_URL}/login_old`} className="nav-link" id="href">
              Вход
            </a>
          </li>
        )}
        {props.isAuth ? <MyCoursesMobile onButtonClickMenuItemChiled={props.onButtonClickMenuItem} /> : null}
        {props.isAuth ? (
          <li className="menu-item" onClick={props.onButtonClickMenuItem}>
            <RenderProfileYes />
          </li>
        ) : null}
      </ul>
    </div>
  );
};

export default MobileMenu;
