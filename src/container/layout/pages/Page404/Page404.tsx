import { Link } from 'react-router-dom';

import DogImage from '@/assets/images/404.png';

import './Page404.scss';

const Page404 = () => {
  return (
    <div className="page-container-404">
      <img src={DogImage} alt="" />
      <div className="detail-404">
        <div className="title">404</div>
        <div className="description-404">Oops, page not found</div>
        <div className="redirection-guide">
          please return to homepage by clicking <Link to={'/'}>here</Link>
        </div>
      </div>
    </div>
  );
};

export default Page404;
