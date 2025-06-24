import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import 'animate.css/animate.min.css';
import { MEDIA_LS_URL } from '../services/openurfu';

const ButtonEnroll = ({ value }) => {
  const isAuth = useSelector((state) => state.user.isAuth);

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

  const changeEnroll = useCallback(async () => {
    const token = getCookie('csrftoken');
    try {
      const postEnroll = await fetch(`${MEDIA_LS_URL}/api/enrollment/v1/enrollment`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'text-plain, */*',
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRFToken': token,
        },
        method: 'post',
        credentials: 'same-origin',
        body: JSON.stringify({
          course_details: { course_id: value },
        }),
      });

      const response = await postEnroll.text();
      if (postEnroll.status === 200) {
        window.location.reload();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('Enrollment error:', error);
    }
  }, [getCookie, value]);

  const buttonEnroll = (
    <button className="uhov u-button bg-pink" onClick={changeEnroll}>
      Записаться на курс
    </button>
  );

  const buttonAuth = (
    <a
      href={`${MEDIA_LS_URL}/login`}
      id="href"
      style={{ borderRadius: 0, textDecoration: 'none' }}
    >
      <button className="uhov u-button bg-pink">Записаться на курс</button>
    </a>
  );

  return isAuth ? buttonEnroll : buttonAuth;
};

export default ButtonEnroll;
