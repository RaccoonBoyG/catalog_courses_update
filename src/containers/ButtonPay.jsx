import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import 'animate.css/animate.min.css';
import { MEDIA_LS_URL } from '../services/openurfu';

const ButtonPay = ({ modes_data }) => {
  const isAuth = useSelector(state => state.user.isAuth);

  const getCookie = useCallback((name) => {
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + '=') {
          return decodeURIComponent(cookie.substring(name.length + 1));
        }
      }
    }
    return null;
  }, []);

  const redirectPay = useCallback(async () => {
    const token = getCookie('csrftoken');
    try {
      const postEnroll = await fetch(`${MEDIA_LS_URL}/api/itoo_api/verified_profile/profile/`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'text-plain, */*',
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRFToken': token
        },
        method: 'get',
        credentials: 'same-origin',
        body: JSON.stringify({
          course_modes: modes_data
        })
      });
      
      const response = await postEnroll.text();
      if (postEnroll.status === 200) {
        window.location.reload();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('Payment error:', error);
    }
  }, [getCookie, modes_data]);

  const buttonPay = (
    <a 
      className="btn btn-light btn-lg mt-2 d-flex" 
      href={`${MEDIA_LS_URL}/api/itoo_api/verified_profile/profile/`} 
      style={{ borderRadius: 0 }}
    >
      Оплатить курс
    </a>
  );

  const buttonAuth = (
    <a 
      href={`${MEDIA_LS_URL}/login`} 
      id="href" 
      style={{ borderRadius: 0, textDecoration: 'none' }}
    >
      <button 
        className="btn btn-light btn-lg mt-2 d-flex" 
        style={{ borderRadius: 0 }}
      >
        Оплатить курс
      </button>
    </a>
  );

  return isAuth ? buttonPay : buttonAuth;
};

export default ButtonPay;
