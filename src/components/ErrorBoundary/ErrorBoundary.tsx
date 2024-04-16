import { useRouteError } from "react-router-dom";

import DogImage from "@/assets/images/error.png";

import "./ErrorBoundary.scss";

const ErrorBoundary = () => {
  const error = useRouteError();

  return (
    <div className="page-container-error">
      <img src={DogImage} alt="" />
      <div className="error-detail">
        <div className="title">Something went wrong</div>
        <div className="error-description">{(error as Error)?.message}</div>
      </div>
    </div>
  );
};

export default ErrorBoundary;
