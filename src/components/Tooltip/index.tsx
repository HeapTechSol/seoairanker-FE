import React, { useState, ReactNode, useRef, useEffect } from 'react';
import './Tooltip.scss';

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [visible, setVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setVisible(true);
  };

  const handleMouseLeave = () => {
    setVisible(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setVisible(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className="tooltip-wrapper" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} ref={tooltipRef}>
      {children}
      {visible && <div className="tooltip-content">{content}</div>}
    </div>
  );
};

export default Tooltip;
