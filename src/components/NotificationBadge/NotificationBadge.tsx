import React from 'react';
import './NotificationBadge.scss';

interface NotificationBadgeProps {
  count: number;
  icon: React.ReactNode;
  showZero?: boolean;
  maxCount?: number;
}

const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  count,
  icon,
  showZero = false,
  maxCount = 99
}) => {
  const displayCount = count > maxCount ? `${maxCount}+` : count.toString();

  return (
    <div className="notification-badge">
      {icon}
      {(count > 0 || showZero) && (
        <span className="notification-badge__count">
          {displayCount}
        </span>
      )}
    </div>
  );
};

export default NotificationBadge;