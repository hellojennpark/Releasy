import { PipelineHistoryItem } from "../services/types/pipeline";

export const generatePipelineHistoryMockData = (): PipelineHistoryItem[] => {
  const servers = [
    { id: "server-1", name: "Production Server 1" },
    { id: "server-2", name: "Production Server 2" },
    { id: "server-3", name: "Development Server" },
    { id: "server-4", name: "Staging Server" },
  ];

  const categories = [
    { id: "cat-1", name: "Data Processing" },
    { id: "cat-2", name: "Machine Learning" },
    { id: "cat-3", name: "ETL Operations" },
    { id: "cat-4", name: "Report Generation" },
    { id: "cat-5", name: "System Maintenance" },
  ];

  const statuses: PipelineHistoryItem["status"][] = [
    "running",
    "queued",
    "canceled",
    "success",
    "failed",
  ];

  const pipelineNames = [
    "User Data Sync Pipeline",
    "Daily Report Generation",
    "ML Model Training",
    "Database Backup Process",
    "Log Analysis Pipeline",
    "Inventory Update Job",
    "Customer Segmentation",
    "Performance Monitoring",
    "Data Validation Check",
    "System Health Monitor",
  ];

  const mockData: PipelineHistoryItem[] = [];

  // 최근 3개월 데이터 생성
  const endDate = new Date();
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 3);

  for (let i = 0; i < 500; i++) {
    const server = servers[Math.floor(Math.random() * servers.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const pipelineName =
      pipelineNames[Math.floor(Math.random() * pipelineNames.length)];

    // 랜덤 시작 시간 생성 (최근 3개월 내)
    const randomStartTime = new Date(
      startDate.getTime() +
        Math.random() * (endDate.getTime() - startDate.getTime())
    );

    let endTime: Date | undefined;

    // running이나 queued가 아닌 경우에만 종료 시간 설정
    if (status !== "running" && status !== "queued") {
      const executionDuration = Math.random() * 1000 * 60 * 60 * 4; // 0-4시간
      endTime = new Date(randomStartTime.getTime() + executionDuration);
    }

    mockData.push({
      id: `history-${i + 1}`,
      executionId: `exec-${Date.now()}-${i}`,
      executionName: `${pipelineName} #${String(i + 1).padStart(4, "0")}`,
      startTime: randomStartTime.toISOString(),
      endTime: endTime?.toISOString(),
      serverId: server.id,
      serverName: server.name,
      categoryId: category.id,
      categoryName: category.name,
      status,
    });
  }

  return mockData.sort(
    (a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
  );
};

export const mockPipelineHistory = generatePipelineHistoryMockData();
