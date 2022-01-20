import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import "animate.css/animate.min.css";

class CourseList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.value.name,
      link:
        "//openedu.urfu.ru/files/courses_catalog/" +
        this.props.value.number +
        ".jpg",
      start_display: this.props.value.start_display,
      short_description: this.props.value.short_description
    };
  }

  truncate(str, len) {
    var dots = "...";
    var object = str.split(" ");
    var str_truncate = "";
    if (object.length > len) {
      str_truncate = object.splice(0, len).join(" ") + dots;
    } else {
      str_truncate = object.splice(0, len).join(" ");
    }
    return str_truncate;
  }

  description(str) {
    if (str === "") {
      str = "Ленивый преподаватель";
    }
    return str;
  }

  // fadeInUp
  render() {
    return (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div className="card animated fadeInRightBig">
          <div className="row no-gutters cardblock">
            <div className="col-auto">
              <div className="hovereffect">
                <img
                  className="img-fluid"
                  src={this.state.link}
                  alt={this.state.name}
                />
                <div className="overlay"></div>
              </div>
            </div>
            <div className="col cardbody">
              <div className="card-block px-2">
                <p className="d-inline-block">
                  <small className="text-muted">
                    <FontAwesomeIcon icon={faGraduationCap} size="1x" /> Ural
                    Fediral University
                  </small>
                </p>
                <p className="card-title">
                  <strong
                    style={{ overflow: "hidden", textOverflow: "ellipsis" }}
                  >
                    {this.state.name}
                  </strong>
                </p>
                <p className="card-text">
                  <small className="text-muted">
                    {this.description(this.state.short_description)}
                  </small>
                </p>
                <p className="card-text">
                  <FontAwesomeIcon icon={faClock} size="1x" /> Начало:{" "}
                  {this.state.start_display}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CourseList;
