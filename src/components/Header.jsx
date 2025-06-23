import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { Modal, Button, Form, Alert, FloatingLabel } from 'react-bootstrap';

import { fetchUserState } from '../store/user/userSlice';
import { searchInput, resetSearch } from '../store/cards/cardsSlice';
import RenderProfileYes from '../containers/RenderProfileYes';
import RenderProfileNo from '../containers/RenderProfileNo';
import MyCourses from '../containers/MyCourses';
import { MEDIA_LS_URL } from '../services/openurfu';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { data, isAuth, loading_user } = useSelector((state) => ({
    data: state.user.items_user,
    isAuth: state.user.isAuth,
    loading_user: state.user.loading,
  }));

  const [term, setTerm] = useState('');
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [ticket, setTicket] = useState({ email: '', subject: '', body: '' });
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleTextChange = useCallback((e) => {
    setTerm(e.target.value);
  }, []);

  const submitSearch = useCallback(() => {
    dispatch(searchInput(term));
    document.querySelector('.header')?.classList.remove('menu-open');
    setTerm('');
    navigate('/');
  }, [dispatch, term, navigate]);

  const resetInput = useCallback(() => {
    dispatch(resetSearch());
    // Replace jQuery with vanilla JS
    const searchInput = document.querySelector('.search-slt');
    if (searchInput) {
      searchInput.value = '';
    }
    setTerm('');
  }, [dispatch]);

  // Help modal handlers
  const handleShowHelp = useCallback((e) => {
    e.preventDefault();
    setShowHelpModal(true);
    setSubmitError(null);
    setSubmitSuccess(false);
  }, []);

  const handleCloseHelp = useCallback(() => {
    setShowHelpModal(false);
  }, []);

  const handleTicketChange = useCallback((e) => {
    const { name, value } = e.target;
    setTicket(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleTicketSubmit = useCallback(async (e) => {
    e.preventDefault();
    const { email, subject, body } = ticket;
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
      
      setSubmitSuccess(true);
      setTicket({ email: '', subject: '', body: '' });
    } catch (err) {
      setSubmitError(err.message);
    }
  }, [ticket]);

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
};

export default Header;
