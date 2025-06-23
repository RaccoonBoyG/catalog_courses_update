import React, { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import 'animate.css/animate.min.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchAbout } from '../store/course_about/action';

const backgroundImg = {
  backgroundPosition: 'top',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPositionY: 'top',
  minHeight: '200px'
};

const CourseCardOrg = ({ item }) => {
  const dispatch = useDispatch();

  const postIdAPI = useCallback(() => {
    dispatch(fetchAbout(item.id));
  }, [dispatch, item.id]);

  const truncate = useCallback((str, len) => {
    const dots = '...';
    const words = str.split(' ');
    if (words.length > len) {
      return words.slice(0, len).join(' ') + dots;
    }
    return words.join(' ');
  }, []);

  const { display_name, id, start_display, course_image_url } = item;

  return (
    <div
      className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 card-height mb-3 mt-3 animated fadeIn faster "
      key={display_name}
      style={{ minHeight: '400px', borderRadius: '0' }}
      data-toggle="tooltip"
      data-placement="left"
      title={display_name}
    >
      <div className="bg-light p-3 shadow-effect animated fadeIn faster shadow" style={{ minHeight: '400px', borderRadius: '0' }}>
        <Link to={{ pathname: `/${id}` }} onClick={postIdAPI} className="text-white" style={{ textDecoration: 'none' }}>
          <div
            className="d-flex flex-row"
            style={{
              ...backgroundImg,
              backgroundImage: `url(https://courses.openedu.urfu.ru/${course_image_url})`
            }}
          ></div>
          <div className="d-flex-row container-fluid p-0">
            <div className="flex-row d-flex flex-column pb-0 pt-0 pl-3 pr-3 text-custom-dark">
              <p className="card-catalog-text m-0 p-1">
                <small>
                  <FontAwesomeIcon icon={faGraduationCap} size="1x" /> УрФУ
                </small>
              </p>
              <p className="card-catalog-title p-1 mb-0 card-title">{truncate(display_name, 6)}</p>
              <p className="card-catalog-text p-1 m-0 card-text">
                <FontAwesomeIcon icon={faClock} size="1x" /> Начало: {start_display}
              </p>
            </div>
            <div className="flex-row d-flex flex-column pl-3 " style={{ position: 'absolute', bottom: '0px' }}>
              <p className="nav-link text-primary p-1 show-about">Подробнее</p>
            </div>
          </div>
        </Link>
      </div>
      <hr className="line bg-primary" />
    </div>
  );
};

export default CourseCardOrg;
