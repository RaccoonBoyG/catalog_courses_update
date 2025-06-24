import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { MEDIA_LS_URL } from '../services/openurfu';

const RenderProfileYes = () => {
  const data = useSelector(state => state.user.items_user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Закрытие dropdown при клике вне его области и нажатии Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  const toggleDropdown = (e) => {
    e.preventDefault();
    setIsDropdownOpen(!isDropdownOpen);
  };

  return data.map((item, i) => {
    return (
      <React.Fragment key={item.username + i}>
        <a href={`${MEDIA_LS_URL}/u/${item.username}`} style={{ listStyle: 'none' }} className="custom-profile-img">
          <li className="nav-item">
            <img className="rounded" src={item.profile_image} alt={item.username} style={{ maxWidth: '40px', maxHeight: '40px' }} />
          </li>
        </a>
        <li className={`nav-item dropdown ${isDropdownOpen ? 'show' : ''}`} style={{ listStyle: 'none' }} ref={dropdownRef}>
          <button
            className="nav-link dropdown-toggle text-neutral-regular btn btn-link"
            type="button"
            id="navbarDropdown"
            onClick={toggleDropdown}
            aria-haspopup="true"
            aria-expanded={isDropdownOpen}
            style={{ border: 'none', background: 'none', padding: '0.5rem 1rem', color: 'inherit' }}
          >
            {item.username}
          </button>
          <div className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`} aria-labelledby="navbarDropdown" style={{ minWidth: '5rem' }}>
            <a className="dropdown-item text-custom-dark" href={`${MEDIA_LS_URL}/u/${item.username}`}>
              Профиль
            </a>
            <a className="dropdown-item text-custom-dark" href={`${MEDIA_LS_URL}/account/settings`}>
              Настройки
            </a>
            <a className="dropdown-item text-custom-dark" href={`${MEDIA_LS_URL}/logout`}>
              Выйти
            </a>
          </div>
        </li>
      </React.Fragment>
    );
  });
};

export default RenderProfileYes;
