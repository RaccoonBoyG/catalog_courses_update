import React, { Fragment } from "react";

export const backgroundUrl =
  "linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80 )";

let backgroundImg = {
  // backgroundImage: "linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80 )",
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat"
};

const HeaderBackground = props => (
  <Fragment>
    <div
      className="bg_img animated fadeIn faster"
      style={{
        ...backgroundImg,
        backgroundImage:
          props.url_image === undefined
            ? `${backgroundUrl}`
            : `linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ), url(${props.url_image})`,
        height: props.height === undefined ? `none` : `${props.height}%`
      }}
    ></div>
  </Fragment>
);

export default HeaderBackground;
