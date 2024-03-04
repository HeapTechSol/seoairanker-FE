// import { Component } from 'react';

// const ErrorView = ({ error, errorInfo }: any) => (
//   <div>
//     <h2>Something went wrong.</h2>
//     <details>
//       {error && error.toString()}
//       <br />
//       {errorInfo.componentStack}
//     </details>
//   </div>
// );

// type Props = {
//   children: React.ReactNode;
// };

// type State = {
//   error: boolean | null | string;
//   errorInfo: string | null;
// };

// export default class ErrorBoundary extends Component<Props, State> {
//   constructor(props: any) {
//     super(props);
//     this.state = { error: null, errorInfo: null };
//   }

//   componentDidCatch(error: any, errorInfo: any) {
//     this.setState({
//       error: error,
//       errorInfo: errorInfo,
//     });
//   }

//   render() {
//     const { error, errorInfo } = this.state;
//     if (errorInfo) {
//       return <ErrorView {...{ error, errorInfo }} />;
//     }
//     return this.props.children;
//   }
// }

import { useRouteError } from 'react-router-dom';

import DogImage from '@/assets/images/error.png';

import './ErrorBoundary.scss';

const ErrorBoundary = () => {
  const error = useRouteError();

  return (
    <div className="page-container-error">
      <img src={DogImage} alt="" />
      <div className="error-detail">
        <div className="title">Something went wrong</div>
        <div className='error-description'>{(error as Error)?.message}</div>
      </div>
    </div>
  );
};

export default ErrorBoundary;
