import React, { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import 'animate.css/animate.min.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchAbout } from '../store/course_about/action';

const CourseCard = ({ value }) => {
  const dispatch = useDispatch();

  const postIdAPI = useCallback(() => {
    dispatch(fetchAbout(value.id));
  }, [dispatch, value.id]);

  const truncate = useCallback((str, len) => {
    const dots = '...';
    const words = str.split(' ');
    if (words.length > len) {
      return words.slice(0, len).join(' ') + dots;
    }
    return str;
  }, []);

  const { name, id, start_display, image } = value;

  return (
    <div className="course-card">
      <div className="">
        <Link
          to={{ pathname: `/${id}` }}
          onClick={postIdAPI}
          className="course-card__link"
        >
          <div
            className="course-card__image"
            style={{
              backgroundImage: `url(${image})`,
            }}
          ></div>

          <div className="u-card">
            <h4 className="">{truncate(name, 6)}</h4>
            <p className="bt">Начало: {start_display}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
