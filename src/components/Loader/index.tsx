// import SpinnerIcon from "@/assets/icons/spinner.svg";
import LoadingIcon from '@/assets/icons/loader.gif'

import { LoaderProps } from "./types";

import "./Loader.scss";

const Loader = ({ loading, overlay=true, children }: LoaderProps) => {
  if (!loading) {
    return <>{children}</>;
  }

  return (
    <div className={`loader-container ${overlay ? "overlay" : "underlay"}`}>
      <div className="loader">
        <img src={LoadingIcon} alt="" />
      </div>
    </div>
  );
};
export default Loader;
