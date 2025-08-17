import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/common/Layout/AppLayout";
import DashboardPage from "./components/dashboard/DashboardPage";
import HistoryPage from "./components/history/HistoryPage";
import "./styles/global.css";

import { useLocation } from "react-router-dom";
import RequestsPage from "./components/requests/RequestsPage";

const AppContent = () => {
  const location = useLocation();

  const getActiveMenuItem = (pathname: string): string => {
    if (pathname === "/") return "dashboard";
    if (pathname.startsWith("/dashboard")) return "dashboard";
    if (pathname.startsWith("/history")) return "history";
    if (pathname.startsWith("/requests")) return "requests";
    if (pathname.startsWith("/pipelines")) return "pipelines";
    if (pathname.startsWith("/settings")) return "settings";
    if (pathname.startsWith("/admin")) return "admin";

    return "dashboard";
  };

  const activeMenuItem = getActiveMenuItem(location.pathname);

  return (
    <AppLayout activeMenuItem={activeMenuItem}>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/requests" element={<RequestsPage />} />
      </Routes>
    </AppLayout>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
