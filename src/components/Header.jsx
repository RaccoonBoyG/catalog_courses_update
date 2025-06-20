import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import { Modal, Button, Form, Alert, FloatingLabel } from 'react-bootstrap';

import { fetchUserState } from '../store/user/action';
import { searchInput, resetSearch } from '../store/cards/action';
import RenderProfileYes from '../containers/RenderProfileYes';
import RenderProfileNo from '../containers/RenderProfileNo';
import MyCourses from '../containers/MyCourses';
import { MEDIA_LS_URL } from '../services/openurfu';
import $ from 'jquery';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      showHelpModal: false,
      ticket: { email: '', subject: '', body: '' },
      submitError: null,
      submitSuccess: false,
    };
    this._handleTextChange = this._handleTextChange.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.resetInput = this.resetInput.bind(this);
    // new binds for modal
    this.handleShowHelp = this.handleShowHelp.bind(this);
    this.handleCloseHelp = this.handleCloseHelp.bind(this);
    this.handleTicketChange = this.handleTicketChange.bind(this);
    this.handleTicketSubmit = this.handleTicketSubmit.bind(this);
  }

  componentDidMount() {}

  updateData(config) {
    this.setState(config);
  }

  _handleTextChange(e) {
    this.updateData({ term: e.target.value });
  }

  submitSearch() {
    this.props.searchInput(this.state.term);
    document.querySelector('.header').classList.remove('menu-open');
    this.updateData({ showComponentFilter: false, showComponentMenu: false, term: '' });
    this.props.navigate('/');
  }

  resetInput() {
    this.props.resetSearch();
    $('.search-slt').val('');
    this.updateData({ term: '' });
  }

  // Help modal handlers
  handleShowHelp(e) {
    e.preventDefault();
    this.setState({ showHelpModal: true, submitError: null, submitSuccess: false });
  }

  handleCloseHelp() {
    this.setState({ showHelpModal: false });
  }

  handleTicketChange(e) {
    const { name, value } = e.target;
    this.setState((prev) => ({ ticket: { ...prev.ticket, [name]: value } }));
  }

  async handleTicketSubmit(e) {
    e.preventDefault();
    const { email, subject, body } = this.state.ticket;
    const payload = {
      ticket: {
        title: subject,
        article: { body, content_type: 'text/plain' },
        customer: email,
      },
    };
    try {
      const res = await fetch('https://help.urfu.online/api/v1/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token token=YOUR_ZAMMAD_API_TOKEN',
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      this.setState({
        submitSuccess: true,
        ticket: { email: '', subject: '', body: '' },
      });
    } catch (err) {
      this.setState({ submitError: err.message });
    }
  }

  render() {
    const { isAuth } = this.props;
    return (
      <React.Fragment>
        <div className="container mt-2">
          <nav className="navu">
            <NavLink to="/">
              <div className="logo"></div>
            </NavLink>

            <div className="justify-content-md-center" id="navbarSupportedContent">
              <ul className="navbar-nav navigate">
                <li className="nav-item">
                  {/* <NavLink to="/help" className="nav-link">
                    Задать вопрос
                  </NavLink> */}
                </li>
                {isAuth && <MyCourses />}
              </ul>
            </div>
            <NavLink to="/help" className="u-button u-button-outline login-button">
              <h4 className="u-fw-400">Задать вопрос</h4>
            </NavLink>

            {isAuth ? <RenderProfileYes /> : <RenderProfileNo />}
          </nav>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.user.items_user,
  isAuth: state.user.isAuth,
  loading_user: state.user.loading,
});

const mapDispatchToProps = { fetchUserState, searchInput, resetSearch };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
