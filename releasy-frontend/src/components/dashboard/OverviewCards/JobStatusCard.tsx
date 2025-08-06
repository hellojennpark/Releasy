import React from "react";
import {
  TrendingUp,
  TrendingDown,
  Play,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import "../../../styles/components/cards.css";

interface JobStatusCardProps {
  title: string;
  value: number;
  changeRate: number;
  comparisonLabel: string;
  iconColor: "blue" | "green" | "yellow" | "red" | "purple" | "orange";
  changeColor: "positive" | "negative";
}

export const JobStatusCard: React.FC<JobStatusCardProps> = ({
  title,
  value,
  changeRate,
  comparisonLabel,
  iconColor,
  changeColor,
}) => {
  const getIcon = () => {
    const iconClass = `metric-card-icon ${iconColor}`;
    switch (title.toLowerCase()) {
      case "running jobs":
        return <Play className={iconClass} />;
      case "queued jobs":
        return <Clock className={iconClass} />;
      case "completed jobs":
        return <CheckCircle className={iconClass} />;
      case "failed jobs":
        return <XCircle className={iconClass} />;
      default:
        return <Play className={iconClass} />;
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

  return (
    <div className="metric-card">
      <div className="metric-card-header">
        <div className="metric-card-title-group">
          {getIcon()}
          <h3 className="metric-card-title">{title}</h3>
        </div>
      </div>

      <div className="metric-card-content">
        <div className="metric-card-value">{value.toLocaleString()}</div>

        <div className="metric-card-change">
          {changeIcon}
          <span className={changeTextClass}>
            {Math.abs(changeRate).toFixed(1)}%
          </span>
          <span className="metric-card-change-label">{comparisonLabel}</span>
        </div>
      </div>
    </div>
  );
};
