import React from "react";
import { ButterflyIcon } from "@phosphor-icons/react";

import { SearchBar } from "./SearchBar";
import { ThemeToggle } from "./ThemeToggle";

import "./Header.css";
import { getEnvironmentMeta } from "../../../utils/env";

interface HeaderProps {
  onMenuToggle?: () => void;
  isSidebarOpen?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onMenuToggle,
  isSidebarOpen = true,
}) => {
  const { label, className } = getEnvironmentMeta();

  const handleSearch = (query: string) => {
    console.log("Search query:", query);
    // TODO: Implement search functionality
  };

  return (
    <header className="header">
      <div className="header-left">
        <button
          onClick={onMenuToggle}
          className="menu-toggle"
          aria-label="Toggle menu"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>

        <a className="logo" href="/" aria-label="Logo">
          <div className="logo-text">
            <ButterflyIcon weight="duotone" size={32} fill="#3b82f6" />
            <span>Releasy</span>
          </div>
          <span className={`environment-badge ${className}`}>{label}</span>
        </a>
      </div>

      <div className="header-center">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="header-right">
        <a
          href="https://github.com/hellojennpark/Releasy"
          target="_blank"
          rel="noopener noreferrer"
          className="header-link"
          aria-label="GitHub"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </a>

        <a
          href="https://releasy.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="header-link"
          aria-label="Documentation"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
        </a>

        <ThemeToggle />
      </div>
    </header>
  );
};
