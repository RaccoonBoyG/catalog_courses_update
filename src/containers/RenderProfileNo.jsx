import React, { Component } from "react";

import { MEDIA_LS_URL } from "../services/openurfu";

class RenderProfileNo extends Component {
  render() {
    return (
      <React.Fragment>
        {/* <div className="form-inline my-2 my-lg-0 mr-2">
            <a href={`${MEDIA_LS_URL}/register`} id="href">
            <button className="btn btn-outline-primary my-2 my-sm-0">Регистрация</button>  
            </a>
        </div> */}

        <div className="form-inline my-2 my-lg-0">
          <a href={`${MEDIA_LS_URL}/login`} id="href">
            <button className="btn btn-outline-primary my-2 my-sm-0">
              Вход
            </button>
          </a>
        </div>
      </React.Fragment>
    );
  }
}

export default RenderProfileNo;
