import React from 'react';
import './CircularProgress.scss';

interface CircularProgressProps {
  total: number;
  current: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ total, current }) => {
  const percentage = (current / total) * 100;
  const dashArray = 2 * Math.PI * 45; // Assuming radius is 45
  const dashOffset = dashArray - (dashArray * percentage) / 100;

  return (
    <div className="circular-progress">
      <svg width="100" height="100" viewBox="0 0 100 100" className="circular-progress__svg">
        <circle
          className="circular-progress__bg"
          cx="50"
          cy="50"
          r="45"
          strokeWidth="10"
        />
        <circle
          className="circular-progress__progress"
          cx="50"
          cy="50"
          r="45"
          strokeWidth="10"
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
        />
      </svg>
      <div className="circular-progress__text">
        {Math.round(percentage)}%
      </div>
    </div>
  );
};

export default CircularProgress;
