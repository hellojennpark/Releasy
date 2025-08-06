import React, { useState, useEffect } from "react";
import { Header } from "../Header/Header";
import { Sidebar } from "../Sidebar/Sidebar";
import { MainContent } from "./MainContent";
import { useTheme } from "../../../hooks/useTheme";
import "./AppLayout.css";

interface AppLayoutProps {
  children: React.ReactNode;
  activeMenuItem?: string;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  activeMenuItem = "dashboard",
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { theme } = useTheme();

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

  const handleSidebarToggleCollapse = () => {
    if (!isMobile) {
      setIsSidebarCollapsed(!isSidebarCollapsed);
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
          onToggleCollapse={handleSidebarToggleCollapse}
        />

        <MainContent
          isSidebarOpen={!isMobile && isSidebarOpen}
          isSidebarCollapsed={!isMobile && isSidebarCollapsed}
        >
          {children}
        </MainContent>
      </div>
    </div>
  );
};
