import React from "react";
import { MdArrowUpward } from "react-icons/md";
import { IconContext } from "react-icons";
// MdArrowUpward
const ButtonScrollToTop = () => {
  return (
    <React.Fragment>
      <button type="button" className="back_to_top btn btn-primary btn-circle">
        <IconContext.Provider value={{ size: "1.5em" }}>
          <MdArrowUpward />
        </IconContext.Provider>
      </button>
    </React.Fragment>
  );
};

export default ButtonScrollToTop;
