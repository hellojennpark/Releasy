import React from "react";
import {
  TrendingUp,
  TrendingDown,
  Target,
  Timer,
  Activity,
  BarChart3,
} from "lucide-react";
import "../../../styles/components/cards.css";

interface PerformanceMetricsCardProps {
  title: string;
  value: number;
  unit: string;
  changeRate: number;
  comparisonLabel: string;
  iconColor: "blue" | "green" | "yellow" | "red" | "purple" | "orange";
  changeColor: "positive" | "negative";
}

export const PerformanceMetricsCard: React.FC<PerformanceMetricsCardProps> = ({
  title,
  value,
  unit,
  changeRate,
  comparisonLabel,
  iconColor,
  changeColor,
}) => {
  const getIcon = () => {
    const iconClass = `metric-card-icon ${iconColor}`;
    switch (title.toLowerCase()) {
      case "success rate":
        return <Target className={iconClass} />;
      case "avg job duration":
        return <Timer className={iconClass} />;
      case "avg queue duration":
        return <Activity className={iconClass} />;
      case "total runs":
        return <BarChart3 className={iconClass} />;
      default:
        return <Activity className={iconClass} />;
    }
  };

  const formatValue = (value: number, unit: string) => {
    if (unit === "%") {
      return `${value.toFixed(1)}${unit}`;
    } else if (unit === "s") {
      if (value >= 60) {
        const minutes = Math.floor(value / 60);
        const seconds = (value % 60).toFixed(1);
        return `${minutes}m ${seconds}s`;
      }
      return `${value.toFixed(1)}${unit}`;
    } else {
      return value.toLocaleString();
    }
  };

  const isPositiveChange =
    changeColor === "positive" ? changeRate > 0 : changeRate < 0;
  const changeIcon = isPositiveChange ? (
    <TrendingUp className="metric-card-change-icon positive" />
  ) : (
    <TrendingDown className="metric-card-change-icon negative" />
  );

  const changeTextClass = isPositiveChange
    ? "metric-card-change-text positive"
    : "metric-card-change-text negative";

  // Special handling for duration metrics - show actual change in time
  const getChangeDisplay = () => {
    if (unit === "s") {
      const changeValue = (Math.abs(changeRate) / 100) * value;
      if (changeValue >= 60) {
        const minutes = Math.floor(changeValue / 60);
        const seconds = (changeValue % 60).toFixed(1);
        return `${minutes}m ${seconds}s`;
      }
      return `${changeValue.toFixed(1)}s`;
    }
    return `${Math.abs(changeRate).toFixed(1)}%`;
  };

  return (
    <div className="metric-card">
      <div className="metric-card-header">
        <div className="metric-card-title-group">
          {getIcon()}
          <h3 className="metric-card-title">{title}</h3>
        </div>
      </div>

      <div className="metric-card-content">
        <div className="metric-card-value">{formatValue(value, unit)}</div>

        <div className="metric-card-change">
          {changeIcon}
          <span className={changeTextClass}>
            {unit === "s" ? (changeRate > 0 ? "+" : "-") : ""}
            {getChangeDisplay()}
          </span>
          <span className="metric-card-change-label">{comparisonLabel}</span>
        </div>
      </div>
    </div>
  );
};
