import React from "react";

import { MEDIA_LS_URL } from "../services/openurfu";

// class MyCourses extends Component {

// 	render(){
//         return (
//             <li className="nav-item">
//                 <a href={`${MEDIA_LS_URL}/dashboard`} className="nav-link">Мои курсы</a>
//             </li>
//         )
//     }
// }

// export default MyCourses;

const MyCourses = () => {
  return (
    <li className="nav-item">
      <a href={`${MEDIA_LS_URL}/dashboard`} className="nav-link">
        Мои курсы
      </a>
    </li>
  );
};

export default MyCourses;
