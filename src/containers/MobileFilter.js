import React from "react";

const MobileFilter = ({
  _handleTextChange,
  submitSearch,
  resetInput,
  term
}) => {
  return (
    <div className="mobile-menu menu-open">
      <ul className="menu">
        <li className="menu-item">
          <p>
            <input
              type="text"
              className="form-control search-slt"
              placeholder="Найти"
              onChange={e => _handleTextChange(e)}
              value={term}
            />
          </p>
        </li>
        <li
          className="menu-item d-flex flex-column"
          style={{ width: "100% !important" }}
        >
          <button
            className="button-filter btn btn-primary"
            onClick={submitSearch}
          >
            Показать
          </button>
          <button
            className="button-filter btn btn-primary-dark"
            onClick={resetInput}
          >
            Сбросить
          </button>
        </li>
      </ul>
    </div>
  );
};

export default MobileFilter;
