import React from "react";
import {
  DashboardData,
  DateRangeOption,
} from "../../../services/types/dashboard";
import { JobStatusCard } from "./JobStatusCard";
import { PerformanceMetricsCard } from "./PerformanceMetricsCard";

interface OverviewMetricsCardsProps {
  data: DashboardData;
  dateRange: DateRangeOption;
}

export const OverviewMetricsCards: React.FC<OverviewMetricsCardsProps> = ({
  data,
  dateRange,
}) => {
  const getDateRangeLabel = (dateRange: DateRangeOption) => {
    switch (dateRange) {
      case "24h":
        return "vs previous day";
      case "3d":
        return "vs previous 3 days";
      case "7d":
        return "vs previous week";
      case "30d":
        return "vs previous month";
      default:
        return "vs previous period";
    }
  };

  const comparisonLabel = getDateRangeLabel(dateRange);

  return (
    <div className="metrics-grid">
      {/* Running Jobs */}
      <JobStatusCard
        title="Running Jobs"
        value={data.jobStatus.running}
        changeRate={data.comparisonData?.changeRate.running || 0}
        comparisonLabel={comparisonLabel}
        iconColor="blue"
        changeColor="positive"
      />

      {/* Queued Jobs */}
      <JobStatusCard
        title="Queued Jobs"
        value={data.jobStatus.queued}
        changeRate={data.comparisonData?.changeRate.queued || 0}
        comparisonLabel={comparisonLabel}
        iconColor="yellow"
        changeColor="negative"
      />

      {/* Success Rate */}
      <PerformanceMetricsCard
        title="Success Rate"
        value={data.performance.successRate}
        unit="%"
        changeRate={data.comparisonData?.changeRate.successRate || 0}
        comparisonLabel={comparisonLabel}
        iconColor="green"
        changeColor="positive"
      />

      {/* Average Job Duration */}
      <PerformanceMetricsCard
        title="Avg Job Duration"
        value={data.performance.avgJobDuration}
        unit="s"
        changeRate={data.comparisonData?.changeRate.avgJobDuration || 0}
        comparisonLabel={comparisonLabel}
        iconColor="purple"
        changeColor="negative"
      />

      {/* Average Queue Duration */}
      <PerformanceMetricsCard
        title="Avg Queue Duration"
        value={data.performance.avgQueueDuration}
        unit="s"
        changeRate={data.comparisonData?.changeRate.avgQueueDuration || 0}
        comparisonLabel={comparisonLabel}
        iconColor="orange"
        changeColor="negative"
      />

      {/* Total Runs */}
      <PerformanceMetricsCard
        title="Total Runs"
        value={data.performance.totalRuns}
        unit=""
        changeRate={
          ((data.performance.totalRuns -
            (data.comparisonData?.performance.totalRuns || 0)) /
            (data.comparisonData?.performance.totalRuns || 1)) *
          100
        }
        comparisonLabel={comparisonLabel}
        iconColor="blue"
        changeColor="positive"
      />

      {/* Completed Jobs */}
      <JobStatusCard
        title="Completed Jobs"
        value={data.jobStatus.completed}
        changeRate={
          ((data.jobStatus.completed -
            (data.comparisonData?.jobStatus.completed || 0)) /
            (data.comparisonData?.jobStatus.completed || 1)) *
          100
        }
        comparisonLabel={comparisonLabel}
        iconColor="green"
        changeColor="positive"
      />

      {/* Failed Jobs */}
      <JobStatusCard
        title="Failed Jobs"
        value={data.jobStatus.failed}
        changeRate={
          ((data.jobStatus.failed -
            (data.comparisonData?.jobStatus.failed || 0)) /
            (data.comparisonData?.jobStatus.failed || 1)) *
          100
        }
        comparisonLabel={comparisonLabel}
        iconColor="red"
        changeColor="negative"
      />
    </div>
  );
};
