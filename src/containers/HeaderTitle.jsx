import React from 'react';
import { MEDIA_LS_URL } from '../services/openurfu';
import ButtonEnroll from './ButtonEnroll';

/**
 * HeaderTitle component displays the course title, metadata, description,
 * and the appropriate action button based on authentication/enrollment state.
 */
const HeaderTitle = ({
  name,
  data,
  description,
  isAuth,
  course_enroll_user,
  params,
  modes_data,
  changeEnroll,
  invitation_only,
}) => {
  return (
    <div className="course-header-container">
      <div className="course-header-content">
        <div className="course-title-container">
          <h3 className="course-title clr-blue-main">{name}</h3>
          {data?.start_display && (
            <div className="course-meta text-dark">
              <p>{data.start_display}</p>
            </div>
          )}
        </div>

        {description && <HeaderDescription desc={description} />}

        <div className="action-buttons">
          <ActionButton
            isAuth={isAuth}
            course_enroll_user={course_enroll_user}
            invitation_only={invitation_only}
            params={params}
            modes_data={modes_data}
            changeEnroll={changeEnroll}
          />
        </div>
      </div>
    </div>
  );
};

/**
 * HeaderDescription renders the course description paragraph.
 */
const HeaderDescription = ({ desc }) => (
  <div className="course-description">
    <p>{desc}</p>
  </div>
);

/**
 * ButtonReadMore navigates to the course info page.
 */
const ButtonReadMore = ({ courseId }) => (
  <a href={`${MEDIA_LS_URL}/courses/${courseId}/info`} className="u-button bg-pink">
    Перейти к курсу
  </a>
);

/**
 * ButtonInvitationOnly shows disabled button when enrollment is by invitation.
 */
const ButtonInvitationOnly = () => (
  <button className="uhov u-button bg-pink" disabled>
    <h4 className="u-fw-400">Запись только по приглашению</h4>
  </button>
);

/**
 * ButtonAuthPrompt shows login link for unauthenticated users.
 */
const ButtonAuthPrompt = () => (
  <a href={`${MEDIA_LS_URL}/login`} className="uhov u-button bg-pink">
    <h4 className="u-fw-400">Записаться на курс</h4>
  </a>
);

/**
 * ActionButton decides which button to render based on props.
 */
const ActionButton = ({
  isAuth,
  course_enroll_user,
  invitation_only,
  params,
  modes_data,
  changeEnroll,
}) => {
  // Authenticated and already enrolled: show "Перейти к курсу"
  if (isAuth && course_enroll_user) {
    return <ButtonReadMore courseId={params.id} />;
  }
  // Invitation only course: show disabled invite-only button
  if (invitation_only) {
    return <ButtonInvitationOnly />;
  }
  // Not authenticated: prompt to login
  if (!isAuth) {
    return <ButtonAuthPrompt />;
  }
  // Authenticated but not enrolled yet
  return (
    <ButtonEnroll
      params={params.id}
      modes_data={modes_data}
      changeEnroll={changeEnroll}
    />
  );
};

export default HeaderTitle;
