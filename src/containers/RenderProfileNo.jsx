import React, { Component } from 'react';

import { MEDIA_LS_URL } from '../services/openurfu';

class RenderProfileNo extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="form-inline">
          <a href={`${MEDIA_LS_URL}/login`} id="href">
            <button className="u-button">
              <h4 className="u-fw-400">Вход</h4>
            </button>
          </a>
        </div>
      </React.Fragment>
    );
  }
}

export default RenderProfileNo;
