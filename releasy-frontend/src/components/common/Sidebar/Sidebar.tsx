import React from "react";
import { SidebarMenu, defaultMenuItems } from "./SidebarMenu";
import "./Sidebar.css";

interface SidebarProps {
  isOpen?: boolean;
  isCollapsed?: boolean;
  activeItemId?: string;
  onItemClick?: (itemId: string) => void;
  onToggleCollapse?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen = true,
  isCollapsed = false,
  activeItemId = "dashboard",
  onItemClick,
  onToggleCollapse,
}) => {
  return (
    <>
      {/* Mobile overlay - only show when sidebar is open */}
      <div
        className={`sidebar-overlay ${isOpen ? "show" : ""}`}
        onClick={() => onItemClick?.("close")}
      />

      <aside
        className={`sidebar ${isOpen ? "open" : ""} ${
          isCollapsed ? "collapsed" : ""
        }`}
      >
        <div className="sidebar-header">
          {!isCollapsed && (
            <div className="sidebar-user">
              <div className="sidebar-user-avatar">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div className="sidebar-user-info">
                <div className="sidebar-user-name">Admin User</div>
                <div className="sidebar-user-role">Administrator</div>
              </div>
            </div>
          )}

          <button
            onClick={onToggleCollapse}
            className="sidebar-toggle"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{
                transform: isCollapsed ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        </div>

        <div className="sidebar-content">
          <SidebarMenu
            items={defaultMenuItems}
            activeItemId={activeItemId}
            isCollapsed={isCollapsed}
            onItemClick={onItemClick}
          />
        </div>
      </aside>
    </>
  );
};
