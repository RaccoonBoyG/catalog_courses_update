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
import { IoIosSearch } from 'react-icons/io';
import { IconContext } from 'react-icons';
import $ from 'jquery';
import MobileFilter from '../containers/MobileFilter';
import MobileMenu from '../containers/MobileMenu';
import MobileButtonBack from '../containers/MobileButtonBack';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponentMenu: false,
      showComponentFilter: false,
      term: '',
      showHelpModal: false,
      ticket: { email: '', subject: '', body: '' },
      submitError: null,
      submitSuccess: false,
    };
    // existing binds
    this._onButtonClickMenu = this._onButtonClickMenu.bind(this);
    this._onButtonClickFilter = this._onButtonClickFilter.bind(this);
    this._handleTextChange = this._handleTextChange.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.resetInput = this.resetInput.bind(this);
    this._onButtonClickMenuItem = this._onButtonClickMenuItem.bind(this);
    // new binds for modal
    this.handleShowHelp = this.handleShowHelp.bind(this);
    this.handleCloseHelp = this.handleCloseHelp.bind(this);
    this.handleTicketChange = this.handleTicketChange.bind(this);
    this.handleTicketSubmit = this.handleTicketSubmit.bind(this);
  }

  componentDidMount() {
    var header = document.querySelector('.header');
    var icon = document.querySelector('.icon-container');
    var icon_search = document.querySelector('.icon-container-search');
    if (this.props.location.pathname === '/') {
      icon_search.onclick = function () {
        header.classList.toggle('menu-open');
      };
    }
    icon.onclick = function () {
      header.classList.toggle('menu-open');
    };
  }

  updateData(config) {
    this.setState(config);
  }

  _onButtonClickMenu() {
    this.updateData({ showComponentMenu: true, showComponentFilter: false });
  }

  _onButtonClickFilter() {
    var header = document.querySelector('.header');
    header.classList.toggle('menu-open');
    this.updateData({ showComponentFilter: true, showComponentMenu: false });
  }

  _onButtonClickMenuItem() {
    var header = $('.header');
    $(header).toggleClass('menu-open');
    this.updateData({ showComponentMenu: false, showComponentFilter: false });
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
    const {
      showHelpModal,
      ticket,
      submitError,
      submitSuccess,
      showComponentMenu,
      showComponentFilter,
      term,
    } = this.state;
    return (
      <React.Fragment>
        <div className="container-fluid mt-2">
          <nav className="navbar navbar-expand-lg navbar-light container pl-0 pr-0">
            <NavLink className="navbar-brand" to="/">
              <div class="logo"></div>
            </NavLink>

            <div
              className="collapse navbar-collapse justify-content-md-center"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav navigate is-show">
                <li className="nav-item">
                  <NavLink to="/" className="nav-link">
                    Каталог
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/orgs" className="nav-link">
                    Организации
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn" onClick={this.handleShowHelp}>
                    Помощь
                  </button>
                </li>
                {isAuth && <MyCourses />}
              </ul>
            </div>
            {isAuth ? <RenderProfileYes /> : <RenderProfileNo />}
          </nav>

          <div className="header">
            {this.props.location.pathname === '/' && (
              <div
                className="icon-container-search"
                onClick={this._onButtonClickFilter}
                style={{ float: 'left' }}
              >
                <IconContext.Provider value={{ size: '2em' }}>
                  <IoIosSearch />
                </IconContext.Provider>
              </div>
            )}
            <div
              className="icon-container d-flex p-2 m-1"
              onClick={this._onButtonClickMenu}
            >
              <div id="menuicon" className="d-flex flex-column">
                <div className="bar bar1" />
                <div className="bar bar2" />
                <div className="bar bar3" />
              </div>
            </div>

            {/* {(this.props.location.pathname.startsWith('/orgs/') ||
              this.props.location.pathname.match(/^\/\d+/)) && (
              <MobileButtonBack navigate={this.props.navigate} />
            )} */}

            {/* {showComponentMenu && (
              <MobileMenu
                isAuth={isAuth}
                onButtonClickMenuItem={this._onButtonClickMenuItem}
              />
            )} */}
            {/* {showComponentFilter && this.props.location.pathname === '/' && (
              <MobileFilter
                _handleTextChange={this._handleTextChange}
                submitSearch={this.submitSearch}
                resetInput={this.resetInput}
                term={term}
              />
            )} */}
          </div>
        </div>

        {/* Helpdesk Modal */}
        <Modal
          show={showHelpModal}
          onHide={this.handleCloseHelp}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Отправить заявку</Modal.Title>
            {/* <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={() => this.handleCloseHelp(false)}
            >
              <span aria-hidden="true">&times;</span>
            </button> */}
          </Modal.Header>
          <Modal.Body>
            {submitSuccess && <Alert variant="success">Заявка успешно отправлена.</Alert>}
            {submitError && <Alert variant="danger">Ошибка: {submitError}</Alert>}
            <Form onSubmit={this.handleTicketSubmit}>
              {/* <Form.Group controlId="helpEmail"> */}
              <Form.Floating className="mb-3">
                <Form.Control
                  id="floatingInputCustom"
                  type="email"
                  placeholder="name@example.com"
                />
                <label htmlFor="floatingInputCustom">Email address</label>
              </Form.Floating>
              <FloatingLabel controlId="helpEmail" label="Email address" className="mb-3">
                <Form.Control
                  type="email"
                  name="email"
                  value={ticket.email}
                  onChange={this.handleTicketChange}
                  required
                />
              </FloatingLabel>
              {/* </Form.Group> */}
              <Form.Group controlId="helpSubject">
                <Form.Label>Тема</Form.Label>
                <Form.Control
                  type="text"
                  name="subject"
                  value={ticket.subject}
                  onChange={this.handleTicketChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="helpBody">
                <Form.Label>Описание</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="body"
                  value={ticket.body}
                  onChange={this.handleTicketChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Отправить
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
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
