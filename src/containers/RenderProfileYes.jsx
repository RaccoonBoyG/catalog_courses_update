import React, { Component } from 'react';
import { connect } from 'react-redux';

import { MEDIA_LS_URL } from '../services/openurfu';

class RenderProfileYes extends Component {
  render() {
    const { data } = this.props;
    return data.map((item, i) => {
      return (
        <React.Fragment key={item.username + i}>
          <a href={`${MEDIA_LS_URL}/u/${item.username}`} style={{ listStyle: 'none' }} className="custom-profile-img">
            <li className="nav-item">
              <img className="rounded" src={item.profile_image} alt={item.username} style={{ maxWidth: '40px', maxHeight: '40px' }} />
            </li>
          </a>
          <li className="nav-item dropdown" style={{ listStyle: 'none' }}>
            <a
              className="nav-link dropdown-toggle text-neutral-regular"
              href={`${MEDIA_LS_URL}/dashboard`}
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {item.username}
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown" style={{ minWidth: '5rem' }}>
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
  }
}

const mapStateToProps = state => ({
  data: state.user.items_user
});

export default connect(mapStateToProps)(RenderProfileYes);
