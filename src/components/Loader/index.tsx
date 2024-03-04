import SpinnerIcon from "@/assets/icons/spinner.svg"

import { LoaderProps } from "./types"

import "./Loader.scss"

const Loader = ({ loading, overlay, children }: LoaderProps) => {

    if (!loading) {
        return <>{children}</>
    }

    return (
        <div className={`loader-container ${overlay ? "overlay" : "underlay"}`}>
            <div className="loader"><img src={SpinnerIcon} alt="" /></div>
        </div>
    )
}
export default Loader