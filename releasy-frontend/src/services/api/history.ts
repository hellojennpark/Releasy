import { mockPipelineHistory } from "../../utils/mockData";
import {
  PipelineFilterOption,
  PipelineHistoryFilters,
  PipelineHistoryResponse,
} from "../types/pipeline";

export const fetchPipelineHistory = async (
  filters: PipelineHistoryFilters
): Promise<PipelineHistoryResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  let filteredData = [...mockPipelineHistory];

  if (filters.dateStart) {
    const startDate = new Date(filters.dateStart);
    filteredData = filteredData.filter(
      (item) => new Date(item.startTime) >= startDate
    );
  }

  if (filters.dateEnd) {
    const endDate = new Date(filters.dateEnd);
    endDate.setHours(23, 59, 59, 999);
    filteredData = filteredData.filter(
      (item) => new Date(item.startTime) <= endDate
    );
  }

  if (filters.categories.length > 0) {
    filteredData = filteredData.filter((item) =>
      filters.categories.includes(item.categoryId)
    );
  }

  if (filters.servers.length > 0) {
    filteredData = filteredData.filter((item) =>
      filters.servers.includes(item.serverId)
    );
  }

  if (filters.statuses.length > 0) {
    filteredData = filteredData.filter((item) =>
      filters.statuses.includes(item.status)
    );
  }

  const total = filteredData.length;
  const totalPages = Math.ceil(total / filters.limit);

  const startIndex = (filters.page - 1) * filters.limit;
  const endIndex = startIndex + filters.limit;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    total,
    page: filters.page,
    limit: filters.limit,
    totalPages,
  };
};

export const fetchServers = async () => {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const uniqueServers: PipelineFilterOption[] = Array.from(
    new Set(mockPipelineHistory.map((item) => item.serverId))
  ).map((serverId) => {
    const item = mockPipelineHistory.find((item) => item.serverId === serverId);
    return {
      id: serverId,
      name: item?.serverName || serverId,
    };
  });

  return uniqueServers;
};

export const fetchCategories = async () => {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const uniqueCategories = Array.from(
    new Set(mockPipelineHistory.map((item) => item.categoryId))
  ).map((categoryId) => {
    const item = mockPipelineHistory.find(
      (item) => item.categoryId === categoryId
    );
    return {
      id: categoryId,
      name: item?.categoryName || categoryId,
    };
  });

  return uniqueCategories;
};

export const getStatusOptions = () => [
  { id: "running", name: "Running" },
  { id: "queued", name: "Queued" },
  { id: "success", name: "Success" },
  { id: "failed", name: "Failed" },
  { id: "canceled", name: "Canceled" },
];
