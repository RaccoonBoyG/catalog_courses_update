import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAbout } from '../store/course_about/action';
import { BigPlayButton, ControlBar, Player, PlayToggle } from 'video-react';
import { clearLoadingUser, fetchEnrollState, fetchUserState } from '../store/user/action';
import 'animate.css/animate.min.css';
// import ButtonEnroll from "../containers/ButtonEnroll";
// import ButtonReadMore from "../containers/ButtonReadMore";
import AboutRender from '../containers/AboutRender';
import scroll from './scroll';
import ButtonScrollToTop from '../containers/ButtonScrollToTop';
//background-image: url('//openedu.urfu.ru/files/courses_catalog/bg-nav.jpeg');
// import { IoMdArrowBack } from "react-icons/io";
// import { IconContext } from "react-icons";
import Spinner from '../containers/Spinner';
import { MEDIA_LS_URL } from '../services/openurfu';
import Cookies from 'js-cookie';
import withRouter from '../utils/withRouter';

// let backImg = {
// backgroundImage: "url('//openedu.urfu.ru/files/courses_catalog/bg-nav.jpeg')",
// background: "url('http://itoo.urfu.ru/Content/images/bg.jpg') repeat center 0"
// backgroundPosition: "center",
// backgroundSize: "cover",
// backgroundRepeat: "no-repeat",
// width: "100%",
// height: "100%",
// position: "absolute",
// zIndex: "-99999",
// backgroundPositionY: "top"
// };

class CourseAbout extends Component {
  constructor(props) {
    super(props);
    this.changeEnroll = this.changeEnroll.bind(this);
  }

  async componentDidMount() {
    let test = async () => {
      return await this.props.navigate('/404', { replace: true });
    };
    await this.props.fetchAbout(this.props.params.id, this.props.navigate);
    window.scrollTo(0, 0);
    scroll();
    await this.props.fetchUserState();
    await this.props.fetchEnrollState();
  }

  async changeEnroll() {
    let token = Cookies.get('csrftoken');
    let postEnroll = await fetch(`${MEDIA_LS_URL}/api/enrollment/v1/enrollment`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text-plain, */*',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRFToken': token,
      },
      method: 'post',
      credentials: 'same-origin',
      body: JSON.stringify({
        course_details: { course_id: this.props.params.id },
      }),
    });
    const response = await postEnroll.text();
    if (postEnroll.status === 200) window.location.reload();
    else throw Error(response.message);
  }

  render() {
    // const sanitizer = dompurify.sanitize;
    const {
      isAuth,
      data,
      course_enroll_user,
      params,
      loading_user,
      loading,
      modes_data,
      navigate,
    } = this.props;
    // if (!loading_user) {
    //   this.props.fetchEnrollState(this.props.params.id);
    // }
    // var config = { ALLOWED_TAGS: ['iframe', 'p', 'div', 'br', 'b', 'section', 'h1', 'h2', 'h3', 'h4', 'h5', 'img', 'strong'] };
    // if (document.querySelector('iframe') == null)
    // {
    //   console.log("no iframes");
    // }
    // else {
    //   Array.prototype.forEach.call(
    //     document.querySelectorAll('iframe'),
    //     function (iframe) {
    //       // can't use .remove: https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove
    //       iframe.parentElement.removeChild(iframe);
    //     }
    //   );
    // }
    if (loading && loading_user && data.length === 0) {
      return <Spinner />;
    }

    function PromoPlayer(props) {
      const course_video_uri = props.course_video_uri;
      const course_image_uri = MEDIA_LS_URL + props.course_image_uri;
      const course_title = data.name;
      const promo_image = data.promo_image;
      if (!course_video_uri && !course_image_uri) {
        return null;
      }

      if (course_video_uri && (course_image_uri || promo_image)) {
        return (
          <div className="mb-5">
            <Player
              autoPlay={false}
              playsInline
              preload={'metadata'}
              poster={course_image_uri || promo_image}
              src={course_video_uri}
            >
              <BigPlayButton position="center" />
              <ControlBar autoHide={false} disableDefaultControls={false}>
                <PlayToggle />
              </ControlBar>
            </Player>
          </div>
        );
      } else {
        return (
          <img src={course_image_uri} alt={course_title} className="img-fluid mb-5" />
        );
      }
    }

    return (
      <React.Fragment>
        <AboutRender
          name={data.name}
          invitation_only={data.invitation_only}
          className={'top-txt-container-sub'}
          height={100}
          isAuth={isAuth}
          course_enroll_user={course_enroll_user}
          params={params}
          search={navigate.search}
          modes_data={modes_data}
          changeEnroll={this.changeEnroll}
        />
        {/* <div style={{ ...backImg }}></div> */}
        <div className="container pb-5 pt-3 mb-5 p-custom-2">
          <div
            className=" animated fadeIn text-custom-dark mb-3 p-0"
            style={{ borderRadius: '0' }}
          >
            <div className="d-flex flex-row justify-content-between">
              {/* <div className="d-flex flex-row">
                <button
                  className="btn btn-primary m-3 buttonBackPC d-flex"
                  onClick={this.props.history.goBack}
                >
                  <IconContext.Provider value={{ size: "2em" }}>
                    <IoMdArrowBack />
                  </IconContext.Provider>
                </button>
              </div> */}
            </div>
            <div className="container p-5 bg-white shadow-sm">
              <PromoPlayer
                course_video_uri={data.course_video_uri}
                course_image_uri={data.course_image_uri}
              />

              <div
                className="question-text"
                dangerouslySetInnerHTML={{
                  __html: data.overview,
                }}
              />
            </div>
          </div>
        </div>
        <ButtonScrollToTop />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.course_about.items,
  isAuth: state.user.isAuth,
  course_enroll_user: state.user.course_enroll_user,
  loading: state.course_about.loading,
  data_user: state.user.items_user,
  loading_user: state.user.loading,
  modes_data: state.user.course_user_modes,
});

const mapDispatchToProps = {
  fetchAbout,
  fetchEnrollState,
  fetchUserState,
  clearLoadingUser,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CourseAbout));
