type CellPropsTypes = {
  className?: string;
  isActive?: boolean;
  onClick?: () => void;
  onMouseEnter?: (e: React.SyntheticEvent) => void;
  onMouseOut?: () => void;
  children?: any;
};

import "./Cell.scss";

const Cell = ({
  onClick,
  children,
  onMouseEnter,
  onMouseOut,
  className='',
}: CellPropsTypes) => {
  return (
    <div
      className={`cell ${className}`}
      onMouseOut={onMouseOut}
      onClick={onClick}
      onMouseEnter={(e) => onMouseEnter?.(e)}
    >
      {children}
    </div>
  );
};

export default Cell;
