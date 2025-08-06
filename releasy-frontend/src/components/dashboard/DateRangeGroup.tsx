import React from "react";
import {
  DateRangeOption,
  DateRangeConfig,
} from "../../services/types/dashboard";
import "../../styles/components/date-range.css";

interface DateRangeGroupProps {
  value: DateRangeOption;
  onChange: (dateRange: DateRangeOption) => void;
}

const dateRangeConfigs: DateRangeConfig[] = [
  { label: "24H", value: "24h", hours: 24, comparisonLabel: "vs previous day" },
  {
    label: "3D",
    value: "3d",
    hours: 72,
    comparisonLabel: "vs previous 3 days",
  },
  { label: "7D", value: "7d", hours: 168, comparisonLabel: "vs previous week" },
  {
    label: "30D",
    value: "30d",
    hours: 720,
    comparisonLabel: "vs previous month",
  },
];

export const DateRangeGroup: React.FC<DateRangeGroupProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="date-range-group">
      {dateRangeConfigs.map((config) => (
        <button
          key={config.value}
          onClick={() => onChange(config.value)}
          className={`date-range-option ${
            value === config.value ? "active" : "inactive"
          }`}
        >
          {config.label}
        </button>
      ))}
    </div>
  );
};
