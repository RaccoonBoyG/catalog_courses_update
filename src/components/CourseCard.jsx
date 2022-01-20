import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import 'animate.css/animate.min.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAbout } from '../store/course_about/action';

let backgroundImg = {
  backgroundPosition: 'top',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPositionY: 'top',
  minHeight: '200px'
};

class CourseCard extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     name:
  //       this.props.value === undefined
  //         ? this.props.item.display_name
  //         : this.props.value.name,
  //     start_display:
  //       this.props.value === undefined
  //         ? this.props.item.start_display
  //         : this.props.value.start_display,
  //     id:
  //       this.props.value === undefined
  //         ? this.props.item.id
  //         : this.props.value.id,
  //     image:
  //       this.props.value === undefined
  //         ? `https://courses.openedu.urfu.ru/${this.props.item.course_image_url}`
  //         : this.props.value.image
  //   };
  // }

  postIdAPI() {
    this.props.fetchAbout(this.props.value.id);
    // this.props.fetchEnrollState();
  }

  truncate(str, len) {
    var dots = '...';
    var object = str.split(' ');
    var str_truncate = '';
    if (object.length > len) {
      str_truncate = object.splice(0, len).join(' ') + dots;
    } else {
      str_truncate = object.splice(0, len).join(' ');
    }
    return str_truncate;
  }

  // async imageOnError(url) {
  //   let url_image = `https://images.unsplash.com/photo-1532003885409-ed84d334f6cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80`;
  //   let test = await fetch(url);
  //   if (test.ok) {
  //     return await url;
  //   } else {
  //     return await url_image;
  //   }
  // }

  // async componentDidMount() {
  //   let img = await this.imageOnError(this.props.value.image);
  //   this.setState(prevState => ({ ...prevState, image: img }));
  // }

  // fadeInUp linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(250,250,250,1) 42%, rgba(247,247,247,0) 0%), s
  render() {
    // fetch(`${this.state.image}`)
    //     .then(res => res.ok===true ? this.setState(prevState => ({...prevState, ...this.state.image}) ) : this.setState(prevState => ({...prevState, image: url_image}) ))
    // console.log(this.props.item, this.props.value); style={{borderRadius: '10px'}} linear-gradient(to bottom, rgba(255, 255, 255, 0) 30%, rgb(247, 247, 247) 85%),
    let { name, id, start_display, image } = this.props.value;
    return (
      <div
        className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 card-height mb-3 mt-3 animated fadeIn faster"
        key={name}
        style={{ minHeight: '400px', borderRadius: '0' }}
        data-toggle="tooltip"
        data-placement="left"
        title={name}
      >
        <div className="bg-white p-3 shadow-effect animated fadeIn faster shadow-sm" style={{ minHeight: '400px', borderRadius: '0' }}>
          <Link to={{ pathname: `/${id}` }} onClick={this.postIdAPI.bind(this)} className="text-white" style={{ textDecoration: 'none' }}>
            <div
              className="d-flex flex-row"
              style={{
                ...backgroundImg,
                backgroundImage: `url(${image})`
              }}
            ></div>
            <div className="d-flex-row container-fluid p-0">
              <div className="flex-row d-flex flex-column pb-0 pt-0 pl-3 pr-3 text-custom-dark">
                <p className="card-catalog-text m-0 p-1">
                  <small>
                    <FontAwesomeIcon icon={faGraduationCap} size="1x" /> УрФУ
                  </small>
                </p>
                <p className="card-catalog-title p-1 mb-0 card-title">{this.truncate(name, 6)}</p>
                <p className="card-catalog-text p-1 m-0 card-text">
                  <FontAwesomeIcon icon={faClock} size="1x" /> Начало: {start_display}
                </p>
              </div>
              <div className="flex-row d-flex flex-column pl-3 " style={{ position: 'absolute', bottom: '0px' }}>
                <p className="nav-link text-primary p-1 show-about">Подробнее</p>
              </div>
            </div>
          </Link>
        </div>
        <hr className="line bg-primary" />
      </div>

      // <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 card-height-list mb-3 mt-3 animated pulse faster">
      //   <Link to={`/${id}`} onClick={this.postIdAPI.bind(this)}>
      //     <div
      //       className="d-flex flex-column card-catalog card animated pulse faster shadow-effect bg-light"
      //       style={{ boxShadow: "0px 0px 20px -15px rgba(0,0,0,0.3)" }}
      //     >
      //       <img className="card-catalog-img card-img" src={image} alt={name} />
      //       <div
      //         className="d-flex flex-column card-catalog-body card-body text-custom-dark mb-3"
      //         data-toggle="tooltip"
      //         data-placement="left"
      //         title={name}
      //       >
      //         <p className="d-inline-block mb-1">
      //           <small>
      //             <FontAwesomeIcon icon={faGraduationCap} size="1x" /> УрФУ
      //           </small>
      //         </p>
      //         <p className="card-catalog-title card-title mb-2">
      //           <strong
      //             style={{ overflow: "hidden", textOverflow: "ellipsis" }}
      //           >
      //             {this.truncate(name, 6)}
      //           </strong>
      //         </p>
      //         <p className="card-catalog-text card-text">
      //           <FontAwesomeIcon icon={faClock} size="1x" /> Начало:{" "}
      //           {start_display}
      //         </p>
      //       </div>
      //       <hr className="line-2 bg-primary" />
      //     </div>
      //     <div
      //       className="flex-row d-flex flex-column"
      //       style={{ position: "absolute", bottom: "0px" }}
      //     >
      //       <p className="nav-link text-primary pl-4 show-about">Подробнее</p>
      //     </div>
      //   </Link>
      // </div>
    );
  }
}

const mapDispatchToProps = {
  fetchAbout
};

export default connect(
  null,
  mapDispatchToProps
)(CourseCard);
