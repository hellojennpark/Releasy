import React from "react";
import { Link } from "react-router-dom";

export interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  isCollapsed?: boolean;
  isActivate?: boolean;
  onClick?: () => void;
  href?: string;
  badge?: number | string;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  isActive = false,
  isCollapsed = false,
  isActivate = true, // 기본값을 true로 설정
  onClick,
  href,
  badge,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    // isActivate가 false면 클릭 이벤트 차단
    if (!isActivate) {
      e.preventDefault();
      return;
    }

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
        } ${!isActivate ? "disabled" : ""}`}
        title={isCollapsed ? label : undefined}
        style={{
          pointerEvents: !isActivate ? "none" : "auto",
          color: !isActivate ? "#999" : "inherit",
          opacity: !isActivate ? 0.6 : 1,
          cursor: !isActivate ? "not-allowed" : "pointer",
        }}
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
      disabled={!isActivate} // button의 경우 disabled 속성 사용
      className={`sidebar-item ${isActive ? "active" : ""} ${
        isCollapsed ? "collapsed" : ""
      } ${!isActivate ? "disabled" : ""}`}
      title={isCollapsed ? label : undefined}
      style={{
        color: !isActivate ? "#999" : "inherit",
        opacity: !isActivate ? 0.6 : 1,
        cursor: !isActivate ? "not-allowed" : "pointer",
      }}
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
