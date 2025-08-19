import React, { useState, useEffect } from "react";
import { Header } from "../Header/Header";
import { Sidebar } from "../Sidebar/Sidebar";
import { MainContent } from "./MainContent";
import { useTheme } from "../../../hooks/useTheme";
import "./AppLayout.css";
import { getPageInfo } from "../../../utils/pageConfig";

interface AppLayoutProps {
  children: React.ReactNode;
  activeMenuItem?: string;
  showPageHeader?: boolean;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  activeMenuItem = "dashboard",
  showPageHeader = true,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { theme } = useTheme();

  const pageInfo = getPageInfo(activeMenuItem);

  // Check if mobile screen
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
        setIsSidebarCollapsed(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMenuToggle = () => {
    if (isMobile) {
      setIsSidebarOpen(!isSidebarOpen);
    } else {
      setIsSidebarCollapsed(!isSidebarCollapsed);
    }
  };

  const handleSidebarItemClick = (itemId: string) => {
    console.log("Navigate to:", itemId);

    // Close sidebar on mobile after navigation
    if (isMobile && itemId !== "close") {
      setIsSidebarOpen(false);
    }

    // Handle close action
    if (itemId === "close") {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="app-layout" data-theme={theme}>
      <Header onMenuToggle={handleMenuToggle} isSidebarOpen={isSidebarOpen} />

      <div className="app-body">
        <Sidebar
          isOpen={isSidebarOpen}
          isCollapsed={!isMobile && isSidebarCollapsed}
          activeItemId={activeMenuItem}
          onItemClick={handleSidebarItemClick}
          onToggleCollapse={handleMenuToggle}
        />

        <MainContent
          isSidebarOpen={!isMobile && isSidebarOpen}
          isSidebarCollapsed={!isMobile && isSidebarCollapsed}
          pageTitle={pageInfo.title}
          pageDescription={pageInfo.description}
          showPageHeader={showPageHeader}
        >
          {children}
        </MainContent>
      </div>
    </div>
  );
};
