import React from 'react';
import 'animate.css/animate.min.css';
import { MEDIA_LS_URL } from '../services/openurfu';

const ButtonReadMore = ({ value }) => {
  const url = `${MEDIA_LS_URL}/courses/${value}/info`;
  
  return (
    <a href={url} style={{ borderRadius: 0, textDecoration: 'none' }}  id="href">
      <button style={{ borderRadius: 0 }} className="btn btn-light btn-lg mt-2 d-flex shadow">Перейти к курсу</button>
    </a>
  );
};

export default ButtonReadMore;
