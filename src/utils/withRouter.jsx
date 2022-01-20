import { useLocation, useNavigate, useParams } from 'react-router-dom';

// withRouter to deprecated react router dom v6 :(

export default function withRouter( Child ) {
    return ( props ) => {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
    //   let match = useMatch();
      return <Child { ...props } navigate={ navigate } location={ location } params={ params } />;
    }
  }