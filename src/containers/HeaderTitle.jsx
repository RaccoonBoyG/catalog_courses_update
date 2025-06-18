// HeaderTitle.jsx
import React from 'react';
import { MEDIA_LS_URL } from '../services/openurfu';

const HeaderTitle = (props) => {
  return (
    <div className="d-flex row justify-content-between">
      <div className="d-flex justify-content-end">
        <h2 className="course-title clr-blue-main">{props.name}</h2>
      </div>
      <div className="d-flex justify-content-end text-dark">
        <p className="">{props.data.start_display}</p>
        {/* <p className="">{props.data}</p> */}
      </div>
      <div className="d-flex justify-content-end action-buttons align-items-end">
        <ButtonEnrollRead {...props} />
      </div>
      {props.description && <HeaderDescription desc={props.description} />}
    </div>
  );
};

const HeaderDescription = ({ desc }) => (
  <div className="course-description mt-4">
    <p>{desc}</p>
  </div>
);

const ButtonEnroll = ({ isAuth, changeEnroll, invitation_only, isEnrolling }) => {
  if (!isAuth) {
    return (
      <a href={`${MEDIA_LS_URL}/login`} className="uhov u-button bg-pink">
        <p className="">Записаться на курс</p>
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
