import { TruncateTextTypes } from './types';

import './TruncateText.scss';

const TruncateText = ({ text, width }: TruncateTextTypes) => {
  const style = { width: `${width}px` };

  return (
    <div className="truncate-text" style={style}>
      {text}
    </div>
  );
};

export default TruncateText;
