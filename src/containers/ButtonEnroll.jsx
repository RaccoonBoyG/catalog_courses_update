import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'animate.css/animate.min.css';
import { MEDIA_LS_URL } from '../services/openurfu';
import $ from 'jquery';

class ButtonEnroll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    };
  }

  getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = $.trim(cookies[i]);
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + '=') {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  async changeEnroll() {
    let token = this.getCookie('csrftoken');
    let postEnroll = await fetch(`${MEDIA_LS_URL}/api/enrollment/v1/enrollment`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text-plain, */*',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRFToken': token
      },
      method: 'post',
      credentials: 'same-origin',
      body: JSON.stringify({
        course_details: { course_id: this.state.value }
      })
    });
    const response = await postEnroll.text();
    if (postEnroll.status === 200) window.location.reload();
    else throw Error(response.message);
  }

  render() {
    const { isAuth } = this.props;
    let button_enroll = (
      <button style={{ borderRadius: 0 }} className="btn btn-light btn-lg mt-2 d-flex shadow" onClick={this.changeEnroll.bind(this)}>
        Записаться на курс
      </button>
    );
    let button_auth = (
      <a href={`${MEDIA_LS_URL}/login`} id="href" style={{ borderRadius: 0, textDecoration: 'none' }}>
        <button style={{ borderRadius: 0 }} className="btn btn-light btn-lg mt-2 d-flex shadow">
          Записаться на курс
        </button>
      </a>
    );
    return isAuth ? button_enroll : button_auth;
  }
}

const mapStateToProps = state => ({
  isAuth: state.user.isAuth
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonEnroll);
