import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BigPlayButton, ControlBar, Player, PlayToggle } from 'video-react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { MEDIA_LS_URL } from '../services/openurfu';
import { fetchAbout } from '../store/course_about/courseAboutSlice';
import { fetchEnrollState, fetchUserState } from '../store/user/userSlice';
import AboutRender from '../containers/AboutRender';
import ButtonScrollToTop from '../containers/ButtonScrollToTop';
import Spinner from '../containers/Spinner';
import 'animate.css/animate.min.css';
import scroll from './scroll';

const CourseAbout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isAuth, course_enroll_user, loading, loading_user, modes_data } =
    useSelector((state) => ({
      data: state.course_about.items,
      isAuth: state.user.isAuth,
      course_enroll_user: state.user.course_enroll_user,
      loading: state.course_about.loading,
      loading_user: state.user.loading,
      modes_data: state.user.course_user_modes,
    }));

  const [isEnrolling, setIsEnrolling] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        await dispatch(fetchAbout({ id, navigate }));
        window.scrollTo(0, 0);
        await dispatch(fetchUserState());
        await dispatch(fetchEnrollState());
        // Initialize scroll to top functionality
        scroll();
      } catch (error) {
        console.error('Error loading course data:', error);
      }
    };

    loadData();
  }, [dispatch, id, navigate]);

  const changeEnroll = async () => {
    setIsEnrolling(true);
    try {
      const token = Cookies.get('csrftoken');
      const response = await fetch(`${MEDIA_LS_URL}/api/enrollment/v1/enrollment`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'text-plain, */*',
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRFToken': token,
        },
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify({
          course_details: { course_id: id },
        }),
      });

      if (response.status === 200) {
        window.location.reload();
      } else {
        const errorData = await response.text();
        throw new Error(errorData.message || 'Enrollment failed');
      }
    } catch (error) {
      console.error('Enrollment error:', error);
    } finally {
      setIsEnrolling(false);
    }
  };

  if (loading && loading_user && data.length === 0) {
    return <Spinner />;
  }

  return (
    <>
      <div className="container umt64">
        <div className="course-top-container">
          <div className="promo-container">
            <PromoPlayer
              course_video_uri={data.course_video_uri}
              course_image_uri={data.course_image_uri}
              promo_image={data.promo_image}
              course_title={data.name}
            />
          </div>

          <div className="about-render-container">
            <AboutRender
              name={data.name}
              invitation_only={data.invitation_only}
              isAuth={isAuth}
              course_enroll_user={course_enroll_user}
              params={{ id }}
              modes_data={modes_data}
              changeEnroll={changeEnroll}
              isEnrolling={isEnrolling}
              data={data}
            />
          </div>
        </div>

        <div
          className="question-text text-dark umt64"
          dangerouslySetInnerHTML={{ __html: data.overview }}
        />
      </div>
      <ButtonScrollToTop />
    </>
  );
};

const PromoPlayer = ({
  course_video_uri,
  course_image_uri,
  promo_image,
  course_title,
}) => {
  if (!course_video_uri && !course_image_uri && !promo_image) {
    return null;
  }

  const imageSrc = course_image_uri ? `${MEDIA_LS_URL}${course_image_uri}` : promo_image;

  return (
    <>
      {course_video_uri ? (
        <Player
          autoPlay={false}
          playsInline
          preload={'metadata'}
          poster={imageSrc}
          src={course_video_uri}
          className="rounded shadow-sm"
        >
          <BigPlayButton position="center" />
          <ControlBar autoHide={false} disableDefaultControls={false}>
            <PlayToggle />
          </ControlBar>
        </Player>
      ) : (
        <img src={imageSrc} alt={course_title} className="img-fluid rounded shadow-sm" />
      )}
    </>
  );
};

export default CourseAbout;
