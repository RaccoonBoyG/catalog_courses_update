import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { MEDIA_LS_URL } from '../services/openurfu';

const RenderProfileYes = () => {
  const data = useSelector((state) => state.user.items_user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsDropdownOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return data.map((item, i) => (
    <li
      key={item.username + i}
      className={`nav-item dropdown ${isDropdownOpen ? 'show' : ''}`}
      ref={dropdownRef}
      style={{ listStyle: 'none' }}
    >
      <button
        className="nav-link dropdown-toggle text-neutral-regular btn btn-link"
        onClick={(e) => {
          e.preventDefault();
          setIsDropdownOpen(!isDropdownOpen);
        }}
        aria-haspopup="true"
        aria-expanded={isDropdownOpen}
        style={{ border: 'none', background: 'none', padding: '.5rem 1rem' }}
      >
        <img src={item.profile_image} alt={item.username} />
      </button>

      <div
        className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}
        aria-labelledby="navbarDropdown"
        style={{ minWidth: '5rem' }}
      >
        <a
          className="dropdown-item text-custom-dark"
          href={`${MEDIA_LS_URL}/u/${item.username}`}
        >
          Профиль
        </a>
        <a
          className="dropdown-item text-custom-dark"
          href={`${MEDIA_LS_URL}/account/settings`}
        >
          Настройки
        </a>
        <a className="dropdown-item text-custom-dark" href={`${MEDIA_LS_URL}/logout`}>
          Выйти
        </a>
      </div>
    </li>
  ));
};

export default RenderProfileYes;
