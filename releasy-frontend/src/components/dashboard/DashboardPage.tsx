import React, { useState, useEffect } from "react";
import {
  Server,
  DashboardData,
  DateRangeOption,
  DashboardFilters,
} from "../../services/types/dashboard";
import { CategoryFilter } from "./CategoryFilter";
import "../../styles/dashboard.css";
import { ServerMultiSelector } from "./ServerMultiSelector";
import { DateRangeGroup } from "./DateRangeGroup";
import { OverviewMetricsCards } from "./OverviewCards/OverviewMetricsCards";
import { DraggableTimelineChart } from "./DraggableTimelineChart";

const DashboardPage: React.FC = () => {
  const [servers, setServers] = useState<Server[]>([
    { id: "1", name: "Production-01", status: "online" },
    { id: "2", name: "Production-02", status: "online" },
    { id: "3", name: "Staging-01", status: "maintenance" },
    { id: "4", name: "Dev-01", status: "offline" },
  ]);

  const [filters, setFilters] = useState<DashboardFilters>({
    servers: ["1", "2"],
    dateRange: "24h",
    category: "all",
  });

  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const generateMockData = (): DashboardData => {
      const now = new Date();

      let dataPoints = 24;
      let intervalMs = 60 * 60 * 1000;

      switch (filters.dateRange) {
        case "3d":
          dataPoints = 3;
          intervalMs = 24 * 60 * 60 * 1000;
          break;
        case "7d":
          dataPoints = 7;
          intervalMs = 24 * 60 * 60 * 1000;
          break;
        case "30d":
          dataPoints = 30;
          intervalMs = 24 * 60 * 60 * 1000;
          break;
        default:
          dataPoints = 24;
          intervalMs = 60 * 60 * 1000;
      }

      const timeline = Array.from({ length: dataPoints }, (_, i) => ({
        timestamp: new Date(now.getTime() - (dataPoints - 1 - i) * intervalMs),
        success: Math.floor(Math.random() * 50) + 10,
        failed: Math.floor(Math.random() * 10) + 1,
        running: Math.floor(Math.random() * 15) + 5,
        queued: Math.floor(Math.random() * 20) + 2,
      }));

      const jobStatus = {
        running: Math.floor(Math.random() * 20),
        queued: Math.floor(Math.random() * 20),
        completed: Math.floor(Math.random() * 200),
        failed: Math.floor(Math.random() * 10),
      };

      const performance = {
        totalRuns: jobStatus.completed + jobStatus.failed,
        successRate: parseFloat(
          (
            (jobStatus.completed / (jobStatus.completed + jobStatus.failed)) *
            100
          ).toFixed(1)
        ),
        avgJobDuration: parseFloat((Math.random() * 200 + 50).toFixed(1)),
        avgQueueDuration: parseFloat((Math.random() * 30 + 10).toFixed(1)),
      };

      const comparisonData = {
        jobStatus: {
          running: Math.floor(Math.random() * 20),
          queued: Math.floor(Math.random() * 20),
          completed: Math.floor(Math.random() * 200),
          failed: Math.floor(Math.random() * 10),
        },
        performance: {
          totalRuns: Math.floor(Math.random() * 200),
          successRate: parseFloat((Math.random() * 10 + 85).toFixed(1)),
          avgJobDuration: parseFloat((Math.random() * 200 + 50).toFixed(1)),
          avgQueueDuration: parseFloat((Math.random() * 30 + 10).toFixed(1)),
        },
        changeRate: {
          running: parseFloat((Math.random() * 40 - 20).toFixed(1)),
          queued: parseFloat((Math.random() * 40 - 20).toFixed(1)),
          successRate: parseFloat((Math.random() * 5 - 2.5).toFixed(1)),
          avgJobDuration: parseFloat((Math.random() * 20 - 10).toFixed(1)),
          avgQueueDuration: parseFloat((Math.random() * 20 - 10).toFixed(1)),
        },
      };

      return {
        jobStatus,
        performance,
        timeline,
        comparisonData,
      };
    };

    // setLoading(true);
    // setTimeout(() => {
    //   setDashboardData(generateMockData());
    //   setLoading(false);
    // }, 1000);

    setDashboardData(generateMockData());
  }, [filters]);

  const handleServerChange = (selectedServers: string[]) => {
    setFilters((prev) => ({ ...prev, servers: selectedServers }));
  };

  const handleDateRangeChange = (dateRange: DateRangeOption) => {
    setFilters((prev) => ({ ...prev, dateRange }));
  };

  const handleCategoryChange = (category: string) => {
    setFilters((prev) => ({ ...prev, category }));
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="loading-title"></div>
          <div className="loading-grid">
            <div className="loading-card"></div>
            <div className="loading-card"></div>
            <div className="loading-card"></div>
          </div>
          <div className="loading-chart"></div>
        </div>
      </div>
    );
  }

  if (!dashboardData) return null;

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        {/* Header */}
        <div className="dashboard-header">
          {/* Filters */}
          <div className="dashboard-filters">
            <CategoryFilter
              value={filters.category || "all"}
              onChange={handleCategoryChange}
            />
            <ServerMultiSelector
              servers={servers}
              selectedServers={filters.servers}
              onChange={handleServerChange}
            />
            <DateRangeGroup
              value={filters.dateRange}
              onChange={handleDateRangeChange}
            />
          </div>
        </div>

        {/* Overview Cards */}
        <OverviewMetricsCards
          data={dashboardData}
          dateRange={filters.dateRange}
        />

        {/* Timeline Chart */}
        <div className="chart-container">
          <h2 className="chart-title">Job Timeline</h2>
          <DraggableTimelineChart
            data={dashboardData.timeline}
            dateRange={filters.dateRange}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
