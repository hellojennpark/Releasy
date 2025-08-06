import React from "react";
import { AppLayout } from "./components/common/Layout/AppLayout";
import "./App.css";
import DashboardPage from "./components/dashboard/DashboardPage";

function App() {
  return (
    <AppLayout activeMenuItem="dashboard">
      <DashboardPage />
    </AppLayout>
  );
}

export default App;
