import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { MEDIA_LS_URL } from '../services/openurfu';

const Footer = () => {
  return (
    <footer className="page-footer font-small mdb-color pt-1 pb-1">
      <div className="container text-center text-md-left mb-2">
        <hr className="hr-footer " />
        <div className="row text-center text-md-left mt-5 mb-5">
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-2 ">
            <h6 className="text-uppercase mb-4 font-weight-bold text-custom-dark">
              <img
                src="//openedu.urfu.ru/files/courses_catalog/UrFULogo1.svg"
                alt="..."
                className="footer-icon"
              />
            </h6>
            {/* <h6 className="text-uppercase mb-4 font-weight-bold text-custom-dark">

              Ural Federal University
            </h6> */}
            <p className="text-custom-dark ">
              ФГАОУ ВО «УрФУ имени первого Президента России Б.Н.Ельцина»
              <br />
              Центр новых образовательных технологий и аудиовизуальных средств обучения
            </p>
          </div>
          <hr className="w-200 clearfix d-md-none" />
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-2">
            <h6 className="text-uppercase mb-4 font-weight-bold text-custom-dark">
              Полезные ссылки
            </h6>
            <p>
              <NavLink to="/privacy" className="text-neutral-regular">
                Политика конфиденциальности
              </NavLink>
            </p>
            <p>
              <NavLink to="/tech" className="text-neutral-regular">
                Технические требования
              </NavLink>
            </p>
            <p>
              <a href={`${MEDIA_LS_URL}/help`} className="text-neutral-regular" id="href">
                Техническая поддержка
              </a>
            </p>
          </div>
          <hr className="w-200 clearfix d-md-none" />
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-2">
            <h6 className="text-uppercase mb-2 font-weight-bold text-custom-dark">
              Поддержка студентов УрФУ
            </h6>
            <p className="text-neutral-regular">
              {/* <i className="fas fa-home mr-3"></i> */}
              openedu@urfu.ru
            </p>
            <h6 className="text-uppercase mt-4 mb-2 font-weight-bold text-custom-dark">
              Техническое сопровождение
            </h6>
            <p className="text-neutral-regular">
              {/* <i className="fas fa-home mr-3"></i> */}
              Екатеринбург, ул. Мира д.19, каб. И-200
              <br />
              courses.openedu@urfu.ru
            </p>
            <p className="text-neutral-regular">
              {/* <i className="fas fa-envelope mr-3"></i> +7 (992) 024-26-58 */}
            </p>
          </div>
          <hr className="w-200 clearfix d-md-none" />
          {/* <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-2"></div> */}
        </div>
        {/* <hr className="hr-footer" /> */}
        {/* <div className="d-flex align-items-center">
          <div className="col-md-7 col-lg-8">
            <p className="text-center text-md-left text-custom-dark">
              © 2019 Copyright:
              <a href="http://itoo.urfu.ru/ru" className="text-custom-dark">
                <strong> Ural Federal University</strong>
              </a>
            </p>
          </div>
          <div className="col-md-5 col-lg-4 ml-lg-0">
            <div className="text-center text-md-right">
              <ul className="list-unstyled list-inline">
                <li className="list-inline-item">
                  <a
                    href="/"
                    className="btn-floating btn-sm rgba-white-slight mx-1"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    href="/"
                    className="btn-floating btn-sm rgba-white-slight mx-1"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    href="/"
                    className="btn-floating btn-sm rgba-white-slight mx-1"
                  >
                    <i className="fab fa-google-plus-g"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    href="/"
                    className="btn-floating btn-sm rgba-white-slight mx-1"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
