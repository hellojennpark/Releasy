import React, { useState, useMemo } from "react";
import {
  RequestType,
  PipelineRequestAction,
  PermissionRole,
  Server,
} from "../../services/types/request";
import {
  mockRequestList,
  mockRequestStats,
  mockServers,
  mockPipelineHistory,
} from "../../utils/requestMockData";
import RequestList from "./RequestList";
import "../../styles/requests.css";
import { PipelineHistoryItem } from "../../services/types/pipeline";

type PageMode = "create" | "list";

interface HistoryTableProps {
  data: PipelineHistoryItem[];
  isLoading: boolean;
  onSelect?: (item: PipelineHistoryItem) => void;
  selectable?: boolean;
}

const HistoryTable: React.FC<HistoryTableProps> = ({
  data,
  isLoading,
  onSelect,
  selectable = false,
}) => {
  if (isLoading) {
    return <div className="no-data">Loading...</div>;
  }

  if (data.length === 0) {
    return <div className="no-data">No data available.</div>;
  }

  return (
    <table className="pipeline-history-table">
      <thead>
        <tr>
          <th>Execution Name</th>
          <th>Server</th>
          <th>Category</th>
          <th>Start Time</th>
          <th>Status</th>
          {selectable && <th>Select</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.executionName}</td>
            <td>{item.serverName}</td>
            <td>{item.categoryName}</td>
            <td>{new Date(item.startTime).toLocaleString()}</td>
            <td>
              <span className={`pipeline-status ${item.status}`}>
                {item.status}
              </span>
            </td>
            {selectable && (
              <td>
                <button
                  className="select-button"
                  onClick={() => onSelect?.(item)}
                >
                  Select
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const RequestsPage: React.FC = () => {
  const [pageMode, setPageMode] = useState<PageMode>("list");
  const [requestType, setRequestType] = useState<RequestType>("pipeline");
  const [pipelineAction, setPipelineAction] =
    useState<PipelineRequestAction | null>(null);

  // Permission form state
  const [selectedRoles, setSelectedRoles] = useState<PermissionRole[]>([]);
  const [includeOperator, setIncludeOperator] = useState(false);
  const [reason, setReason] = useState("");
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState("");
  const [selectedServers, setSelectedServers] = useState<Server[]>([]);
  const [selectedPipeline, setSelectedPipeline] =
    useState<PipelineHistoryItem | null>(null);

  // Filter pipeline data based on action
  const filteredPipelineData = useMemo(() => {
    if (pipelineAction === "execute") {
      return mockPipelineHistory.filter(
        (item) => item.status === "queued" || item.status === "running"
      );
    }
    if (pipelineAction === "stop") {
      return mockPipelineHistory.filter((item) => item.status === "running");
    }
    return [];
  }, [pipelineAction]);

  const handleServerChange = (server: Server) => {
    setSelectedServers((prev) =>
      prev.find((s) => s.id === server.id)
        ? prev.filter((s) => s.id !== server.id)
        : [...prev, server]
    );
  };

  const handleSubmitPermissionRequest = () => {
    if (
      selectedRoles.length === 0 ||
      !reason ||
      !endDate ||
      selectedServers.length === 0
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    // Here you would normally submit to an API
    console.log("Permission request submitted:", {
      roles: selectedRoles,
      includeOperator,
      reason,
      startDate,
      endDate,
      servers: selectedServers,
    });

    alert("Permission request has been submitted.");

    // Reset form
    setSelectedRoles([]);
    setIncludeOperator(false);
    setReason("");
    setStartDate(new Date().toISOString().split("T")[0]);
    setEndDate("");
    setSelectedServers([]);
  };

  const handleSubmitPipelineRequest = () => {
    if (!pipelineAction || !selectedPipeline) {
      alert("Please select a pipeline and action.");
      return;
    }

    // Here you would normally submit to an API
    console.log("Pipeline request submitted:", {
      action: pipelineAction,
      pipeline: selectedPipeline,
    });

    alert("Pipeline request has been submitted.");

    // Reset form
    setPipelineAction(null);
    setSelectedPipeline(null);
  };

  const renderRequestForm = () => {
    return (
      <div className="request-form-container">
        <div className="step-header">
          <h2 className="step-title">Step 1: Select Request Type</h2>
        </div>

        <div className="request-type-selector">
          <div
            className={`type-option ${
              requestType === "pipeline" ? "selected" : ""
            }`}
            onClick={() => setRequestType("pipeline")}
          >
            <div className="type-option-title">Pipeline Request</div>
            <div className="type-option-description">
              Request for pipeline creation, modification, execution, or
              termination
            </div>
          </div>
          <div
            className={`type-option ${
              requestType === "permission" ? "selected" : ""
            }`}
            onClick={() => setRequestType("permission")}
          >
            <div className="type-option-title">Permission Request</div>
            <div className="type-option-description">
              Request for server access permissions
            </div>
          </div>
        </div>

        {requestType === "pipeline" && (
          <div>
            <div className="step-header">
              <h2 className="step-title">Step 2: Select Pipeline Action</h2>
            </div>

            <div className="pipeline-actions">
              <div
                className="action-card clickable"
                onClick={() => (window.location.href = "/pipeline/create")}
              >
                <div className="action-title">Create Request</div>
                <div className="action-description">
                  Request to create a new pipeline
                </div>
                <div className="action-links">
                  <span className="action-link">Create Request</span>
                </div>
              </div>

              <div
                className="action-card clickable"
                onClick={() => (window.location.href = "/pipeline/modify")}
              >
                <div className="action-title">Modify Request</div>
                <div className="action-description">
                  Request to modify an existing pipeline
                </div>
                <div className="action-links">
                  <span className="action-link">Modify Request</span>
                  <span className="action-link secondary">Guide</span>
                </div>
              </div>

              <div
                className={`action-card clickable ${
                  pipelineAction === "execute" ? "selected" : ""
                }`}
                onClick={() => setPipelineAction("execute")}
              >
                <div className="action-title">Execute Request</div>
                <div className="action-description">
                  Request to execute a pipeline
                </div>
              </div>

              <div
                className={`action-card clickable ${
                  pipelineAction === "stop" ? "selected" : ""
                }`}
                onClick={() => setPipelineAction("stop")}
              >
                <div className="action-title">Stop Request</div>
                <div className="action-description">
                  Request to stop a running pipeline
                </div>
              </div>
            </div>

            {(pipelineAction === "execute" || pipelineAction === "stop") && (
              <div>
                <div className="step-header">
                  <h2 className="step-title">Step 3: Select Pipeline</h2>
                </div>

                <HistoryTable
                  data={filteredPipelineData}
                  isLoading={false}
                  onSelect={setSelectedPipeline}
                  selectable={true}
                />

                {selectedPipeline && (
                  <div
                    className="request-details"
                    style={{ marginTop: "16px" }}
                  >
                    <div className="detail-row">
                      <span className="detail-label">Selected Pipeline:</span>
                      <span className="detail-value">
                        {selectedPipeline.executionName}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Server:</span>
                      <span className="detail-value">
                        {selectedPipeline.serverName}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Status:</span>
                      <span className="detail-value">
                        <span
                          className={`pipeline-status ${selectedPipeline.status}`}
                        >
                          {selectedPipeline.status}
                        </span>
                      </span>
                    </div>
                  </div>
                )}

                <button
                  className="submit-button"
                  onClick={handleSubmitPipelineRequest}
                  disabled={!selectedPipeline}
                  style={{ marginTop: "16px" }}
                >
                  Submit Request
                </button>
              </div>
            )}
          </div>
        )}

        {requestType === "permission" && (
          <div>
            <div className="step-header">
              <h2 className="step-title">
                Step 2: Configure Permission Request
              </h2>
            </div>

            <div className="permission-form">
              <div className="form-section">
                <div className="form-section-title">Permission Type *</div>
                <div className="role-selection">
                  {(
                    ["viewer", "editor", "auditor", "admin"] as PermissionRole[]
                  ).map((role) => (
                    <div
                      key={role}
                      className={`role-checkbox ${
                        selectedRoles.includes(role) ? "selected" : ""
                      }`}
                      onClick={() => setSelectedRoles([role])}
                    >
                      <input
                        type="radio"
                        name="role"
                        checked={selectedRoles.includes(role)}
                        onChange={() => setSelectedRoles([role])}
                      />
                      <span>{role}</span>
                    </div>
                  ))}
                </div>

                {(selectedRoles.includes("viewer") ||
                  selectedRoles.includes("editor")) && (
                  <div className="operator-option">
                    <label className="role-checkbox">
                      <input
                        type="checkbox"
                        checked={includeOperator}
                        onChange={(e) => setIncludeOperator(e.target.checked)}
                      />
                      <span>Include Operator Permission</span>
                    </label>
                  </div>
                )}
              </div>

              <div className="form-section">
                <div className="form-section-title">Request Reason *</div>
                <textarea
                  className="form-textarea"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Please provide detailed reason for requesting this permission"
                />
              </div>

              <div className="form-section">
                <div className="form-section-title">Permission Period *</div>
                <div className="date-inputs">
                  <div>
                    <label>Start Date</label>
                    <input
                      type="date"
                      className="form-input"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>End Date</label>
                    <input
                      type="date"
                      className="form-input"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <div className="form-section-title">Target Servers *</div>
                <div className="server-selection">
                  {mockServers.map((server) => (
                    <div
                      key={server.id}
                      className="server-option"
                      onClick={() => handleServerChange(server)}
                    >
                      <input
                        type="checkbox"
                        checked={
                          selectedServers.find((s) => s.id === server.id) !==
                          undefined
                        }
                        onChange={() => handleServerChange(server)}
                      />
                      <div className="server-info">
                        <div className="server-name">{server.name}</div>
                        {server.environment && (
                          <div className="server-env">{server.environment}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className="submit-button"
                onClick={handleSubmitPermissionRequest}
              >
                Submit Permission Request
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="requests-page">
      <div className="requests-header">
        <h1 className="requests-title">Request Management</h1>
        <div className="page-toggle">
          <button
            className={`toggle-button ${pageMode === "create" ? "active" : ""}`}
            onClick={() => setPageMode("create")}
          >
            Create Request
          </button>
          <button
            className={`toggle-button ${pageMode === "list" ? "active" : ""}`}
            onClick={() => setPageMode("list")}
          >
            Request List
          </button>
        </div>
      </div>

      {pageMode === "create" && renderRequestForm()}
      {pageMode === "list" && (
        <RequestList requests={mockRequestList} stats={mockRequestStats} />
      )}
    </div>
  );
};

export default RequestsPage;
