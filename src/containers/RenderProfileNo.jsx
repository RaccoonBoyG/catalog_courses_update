import { MEDIA_LS_URL } from '../services/openurfu';
import { PiSignIn } from 'react-icons/pi';

const RenderProfileNo = () => (
  <a href={`${MEDIA_LS_URL}/login`} className="text-decoration-none">
    <button className="u-button d-flex align-items-center gap-1">
      <PiSignIn />
      <h4 className="u-fw-400 mb-0">Вход</h4>
    </button>
  </a>
);

export default RenderProfileNo;
