export type RequestType = "pipeline" | "permission";
export type PipelineRequestAction = "create" | "modify" | "execute" | "stop";
export type PermissionRole =
  | "viewer"
  | "editor"
  | "operator"
  | "auditor"
  | "admin";
export type RequestStatus = "pending" | "approved" | "rejected" | "canceled";

export interface Server {
  id: string;
  name: string;
  environment?: string;
}

export interface PipelineRequest {
  type: "pipeline";
  action: PipelineRequestAction;
  pipelineId?: string;
  pipelineName?: string;
  serverId?: string;
  serverName?: string;
  executionId?: string;
  description?: string;
}

export interface PermissionRequest {
  type: "permission";
  roles: PermissionRole[];
  includeOperator: boolean;
  reason: string;
  startDate: string;
  endDate: string;
  targetServers: Server[];
}

export interface RequestItem {
  id: string;
  type: RequestType;
  status: RequestStatus;
  requesterId: string;
  requesterName: string;
  createdAt: string;
  updatedAt?: string;
  approverId?: string;
  approverName?: string;
  approverComment?: string;
  details: PipelineRequest | PermissionRequest;
  canApprove: boolean;
}

export interface RequestStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  pipelineRequests: number;
  permissionRequests: number;
  awaitingMyApproval: number;
}
