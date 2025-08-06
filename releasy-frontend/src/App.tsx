import React from "react";
import { AppLayout } from "./components/common/Layout/AppLayout";
import { DashboardPage } from "./components/dashboard/DashboardPage";
import "./App.css";

function App() {
  return (
    <AppLayout activeMenuItem="dashboard">
      <DashboardPage />
    </AppLayout>
  );
}

export default App;
