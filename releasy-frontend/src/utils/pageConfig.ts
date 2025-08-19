// utils/pageConfig.ts
export interface PageInfo {
  title: string;
  description: string;
  path: string;
}

export const PAGE_CONFIG: Record<string, PageInfo> = {
  dashboard: {
    title: "Dashboard",
    description:
      "Integrated dashboard for overview of entire deployment environment status.",
    path: "/",
  },
  history: {
    title: "Pipeline History",
    description: "Track and monitor pipeline execution history.",
    path: "/history",
  },
  requests: {
    title: "Request Management",
    description: "Manage your requests efficiently and effectively.",
    path: "/requests",
  },
  pipelines: {
    title: "Pipelines",
    description: "Configure and monitor your data processing pipelines.",
    path: "/pipelines",
  },
  settings: {
    title: "Settings",
    description: "Configure application settings and preferences.",
    path: "/settings",
  },
  admin: {
    title: "Administration",
    description: "Manage users, permissions, and system administration.",
    path: "/admin",
  },
};

export const getPageInfo = (pageKey: string): PageInfo => {
  return PAGE_CONFIG[pageKey] || PAGE_CONFIG.dashboard;
};
