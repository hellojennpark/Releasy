import React from "react";
import { PipelineHistoryItem } from "../../services/types/pipeline";
import "../../styles/history.css";

interface HistoryTableProps {
  data: PipelineHistoryItem[];
  isLoading: boolean;
}

const HistoryTable: React.FC<HistoryTableProps> = ({ data, isLoading }) => {
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  const getStatusBadgeClass = (status: PipelineHistoryItem["status"]) => {
    const baseClass = "status-badge";
    switch (status) {
      case "running":
        return `${baseClass} status-running`;
      case "queued":
        return `${baseClass} status-queued`;
      case "success":
        return `${baseClass} status-success`;
      case "failed":
        return `${baseClass} status-failed`;
      case "canceled":
        return `${baseClass} status-canceled`;
      default:
        return baseClass;
    }
  };

  const getStatusDisplayText = (status: PipelineHistoryItem["status"]) => {
    switch (status) {
      case "running":
        return "Running";
      case "queued":
        return "Queued";
      case "success":
        return "Success";
      case "failed":
        return "Failed";
      case "canceled":
        return "Canceled";
      default:
        return status;
    }
  };

  if (isLoading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        Loading pipeline history...
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 12l2 2 4-4" />
            <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
          </svg>
        </div>
        <h3>No pipeline history found</h3>
        <p>Try adjusting your filters to see more results.</p>
      </div>
    );
  }

  return (
    <div className="history-table-wrapper">
      <table className="history-table">
        <thead>
          <tr>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Server</th>
            <th>Execution ID</th>
            <th>Pipeline Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{formatDateTime(item.startTime)}</td>
              <td>
                {item.endTime ? (
                  formatDateTime(item.endTime)
                ) : (
                  <span
                    style={{
                      color: "var(--text-secondary)",
                      fontStyle: "italic",
                    }}
                  >
                    In Progress
                  </span>
                )}
              </td>
              <td>
                <div>
                  <div style={{ fontWeight: "500" }}>{item.serverName}</div>
                  <div
                    style={{ fontSize: "12px", color: "var(--text-secondary)" }}
                  >
                    {item.serverId}
                  </div>
                </div>
              </td>
              <td>
                <code
                  style={{
                    fontSize: "12px",
                    background: "var(--bg-tertiary)",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    fontFamily: "monospace",
                  }}
                >
                  {item.executionId}
                </code>
              </td>
              <td>
                <div>
                  <div style={{ fontWeight: "500" }}>{item.executionName}</div>
                  <div
                    style={{ fontSize: "12px", color: "var(--text-secondary)" }}
                  >
                    {item.categoryName}
                  </div>
                </div>
              </td>
              <td>
                <span className={getStatusBadgeClass(item.status)}>
                  {getStatusDisplayText(item.status)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
