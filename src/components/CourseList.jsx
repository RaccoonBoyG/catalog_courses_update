import React, { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import "animate.css/animate.min.css";

const CourseList = ({ value }) => {
  const { name, number, start_display, short_description } = value;
  const link = `//openedu.urfu.ru/files/courses_catalog/${number}.jpg`;

  const truncate = useCallback((str, len) => {
    const dots = "...";
    const words = str.split(" ");
    if (words.length > len) {
      return words.slice(0, len).join(" ") + dots;
    }
    return words.join(" ");
  }, []);

  const description = useCallback((str) => {
    if (str === "") {
      return "Ленивый преподаватель";
    }
    return str;
  }, []);

  return (
    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
      <div className="card animated fadeInRightBig">
        <div className="row no-gutters cardblock">
          <div className="col-auto">
            <div className="hovereffect">
              <img
                className="img-fluid"
                src={link}
                alt={name}
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
                  {name}
                </strong>
              </p>
              <p className="card-text">
                <small className="text-muted">
                  {description(short_description)}
                </small>
              </p>
              <p className="card-text">
                <FontAwesomeIcon icon={faClock} size="1x" /> Начало:{" "}
                {start_display}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseList;
