// components/common/Layout/MainContent.tsx
import React from "react";
import { PageHeader } from "../PageHeader/PageHeader";
import "./MainContent.css";

interface MainContentProps {
  children: React.ReactNode;
  isSidebarOpen?: boolean;
  isSidebarCollapsed?: boolean;
  pageTitle?: string;
  pageDescription?: string;
  showPageHeader?: boolean;
}

export const MainContent: React.FC<MainContentProps> = ({
  children,
  isSidebarOpen = true,
  isSidebarCollapsed = false,
  pageTitle,
  pageDescription,
  showPageHeader = true,
}) => {
  return (
    <main
      className={`main-content ${isSidebarOpen ? "sidebar-open" : ""} ${
        isSidebarCollapsed ? "sidebar-collapsed" : ""
      }`}
    >
      <div className="main-content-inner">
        {showPageHeader && pageTitle && pageDescription && (
          <PageHeader title={pageTitle} description={pageDescription} />
        )}
        {children}
      </div>
    </main>
  );
};
