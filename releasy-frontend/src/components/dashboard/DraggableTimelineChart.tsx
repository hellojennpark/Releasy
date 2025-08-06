import React, { useState, useRef, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  TimelineDataPoint,
  DateRangeOption,
} from "../../services/types/dashboard";
import "../../styles/components/chart.css";
export {};

interface DraggableTimelineChartProps {
  data: TimelineDataPoint[];
  dateRange: DateRangeOption;
}

interface ChartFilters {
  success: boolean;
  failed: boolean;
  running: boolean;
  queued: boolean;
}

export const DraggableTimelineChart: React.FC<DraggableTimelineChartProps> = ({
  data,
  dateRange,
}) => {
  const [filters, setFilters] = useState<ChartFilters>({
    success: true,
    failed: true,
    running: true,
    queued: true,
  });

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const chartRef = useRef<HTMLDivElement>(null);

  const formatXAxisLabel = (timestamp: string | Date) => {
    const date = new Date(timestamp);
    switch (dateRange) {
      case "24h":
        return date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        });
      case "3d":
      case "7d":
        return date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
      case "30d":
        return date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
      default:
        return date.toLocaleDateString();
    }
  };

  const formattedData = data.map((point) => ({
    ...point,
    timestamp: formatXAxisLabel(point.timestamp),
  }));

  const toggleFilter = (key: keyof ChartFilters) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filterConfigs = [
    {
      key: "success" as keyof ChartFilters,
      label: "Success",
      indicatorClass: "success",
    },
    {
      key: "failed" as keyof ChartFilters,
      label: "Failed",
      indicatorClass: "failed",
    },
    {
      key: "running" as keyof ChartFilters,
      label: "Running",
      indicatorClass: "running",
    },
    {
      key: "queued" as keyof ChartFilters,
      label: "Queued",
      indicatorClass: "queued",
    },
  ];

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !chartRef.current) return;

      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;

      // Update chart position (you can implement actual drag logic here)
      console.log("Dragging:", { deltaX, deltaY });
    },
    [isDragging, dragStart]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip">
          <p className="chart-tooltip-label">{`Time: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p
              key={index}
              style={{ color: entry.color }}
              className="chart-tooltip-item"
            >
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-section">
      {/* Chart Filters */}
      <div className="chart-filters">
        <div className="chart-filters-label">
          <span className="chart-filters-text">Filter status:</span>
        </div>
        {filterConfigs.map(({ key, label, indicatorClass }) => (
          <button
            key={key}
            onClick={() => toggleFilter(key)}
            className={`chart-filter-button ${
              filters[key] ? "active" : "inactive"
            }`}
          >
            <div
              className={`chart-filter-indicator ${
                filters[key] ? indicatorClass : "inactive"
              }`}
            />
            {label}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div
        ref={chartRef}
        className={`chart-wrapper ${isDragging ? "dragging" : ""}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={formattedData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />

            {filters.success && (
              <Line
                type="monotone"
                dataKey="success"
                name="Success"
                stroke="#10B981"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            )}
            {filters.failed && (
              <Line
                type="monotone"
                dataKey="failed"
                name="Failed"
                stroke="#EF4444"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            )}
            {filters.running && (
              <Line
                type="monotone"
                dataKey="running"
                name="Running"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            )}
            {filters.queued && (
              <Line
                type="monotone"
                dataKey="queued"
                name="Queued"
                stroke="#F59E0B"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
