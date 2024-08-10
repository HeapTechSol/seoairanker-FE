// import SpinnerIcon from "@/assets/icons/spinner.svg";
import LoadingIcon from '@/assets/icons/loader.gif'

import { LoaderProps } from './types'

import './Loader.scss'

const Loader = ({ loading, overlay = true, size = 0, children }: LoaderProps) => {
  if (!loading) {
    return <>{children}</>
  }

  return (
    <div className={`loader-container ${overlay ? 'overlay' : 'underlay'}`}>
      <div className="loader" style={{ width: size ? `${size}px` : '50px', height: size ? `${size}px` : '50px' }}>
        <img src={LoadingIcon} alt="loader" />
      </div>
    </div>
  )
}
export default Loader
