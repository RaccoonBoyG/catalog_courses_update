import React from 'react';
import { useSelector } from 'react-redux';
import 'animate.css/animate.min.css';
import { MEDIA_LS_URL } from '../services/openurfu';
// import $ from 'jquery';

const ButtonEnrollProgram = ({ program_slug }) => {
  const isAuth = useSelector(state => state.user.isAuth);

  const buttonEnrollProgram = (
    <div className="d-flex flex-row mt-5 justify-content-end">
      <a
        className="btn btn-light btn-lg mt-2 d-flex shadow"
        href={`${MEDIA_LS_URL}/api/itoo_api/verified_profile/profile/?program_slug=${program_slug}`}
        style={{ borderRadius: 0 }}
      >
        Записаться на программу
      </a>
    </div>
  );

  const buttonAuth = (
    <div className="d-flex flex-row mt-5 justify-content-end">
      <a
        href={`${MEDIA_LS_URL}/api/itoo_api/verified_profile/profile/?program_slug=${program_slug}`}
        id="href"
        style={{ borderRadius: 0, textDecoration: 'none' }}
      >
        <button className="btn btn-light btn-lg mt-2 d-flex shadow" style={{ borderRadius: 0 }}>
          Записаться на программу
        </button>
      </a>
    </div>
  );

  return isAuth ? buttonEnrollProgram : buttonAuth;
};

export default ButtonEnrollProgram;
