import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'animate.css/animate.min.css';
import { MEDIA_LS_URL } from '../services/openurfu';
// import $ from 'jquery';

class ButtonEnrollProgram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   modes_data: this.props.modes_data
    };
  }

  render() {
    const { isAuth, program_slug } = this.props;
    let button_enroll_program = (
      <div className="d-flex flex-row mt-5 justify-content-end">
        <a
          className="btn btn-light btn-lg mt-2 d-flex shadow"
          href={`${MEDIA_LS_URL}/api/itoo_api/verified_profile/profile/?program_slug=${program_slug}`}
          style={{ borderRadius: 0 }}
        >
          Записаться на программу
        </a>
      </div>
    );
    let button_auth = (
      <div className="d-flex flex-row mt-5 justify-content-end">
        <a
          href={`${MEDIA_LS_URL}/api/itoo_api/verified_profile/profile/?program_slug=${program_slug}`}
          id="href"
          style={{ borderRadius: 0, textDecoration: 'none' }}
        >
          <button className="btn btn-light btn-lg mt-2 d-flex shadow" style={{ borderRadius: 0 }}>
            Записаться на программу
          </button>
        </a>
      </div>
    );
    return isAuth ? button_enroll_program : button_auth;
  }
}

const mapStateToProps = state => ({
  isAuth: state.user.isAuth
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonEnrollProgram);
