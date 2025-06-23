import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchAboutOrg, fetchAboutOrgList } from '../store/organizations/action';
import 'animate.css/animate.min.css';
// import AboutRender from '../containers/AboutRender';
import CourseListRender from '../containers/CourseListRender';
import scroll from './scroll';
import ButtonScrollToTop from '../containers/ButtonScrollToTop';

// let backImg = {
//   background: "url('http://itoo.urfu.ru/Content/images/bg.jpg') repeat center 0"
// };

const OrganizationAbout = () => {
  const dispatch = useDispatch();
  const { org } = useParams();
  const [dataLocal, setDataLocal] = useState([]);

  const { data, data_card } = useSelector((state) => ({
    data: state.organizations.items_about,
    data_card: state.organizations.items_card_about,
  }));

  useEffect(() => {
    const loadData = async () => {
      window.scrollTo(0, 0);
      await dispatch(fetchAboutOrg(org));
      await dispatch(fetchAboutOrgList(org));
      scroll();
    };
    
    loadData();
  }, [dispatch, org]);

  useEffect(() => {
    if (data_card?.courses) {
      setDataLocal(data_card.courses);
    }
  }, [data_card]);

  return (
    <React.Fragment>
      <div className="d-flex flex-row backImgCourse margin-custom-catalog p-5">
        <div
          className={`container container-course_about d-flex flex-column text-light animated fadeIn faster`}
        >
          <div
            className=" d-flex title_catalog align-items-start justify-content-start "
            style={{ textAlign: 'left' }}
          >
            <h2 className="d-flex align-items-start justify-content-start">
              {data.name}
            </h2>
          </div>
        </div>
      </div>
      {/* <AboutRender
        name={data.name}
        image_background={data.image_background}
        height={100}
        className={"top-txt-container-sub"}
      /> */}
      <div className="container text-custom-dark p-3 mb-3">
        <h3 className="mb-5">Курсы</h3>
        {dataLocal.length <= 0 ? (
          <div style={{ height: '300px' }}>
            <h2>У данной организации пока нет курсов</h2>
          </div>
        ) : (
          <div className="row d-flex">
            <CourseListRender item={dataLocal} />
          </div>
        )}
      </div>
      <ButtonScrollToTop />
    </React.Fragment>
  );
};

export default OrganizationAbout;
