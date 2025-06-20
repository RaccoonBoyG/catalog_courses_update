import React from 'react';
import { MEDIA_LS_URL } from '../services/openurfu';

const HeaderTitle = (props) => {
  return (
    <div className="course-header-container">
      <div className="course-header-content">
        <div className="course-title-container">
          <h3 className="course-title clr-blue-main">{props.name}</h3>
          <div className="course-meta text-dark">
            <p>{props.data.start_display}</p>
          </div>
        </div>

        {props.description && <HeaderDescription desc={props.description} />}

        <div className="action-buttons">
          <ButtonEnrollRead {...props} />
        </div>
      </div>
    </div>
  );
};

const HeaderDescription = ({ desc }) => (
  <div className="course-description">
    <p>{desc}</p>
  </div>
);

const ButtonEnroll = ({ isAuth, changeEnroll, invitation_only, isEnrolling }) => {
  if (!isAuth) {
    return (
      <a href={`${MEDIA_LS_URL}/login`} className="uhov u-button bg-pink">
        <h4 className="u-fw-400">Записаться на курс</h4>
      </a>
    );
  }

  if (invitation_only) {
    return (
      <button className="u-button bg-pink" disabled>
        Запись только по приглашению
      </button>
    );
  }

  return (
    <button
      className="uhov u-button bg-pink"
      onClick={changeEnroll}
      disabled={isEnrolling}
    >
      {isEnrolling ? 'Записываем...' : 'Записаться на курс'}
    </button>
  );
};

const ButtonReadMore = ({ id }) => (
  <a href={`${MEDIA_LS_URL}/courses/${id}/info`} className="uhov u-button bg-pink">
    Перейти к курсу
  </a>
);

const ButtonEnrollRead = ({ isAuth, course_enroll_user, params, ...rest }) => {
  if (isAuth && course_enroll_user) {
    return <ButtonReadMore id={params.id} />;
  }
  return <ButtonEnroll {...rest} />;
};

export default HeaderTitle;
