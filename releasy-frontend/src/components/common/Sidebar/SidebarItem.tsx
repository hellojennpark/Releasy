import React from "react";
import { Link } from "react-router-dom";

export interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  isCollapsed?: boolean;
  onClick?: () => void;
  href?: string;
  badge?: number | string;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  isActive = false,
  isCollapsed = false,
  onClick,
  href,
  badge,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick && !href) {
      e.preventDefault();
      onClick();
    } else if (onClick && href) {
      onClick();
    }
  };

  if (href) {
    return (
      <Link
        to={href}
        onClick={handleClick}
        className={`sidebar-item ${isActive ? "active" : ""} ${
          isCollapsed ? "collapsed" : ""
        }`}
        title={isCollapsed ? label : undefined}
      >
        <div className="sidebar-item-icon">{icon}</div>

        {!isCollapsed && (
          <>
            <span className="sidebar-item-label">{label}</span>
            {badge && <span className="sidebar-item-badge">{badge}</span>}
          </>
        )}
      </Link>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`sidebar-item ${isActive ? "active" : ""} ${
        isCollapsed ? "collapsed" : ""
      }`}
      title={isCollapsed ? label : undefined}
    >
      <div className="sidebar-item-icon">{icon}</div>

      {!isCollapsed && (
        <>
          <span className="sidebar-item-label">{label}</span>
          {badge && <span className="sidebar-item-badge">{badge}</span>}
        </>
      )}
    </button>
  );
};
