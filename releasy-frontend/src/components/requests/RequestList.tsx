import React, { useState, useMemo } from "react";
import {
  RequestItem,
  RequestStats,
  RequestType,
  RequestStatus,
} from "../../services/types/request";
import RequestItemComponent from "./RequestItem";

interface RequestListProps {
  requests: RequestItem[];
  stats: RequestStats;
}

const RequestList: React.FC<RequestListProps> = ({ requests, stats }) => {
  const [typeFilter, setTypeFilter] = useState<RequestType | "all">("all");
  const [statusFilter, setStatusFilter] = useState<RequestStatus | "all">(
    "all"
  );
  const [approvalFilter, setApprovalFilter] = useState<
    "all" | "mine" | "awaiting"
  >("all");

  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      if (typeFilter !== "all" && request.type !== typeFilter) return false;
      if (statusFilter !== "all" && request.status !== statusFilter)
        return false;
      if (
        approvalFilter === "awaiting" &&
        (!request.canApprove || request.status !== "pending")
      )
        return false;
      if (approvalFilter === "mine" && request.requesterId !== "user-001")
        return false; // Mock current user
      return true;
    });
  }, [requests, typeFilter, statusFilter, approvalFilter]);

  const handleRequestUpdate = (
    requestId: string,
    status: RequestStatus,
    comment?: string
  ) => {
    // Here you would normally call an API to update the request
    console.log("Request updated:", { requestId, status, comment });
    // For now, just show an alert
    alert(
      `Request has been ${status === "approved" ? "approved" : "rejected"}.`
    );
  };

  const handleStatCardClick = (filterType: string) => {
    switch (filterType) {
      case "total":
        setTypeFilter("all");
        setStatusFilter("all");
        setApprovalFilter("all");
        break;
      case "pending":
        setTypeFilter("all");
        setStatusFilter("pending");
        setApprovalFilter("all");
        break;
      case "pipeline":
        setTypeFilter("pipeline");
        setStatusFilter("all");
        setApprovalFilter("all");
        break;
      case "permission":
        setTypeFilter("permission");
        setStatusFilter("all");
        setApprovalFilter("all");
        break;
      case "awaiting":
        setTypeFilter("all");
        setStatusFilter("pending");
        setApprovalFilter("awaiting");
        break;
      default:
        break;
    }
  };

  return (
    <div>
      {/* Stats Cards */}
      <div className="request-stats">
        <div
          className="stat-card clickable"
          onClick={() => handleStatCardClick("total")}
        >
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Total Requests</div>
        </div>
        <div
          className="stat-card clickable"
          onClick={() => handleStatCardClick("pending")}
        >
          <div className="stat-number">{stats.pending}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div
          className="stat-card clickable"
          onClick={() => handleStatCardClick("pipeline")}
        >
          <div className="stat-number">{stats.pipelineRequests}</div>
          <div className="stat-label">Pipeline Requests</div>
        </div>
        <div
          className="stat-card clickable"
          onClick={() => handleStatCardClick("permission")}
        >
          <div className="stat-number">{stats.permissionRequests}</div>
          <div className="stat-label">Permission Requests</div>
        </div>
        <div
          className="stat-card highlight clickable"
          onClick={() => handleStatCardClick("awaiting")}
        >
          <div className="stat-number">{stats.awaitingMyApproval}</div>
          <div className="stat-label">Awaiting My Approval</div>
        </div>
      </div>

      {/* Filters */}
      <div className="request-filters">
        <select
          className="filter-select"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as RequestType | "all")}
        >
          <option value="all">All Types</option>
          <option value="pipeline">Pipeline</option>
          <option value="permission">Permission</option>
        </select>

        <select
          className="filter-select"
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as RequestStatus | "all")
          }
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>

        <select
          className="filter-select"
          value={approvalFilter}
          onChange={(e) =>
            setApprovalFilter(e.target.value as "all" | "mine" | "awaiting")
          }
        >
          <option value="all">All Requests</option>
          <option value="mine">My Requests</option>
          <option value="awaiting">Awaiting My Approval</option>
        </select>
      </div>

      {/* Request List */}
      <div className="requests-list">
        {filteredRequests.length === 0 ? (
          <div className="no-data">No requests match the criteria.</div>
        ) : (
          filteredRequests.map((request) => (
            <RequestItemComponent
              key={request.id}
              request={request}
              onUpdate={handleRequestUpdate}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default RequestList;
