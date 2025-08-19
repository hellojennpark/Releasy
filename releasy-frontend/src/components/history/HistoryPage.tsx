import React, { useState, useEffect } from "react";
import { PipelineHistoryResponse } from "../../services/types/pipeline";
import { fetchPipelineHistory } from "../../services/api/history";
import { useHistoryFilters } from "../../hooks/useHistoryFilters";
import HistoryFilter from "./HistoryFilter";
import HistoryTable from "./HistoryTable";
import HistoryPagination from "./HistoryPagination";
import "../../styles/history.css";

const HistoryPage: React.FC = () => {
  const { filters, updateFilters, resetFilters, setPage } = useHistoryFilters();
  const [historyData, setHistoryData] =
    useState<PipelineHistoryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHistoryData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetchPipelineHistory(filters);
        setHistoryData(response);
      } catch (err) {
        console.error("Failed to fetch pipeline history:", err);
        setError("Failed to load pipeline history. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadHistoryData();
  }, [filters]);

  if (error) {
    return (
      <div className="history-page">
        <div className="history-header">
          <h1 className="history-title">Pipeline History</h1>
          <p className="history-subtitle">
            Track and monitor pipeline execution history
          </p>
        </div>

        <div
          style={{
            background: "var(--bg-secondary)",
            borderRadius: "12px",
            padding: "40px",
            textAlign: "center",
            color: "var(--text-secondary)",
          }}
        >
          <div style={{ marginBottom: "16px", fontSize: "48px" }}>⚠️</div>
          <h3 style={{ color: "var(--text-primary)", margin: "0 0 8px 0" }}>
            Error Loading Data
          </h3>
          <p style={{ margin: "0 0 16px 0" }}>{error}</p>
          <button
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="history-page">
      <HistoryFilter
        filters={filters}
        onFiltersChange={updateFilters}
        onReset={resetFilters}
      />

      <div className="history-table-container">
        <div className="table-header">
          <h2 className="table-title">Execution History</h2>
          {historyData && (
            <div className="table-info">
              {historyData.total} total executions
              {filters.dateStart ||
              filters.dateEnd ||
              filters.categories.length > 0 ||
              filters.servers.length > 0 ||
              filters.statuses.length > 0
                ? " (filtered)"
                : ""}
            </div>
          )}
        </div>

        <HistoryTable data={historyData?.data || []} isLoading={isLoading} />

        {historyData && historyData.totalPages > 1 && (
          <HistoryPagination
            currentPage={historyData.page}
            totalPages={historyData.totalPages}
            totalItems={historyData.total}
            itemsPerPage={historyData.limit}
            onPageChange={setPage}
          />
        )}
      </div>

      {historyData && !isLoading && (
        <div
          style={{
            marginTop: "24px",
            padding: "16px",
            background: "var(--bg-secondary)",
            borderRadius: "8px",
            fontSize: "14px",
            color: "var(--text-secondary)",
            textAlign: "center",
          }}
        >
          Last updated: {new Date().toLocaleString()} • Showing page{" "}
          {historyData.page} of {historyData.totalPages} •{historyData.total}{" "}
          total pipeline executions
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
