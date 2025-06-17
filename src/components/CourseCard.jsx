import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import 'animate.css/animate.min.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAbout } from '../store/course_about/action';

class CourseCard extends Component {
  postIdAPI() {
    this.props.fetchAbout(this.props.value.id);
  }

  truncate(str, len) {
    const dots = '...';
    const words = str.split(' ');
    if (words.length > len) {
      return words.slice(0, len).join(' ') + dots;
    }
    return str;
  }

  render() {
    const { name, id, start_display, image } = this.props.value;

    return (
      <div className="course-card">
        <div className="">
          <Link
            to={{ pathname: `/${id}` }}
            onClick={this.postIdAPI.bind(this)}
            className="course-card__link"
          >
            <div
              className="course-card__image"
              style={{
                backgroundImage: `url(${image})`,
              }}
            ></div>

            <div className="u-card umx2">
              <p className="bt">
                <FontAwesomeIcon icon={faGraduationCap} className="course-card__icon" />{' '}
                УрФУ
              </p>
              <h4 className="">{this.truncate(name, 6)}</h4>
              <p className="bt">Начало: {start_display}</p>
              <button class="u-card-action"></button>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchAbout,
};

export default connect(null, mapDispatchToProps)(CourseCard);
