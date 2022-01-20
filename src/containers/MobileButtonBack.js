import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import { IconContext } from "react-icons";

const MobileButtonBack = props => {
  // console.log(props.history);

  return (
    <button className="btn text-light mt-2" onClick={props.history.goBack}>
      <IconContext.Provider value={{ size: "2em" }}>
        <IoMdArrowBack />
      </IconContext.Provider>
    </button>
  );
};

export default MobileButtonBack;
