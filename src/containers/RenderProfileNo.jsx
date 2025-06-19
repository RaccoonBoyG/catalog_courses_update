import { MEDIA_LS_URL } from '../services/openurfu';
import { PiSignIn } from 'react-icons/pi';

const RenderProfileNo = () => (
  <a href={`${MEDIA_LS_URL}/login`} className="login-button">
    <button className="u-button">
      <PiSignIn />
      <h4 className="u-fw-400">Вход</h4>
    </button>
  </a>
);

export default RenderProfileNo;
