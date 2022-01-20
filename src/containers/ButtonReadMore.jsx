import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'animate.css/animate.min.css';
import { MEDIA_LS_URL } from '../services/openurfu';

class ButtonReadMore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    };
  }

  render() {
    let url = `${MEDIA_LS_URL}/courses/${this.state.value}/info`;
    return (
      <a href={url} style={{ borderRadius: 0, textDecoration: 'none' }}  id="href">
        <button style={{ borderRadius: 0 }} className="btn btn-light btn-lg mt-2 d-flex shadow">Перейти к курсу</button>
      </a>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.user.isAuth
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonReadMore);
