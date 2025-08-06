import React from "react";
import "./Dashboard.css";

export const DashboardPage: React.FC = () => {
  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-subtitle">
          Welcome to your DevOps Dashboard. Monitor your systems and track
          performance.
        </p>
      </div>

      <div className="dashboard-content">
        {/* Placeholder content */}
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Running Jobs</h3>
            <div className="metric-value">12</div>
            <div className="metric-change positive">+2 from yesterday</div>
          </div>

          <div className="dashboard-card">
            <h3>Success Rate</h3>
            <div className="metric-value">98.5%</div>
            <div className="metric-change positive">+0.3% from last week</div>
          </div>

          <div className="dashboard-card">
            <h3>Average Duration</h3>
            <div className="metric-value">2.4m</div>
            <div className="metric-change negative">+12s from yesterday</div>
          </div>

          <div className="dashboard-card">
            <h3>Active Servers</h3>
            <div className="metric-value">8</div>
            <div className="metric-change neutral">No change</div>
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon success">✓</div>
              <div className="activity-content">
                <div className="activity-title">
                  Build completed successfully
                </div>
                <div className="activity-time">2 minutes ago</div>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon running">⟳</div>
              <div className="activity-content">
                <div className="activity-title">Deployment in progress</div>
                <div className="activity-time">5 minutes ago</div>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon error">✗</div>
              <div className="activity-content">
                <div className="activity-title">Test suite failed</div>
                <div className="activity-time">12 minutes ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
