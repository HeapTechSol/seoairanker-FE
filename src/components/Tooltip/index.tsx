import { classMapper } from '@/utils/helper';
import './Tooltip.scss';

export type TooltipTypes = {
  children: React.ReactNode | JSX.Element;
  title: React.ReactNode | JSX.Element | string;
  placement:
    | 'topleft'
    | 'topcenter'
    | 'topright'
    | 'lefttop'
    | 'leftcenter'
    | 'leftbottom'
    | 'righttop'
    | 'rightcenter'
    | 'rightbottom'
    | 'bottomleft'
    | 'bottomcenter'
    | 'bottomright';
};

const Tooltip = ({ children, title, placement }: TooltipTypes) => {
  const classes = classMapper('tooltip-container', { [placement]: placement });
  return (
    <div className={classes}>
      <div className="tooltip-container-title">{title}</div>
      <div className="tooltip-container-content">{children}</div>
    </div>
  );
};

export default Tooltip;
