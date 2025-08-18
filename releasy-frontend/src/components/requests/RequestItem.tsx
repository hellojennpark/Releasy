import React, { useState } from "react";
import {
  RequestItem,
  RequestStatus,
  PipelineRequest,
  PermissionRequest,
} from "../../services/types/request";
import dayjs from "dayjs";
import { IconComponent } from "./IconComponent";

interface RequestItemProps {
  request: RequestItem;
  onUpdate: (
    requestId: string,
    status: RequestStatus,
    comment?: string
  ) => void;
}

const RequestItemComponent: React.FC<RequestItemProps> = ({
  request,
  onUpdate,
}) => {
  const [comment, setComment] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false);

  const handleApprove = () => {
    if (showCommentInput) {
      onUpdate(request.id, "approved", comment);
      setComment("");
      setShowCommentInput(false);
    } else {
      setShowCommentInput(true);
    }
  };

  const handleReject = () => {
    if (showCommentInput) {
      onUpdate(request.id, "rejected", comment);
      setComment("");
      setShowCommentInput(false);
    } else {
      setShowCommentInput(true);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("us-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderPipelineDetails = (details: PipelineRequest) => {
    return (
      <div className="request-details">
        <div className="detail-row">
          <span className="detail-label">Action:</span>
          <span
            className={`status-badge status-${details.action} include-icon`}
          >
            <IconComponent action={details.action} size={16} />
            {details.action}
          </span>
        </div>
        {details.pipelineName && (
          <div className="detail-row">
            <span className="detail-label">Pipeline:</span>
            <span className="detail-value">{details.pipelineName}</span>
          </div>
        )}
        {details.serverName && (
          <div className="detail-row">
            <span className="detail-label">Server:</span>
            <span className="server-tag">{details.serverName}</span>
          </div>
        )}
        {details.description && (
          <div className="detail-row">
            <span className="detail-label">Description:</span>
            <span className="detail-value">{details.description}</span>
          </div>
        )}
      </div>
    );
  };

  const renderPermissionDetails = (details: PermissionRequest) => {
    const roleText =
      details.roles.join(", ") + (details.includeOperator ? " + operator" : "");

    return (
      <div className="request-details">
        <div className="detail-row">
          <span className="detail-label">Permission:</span>
          <span className="type-badge include-icon">
            <IconComponent role={details.roles[0]} size={16} />
            {roleText.toUpperCase()}
          </span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Period:</span>
          <span className="detail-value">
            {details.startDate} ~ {details.endDate}
          </span>
          {details.startDate && details.endDate && (
            <span className="date-diff">
              ({dayjs(details.endDate).diff(dayjs(details.startDate), "day")}{" "}
              days)
            </span>
          )}
        </div>
        <div className="detail-row">
          <span className="detail-label">Target Servers:</span>
          <div className="server-list">
            {details.targetServers.map((server) => (
              <span key={server.id} className="server-tag">
                {server.name}
              </span>
            ))}
          </div>
        </div>
        <div className="detail-row">
          <span className="detail-label">Reason:</span>
          <span className="detail-value">{details.reason}</span>
        </div>
      </div>
    );
  };

  const getRequestTitle = () => {
    if (request.type === "pipeline") {
      const details = request.details as PipelineRequest;
      return `Pipeline ${details.action} request`;
    } else {
      const details = request.details as PermissionRequest;
      return `Permission request (${details.roles.join(", ")})`;
    }
  };

  return (
    <div className="request-item">
      <div className="request-item-header">
        <div className="request-item-info">
          <div className="request-item-title">{getRequestTitle()}</div>
          <div className="request-item-meta">
            <span>Requester: {request.requesterName}</span>
            <span>Requested: {formatDate(request.createdAt)}</span>
            {request.updatedAt && (
              <span>Processed: {formatDate(request.updatedAt)}</span>
            )}
          </div>
        </div>
        <div className="request-item-actions">
          <span className={`status-badge status-${request.status}`}>
            {request.status}
          </span>
          <span className="type-badge">{request.type.toUpperCase()}</span>
        </div>
      </div>

      {request.type === "pipeline"
        ? renderPipelineDetails(request.details as PipelineRequest)
        : renderPermissionDetails(request.details as PermissionRequest)}

      {/* Existing approval comment */}
      {request.approverComment && (
        <div className="existing-comment">
          <div className="comment-author">
            {request.approverName} (
            {request.status === "approved" ? "Approved" : "Rejected"})
          </div>
          <div className="comment-text">{request.approverComment}</div>
        </div>
      )}

      {/* Approval section for pending requests */}
      {request.canApprove && request.status === "pending" && (
        <div className="approval-section">
          {!showCommentInput ? (
            <div className="approval-actions">
              <button className="approve-button" onClick={handleApprove}>
                Approve
              </button>
              <button className="reject-button" onClick={handleReject}>
                Reject
              </button>
            </div>
          ) : (
            <div>
              <textarea
                className="comment-input"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Enter approval/rejection reason"
              />
              <div className="approval-actions" style={{ marginTop: "8px" }}>
                <button className="approve-button" onClick={handleApprove}>
                  Confirm Approval
                </button>
                <button className="reject-button" onClick={handleReject}>
                  Confirm Rejection
                </button>
                <button
                  className="toggle-button"
                  onClick={() => {
                    setShowCommentInput(false);
                    setComment("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RequestItemComponent;
