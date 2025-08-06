import React from "react";
import "./MainContent.css";

interface MainContentProps {
  children: React.ReactNode;
  isSidebarOpen?: boolean;
  isSidebarCollapsed?: boolean;
}

export const MainContent: React.FC<MainContentProps> = ({
  children,
  isSidebarOpen = true,
  isSidebarCollapsed = false,
}) => {
  return (
    <main
      className={`main-content ${isSidebarOpen ? "sidebar-open" : ""} ${
        isSidebarCollapsed ? "sidebar-collapsed" : ""
      }`}
    >
      <div className="main-content-inner">{children}</div>
    </main>
  );
};
