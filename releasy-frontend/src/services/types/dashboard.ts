export interface Server {
  id: string;
  name: string;
  status: "online" | "offline" | "maintenance";
}

export interface JobStatus {
  running: number;
  queued: number;
  completed: number;
  failed: number;
}

export interface PerformanceMetrics {
  totalRuns: number;
  successRate: number;
  avgJobDuration: number;
  avgQueueDuration: number;
}

export interface TimelineDataPoint {
  timestamp: Date;
  success: number;
  failed: number;
  running: number;
  queued: number;
}

export interface DashboardData {
  jobStatus: JobStatus;
  performance: PerformanceMetrics;
  timeline: TimelineDataPoint[];
  comparisonData?: {
    jobStatus: JobStatus;
    performance: PerformanceMetrics;
    changeRate: {
      running: number;
      queued: number;
      successRate: number;
      avgJobDuration: number;
      avgQueueDuration: number;
    };
  };
}

export type DateRangeOption = "24h" | "3d" | "7d" | "30d";

export interface DateRangeConfig {
  label: string;
  value: DateRangeOption;
  hours: number;
  comparisonLabel: string;
}

export interface DashboardFilters {
  servers: string[];
  dateRange: DateRangeOption;
  category?: string;
}
