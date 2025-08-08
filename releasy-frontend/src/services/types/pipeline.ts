export interface PipelineHistoryItem {
  id: string;
  executionId: string;
  executionName: string;
  startTime: string;
  endTime?: string;
  serverId: string;
  serverName: string;
  categoryId: string;
  categoryName: string;
  status: "running" | "queued" | "canceled" | "success" | "failed";
}

export interface PipelineHistoryFilters {
  dateStart?: string;
  dateEnd?: string;
  categories: string[];
  servers: string[];
  statuses: string[];
  page: number;
  limit: number;
}

export interface PipelineHistoryResponse {
  data: PipelineHistoryItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PipelineFilterOption {
  id: string;
  name: string;
}
