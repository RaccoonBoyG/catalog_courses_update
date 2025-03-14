import React from 'react';
// import ButtonEnroll from '../containers/ButtonEnroll';
import { MEDIA_LS_URL } from '../services/openurfu';

// import ButtonReadMore from '../containers/ButtonReadMore';
// import ButtonPay from '../containers/ButtonPay';

// let backImg = {
//   background: "url('http://itoo.urfu.ru/Content/images/bg.jpg') repeat center 0"
// };

const HeaderTitle = (props) => {
  return (
    <>
      {/* <div
      className={`container-course_about container animated fadeIn mt-3 mb-3 ${
        props.class === undefined ? "top-txt-container" : props.class
      }`}
    > */}
      <div className="animated fadeIn d-flex flex-row backImgCourse margin-custom-catalog">
        <div className={`container container-course_about p-custom-2 pb-4 pl-2 d-flex flex-column text-light animated fadeIn faster mb-3`}>
          <div className=" d-flex title_catalog align-items-start justify-content-start " style={{ textAlign: 'left' }}>
            <h1 className="d-flex align-items-start justify-content-start">{props.title}</h1>
          </div>
          <div className="d-flex flex-row mt-5 justify-content-between">
            {
              <ButtonEnrollRead
                isAuth={props.isAuth}
                course_enroll_user={props.course_enroll_user}
                params={props.params}
                modes_data={props.modes_data}
                changeEnroll={props.changeEnroll}
                invitation_only={props.invitation_only}
              />
            }
          </div>
          {props.description === undefined ? null : <HeaderDescription desc={props.description} />}
        </div>
      </div>
    </>
  );
};

const HeaderDescription = (props) => (
  <>
    <div className="d-flex mobile-action">
      <div className="container mt-5">
        <p>{props.desc}</p>
      </div>
    </div>
  </>
);

const button_enroll = (props) => (
  <button style={{ borderRadius: 0 }} className="animated fadeIn btn btn-light btn-lg mt-2 d-flex shadow" onClick={props.changeEnroll}>
    Записаться на курс
  </button>
);

// const button_auth = props => (
//   <a href={`${MEDIA_LS_URL}/login`} id="href" style={{ borderRadius: 0, textDecoration: 'none' }}>
//     <button style={{ borderRadius: 0 }} className="animated fadeIn btn btn-light btn-lg mt-2 d-flex shadow" disabled={props.invitation_only}>
//       Записаться на курс
//     </button>
//   </a>
// );
const button_In_only = (props) => (
  <button style={{ borderRadius: 0 }} className="animated fadeIn btn btn-light btn-lg mt-2 d-flex shadow" disabled={props.invitation_only}>
    Запись только по приглашению
  </button>
);

const button_auth = () => (
  <a href={`${MEDIA_LS_URL}/login`} id="href" style={{ borderRadius: 0, textDecoration: 'none' }}>
    <button style={{ borderRadius: 0 }} className="animated fadeIn btn btn-light btn-lg mt-2 d-flex shadow">
      Записаться на курс
    </button>
  </a>
);

const ButtonReadMore = (props) => {
  let url = `${MEDIA_LS_URL}/courses/${props.params.id}/info`;
  return (
    <a href={url} style={{ borderRadius: 0, textDecoration: 'none' }} id="href">
      <button style={{ borderRadius: 0 }} className="animated fadeIn btn btn-light btn-lg mt-2 d-flex shadow">
        Перейти к курсу
      </button>
    </a>
  );
};

// const ButtonEnrollRead = props => {

//   return (
//     <div className="d-flex flex-row mt-5 justify-content-between">
//       {props.isAuth && props.course_enroll_user ? <ButtonReadMore value={props.params.id} /> : <ButtonEnroll value={props.params.id} />}
//       {/* {props.isAuth && props.course_enroll_user && props.search === '?test=1' && course_modes_slug === 'verified' && user_mode !== 'verified' ? (
//         <ButtonPay isAuth={props.isAuth} course_enroll_user={props.course_enroll_user} params={props.params} modes_data={props.modes_data} />
//       ) : null} */}
//     </div>
//   );
// };

const ButtonsCoursesEnroll = (props) => (
  <ButtonEnroll params={props.params.id} isAuth={props.isAuth} changeEnroll={props.changeEnroll} invitation_only={props.invitation_only} />
);

const withEither = (conditionalRenderingFn, EitherComponent) => (Component) => (props) => {
  return conditionalRenderingFn(props) ? (
    <>
      <EitherComponent
        isAuth={props.isAuth}
        course_enroll_user={props.course_enroll_user}
        params={props.params}
        modes_data={props.modes_data}
        changeEnroll={props.changeEnroll}
        invitation_only={props.invitation_only}
      />
    </>
  ) : (
    <>
      <Component
        isAuth={props.isAuth}
        course_enroll_user={props.course_enroll_user}
        params={props.params}
        modes_data={props.modes_data}
        changeEnroll={props.changeEnroll}
        invitation_only={props.invitation_only}
      />
    </>
  );
};

const isViewConditionFn = (props) => props.isAuth && props.course_enroll_user;
const isViewAuthConditionFn = (props) => props.isAuth;
const isViewInvitationOnlyConditionFn = (props) => props.invitation_only;

const withInvitationOnlyRendering = withEither(isViewInvitationOnlyConditionFn, button_In_only);
const ButtonInvitationOnly = withInvitationOnlyRendering(button_enroll);

const withEditContionalRendering = withEither(isViewConditionFn, ButtonReadMore);
const ButtonEnrollRead = withEditContionalRendering(ButtonsCoursesEnroll);

const withAuthContionalRendering = withEither(isViewAuthConditionFn, ButtonInvitationOnly);
const ButtonEnroll = withAuthContionalRendering(button_auth);

export default HeaderTitle;
