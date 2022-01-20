import React, { useState, useEffect } from 'react';
// import ButtonEnroll from '../containers/ButtonEnroll';
// import ButtonReadMore from '../containers/ButtonReadMore';
// import ButtonPay from '../containers/ButtonPay';
// import ButtonEnrollProgram from './ButtonEnrollProgram';
import { MEDIA_LS_URL } from '../services/openurfu';
import $ from 'jquery';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOfferData } from '../store/programs/action';
import Spinner from '../containers/Spinner';
import Cookies from 'js-cookie';

// let backImg = {
//   background: "url('http://itoo.urfu.ru/Content/images/bg.jpg') repeat center 0"
// };

const HeaderTitleProgram = (props) => {
  const offer_data = useSelector((state) => state.programs.items_offer_data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOfferData(props.program_slug));
  }, []);
  return (
    <>
      {/* <div
      className={`container-course_about container animated fadeIn mt-3 mb-3 ${
        props.class === undefined ? "top-txt-container" : props.class
      }`}
    > */}
      <div className="d-flex flex-row backImgCourse margin-custom-catalog p-5">
        <div className={`container container-course_about d-flex flex-column text-light animated fadeIn faster`}>
          <div className=" d-flex title_catalog align-items-start justify-content-start mb-4" style={{ textAlign: 'left' }}>
            <h1 className="d-flex align-items-start justify-content-start">{props.title}</h1>
          </div>
          {
            <ButtonsProgramsEnroll
              isAuth={props.isAuth}
              search={props.search}
              program_slug={props.program_slug}
              data_enroll={props.data_enroll}
              user_data={props.user_data}
              enrollment_allowed={props.enrollment_allowed}
              offer_data={offer_data}
            />
          }
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
// course_id:	`${this.state.value}`,
// enrollment_action:	`enroll`,

let Modal = (props) => {
  const [button_title, setButtonTitle] = useState('Согласен');
  const [button_style, setButtonStyle] = useState('');
  // const [buttonText, setButtonText] = React.useState('Согласен')
  return (
    <div className="modal fade show" id="ModalPayment" tabIndex="-1" role="dialog" aria-labelledby="ModalPaymentlLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" style={{ color: '#000' }}>
              Оферта
            </h4>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => $('#ModalPayment').modal('hide')}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          {props.loading_offer ? (
            <Spinner />
          ) : (
            <div className="modal-body" style={{ color: '#000' }} dangerouslySetInnerHTML={{ __html: props.offer_data.offer_text }}></div>
          )}
          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal" onClick={() => $('#ModalPayment').modal('hide')}>
              Отмена
            </button>
            <button
              type="button"
              className="btn btn-primary"
              disabled={button_style}
              onClick={async () => {
                setButtonStyle('disabled');
                setButtonTitle('Загрузка...');
                let token = Cookies.get('csrftoken');
                // let postEnroll = await fetch(`${MEDIA_LS_URL}/api/enrollment/v1/enrollment`, {
                let postEnroll = await fetch(`${MEDIA_LS_URL}/api/itoo_api/acquiring/payments/create/`, {
                  headers: {
                    'Content-Type': 'application/json',
                    Accept: 'text-plain, */*',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRFToken': token,
                  },
                  method: 'post',
                  credentials: 'same-origin',
                  body: JSON.stringify({
                    // username: 'alexKekovich2',
                    // email: 'alexofficialkek@gmail.com',
                    // offer_id: '1'
                    username: props.user_data[0].username,
                    email: props.user_data[0].email,
                    offer_id: props.offer_data.offer_id,
                  }),
                });
                // const response_text = await postEnroll.text()
                const response_json = await postEnroll.json();
                console.log(response_json);
                if (response_json) {
                  let data = response_json;
                  console.log(data);
                  window.location.href = `${data.payment_url}`;
                } else throw Error(response_json);
              }}
            >
              {button_title}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function isNullCost(cost) {
  return cost !== null;
}

const ButtonEnrollProgramFalse = (props) => {
  // const [showModal, setModal] = React.useState(false);

  // const handleCloseModal = () => {
  //   setModal(false);
  // };
  const offer_data = useSelector((state) => state.programs.items_offer_data);
  const user_data = useSelector((state) => state.user.items_user);
  const loading_offer = useSelector((state) => state.programs.loading_offer);
  const dispatch = useDispatch();
  return (
    <>
      <div className="d-flex flex-row mt-5 justify-content-between">
        <div className="d-flex flex-row">
          {isNullCost(offer_data.edu_program_cost) ? (
            <>
              {/* <a
                href="/"
                // href={`${MEDIA_LS_URL}/api/itoo_api/verified_profile/profile/edit_exist/?program_slug=${props.program_slug}`}
                id="href"
                style={{ borderRadius: 0, textDecoration: 'none' }}
                target="blank"
              > */}
              <div className="d-flex flex-column">
                <button
                  type="button"
                  className="btn btn-light btn-lg mt-2 d-flex shadow"
                  style={{ borderRadius: 0 }}
                  data-toggle="modal"
                  data-target="#ModalPayment"
                  onClick={() => {
                    // setModal(true);
                    dispatch(fetchOfferData(props.program_slug));
                    $('#ModalPayment').appendTo('body').modal('show');
                  }}
                >
                  Оплатить
                </button>
              </div>
              <div className="d-flex flex-column ml-2 mt-3">
                <h4 className="d-flex disabled font-weight-bold" style={{ borderRadius: 0 }} disabled>
                  {offer_data.edu_program_cost} ₽
                </h4>
              </div>
            </>
          ) : null}
        </div>
        <div className="d-flex flex-column ">
          <a
            href={`${MEDIA_LS_URL}/api/itoo_api/verified_profile/profile/edit_exist/${props.program_slug}/`}
            id="href"
            style={{ borderRadius: 0, textDecoration: 'none' }}
            target="blank"
          >
            <button className="btn btn-light btn-lg mt-2 d-flex shadow" style={{ borderRadius: 0 }}>
              Редактировать анкету
            </button>
          </a>
          <p className="d-flex disabled" style={{ borderRadius: 0 }} disabled>
            Вы уже записаны на программу
          </p>
        </div>
      </div>
      <Modal offer_data={offer_data} loading_offer={loading_offer} user_data={user_data} />
    </>
  );
};

const ButtonProgram = (props) => {
  return <ButtonsCoursesEnroll program_slug={props.program_slug} isAuth={props.isAuth} enrollment_allowed={props.enrollment_allowed} />;
};

const button_enroll_program = (props) => (
  <div className="d-flex flex-row justify-content-end">
    <a
      className="btn btn-light btn-lg mt-2 d-flex shadow"
      href={`${MEDIA_LS_URL}/api/itoo_api/verified_profile/profile/${props.program_slug}/`}
      style={{ borderRadius: 0 }}
    >
      Записаться на
      <br /> программу
    </a>
  </div>
);

const button_auth = (props) => (
  <div className="d-flex flex-column">
    <div className="d-flex flex-row justify-content-end">
      <button className="pr-5 pl-5 btn btn-light btn-lg mt-2 d-flex shadow disabled" disabled style={{ borderRadius: 0 }}>
        Записаться на
        <br /> программу
      </button>
    </div>
    <div className="d-flex flex-row justify-content-end">
      <p className="d-flex disabled" style={{ borderRadius: 0 }} disabled>
        Запись на программу закрыта
      </p>
    </div>
  </div>
);

const withEither = (conditionalRenderingFn, EitherComponent) => (Component) => (props) => {
  return conditionalRenderingFn(props) ? (
    <>
      <EitherComponent
        isAuth={props.isAuth}
        search={props.search}
        program_slug={props.program_slug}
        data_enroll={props.data_enroll}
        enrollment_allowed={props.enrollment_allowed}
        offer_data={props.offer_data}
      />
    </>
  ) : (
    <>
      <Component
        isAuth={props.isAuth}
        search={props.search}
        program_slug={props.program_slug}
        data_enroll={props.data_enroll}
        enrollment_allowed={props.enrollment_allowed}
        offer_data={props.offer_data}
      />
    </>
  );
};

const isViewConditionFn = (props) => !props.data_enroll.is_active;
const isViewAuthConditionFn = (props) => (props.enrollment_allowed === '0' ? false : true);

const withEditContionalRendering = withEither(isViewConditionFn, ButtonProgram);
const ButtonsProgramsEnroll = withEditContionalRendering(ButtonEnrollProgramFalse);

const withAuthContionalRendering = withEither(isViewAuthConditionFn, button_enroll_program);
const ButtonsCoursesEnroll = withAuthContionalRendering(button_auth);

export default HeaderTitleProgram;
