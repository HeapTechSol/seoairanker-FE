import { Link } from 'react-router-dom';

import DogImage from 'assets/images/unauthorized.png';

import './UnAuthorized.scss';

const UnAuthorized = () => {
  return (
    <div className="page-container-401">
      <img src={DogImage} alt="" />
      <div className="detail-401">
        <div className="title">401</div>
        <div className="description-401">
          You are <span>Unauthorized</span> to access this page
        </div>
        <div className="redirection-guide">
          please return to homepage by clicking <Link to={'/'}>here</Link>
        </div>
      </div>
    </div>
  );
};

export default UnAuthorized;
