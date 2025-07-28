# Main Dashboard

## Page Description

Integrated dashboard for overview of entire Jenkins environment status

## Components

| Widget              | Description                      | Update Frequency | Size       |
| ------------------- | -------------------------------- | ---------------- | ---------- |
| Deployment Timeline | 24-hour build result heatmap     | Real-time        | Full width |
| Server Status       | Each Jenkins server status       | 30 seconds       | 1/3 width  |
| Agent Status        | Agent connection and utilization | 1 minute         | 1/3 width  |
| Build Queue         | Pending build list               | Real-time        | 1/3 width  |
| Library Versions    | Shared library status            | 15 minutes       | 1/2 width  |
| System Metrics      | CPU, memory, disk usage          | 1 minute         | 1/2 width  |

## Deployment Timeline Details

| Display Element | Description                   | Color Coding                                               |
| --------------- | ----------------------------- | ---------------------------------------------------------- |
| Y-axis          | Jenkins server names          | -                                                          |
| X-axis          | Time (24 hours)               | 1-hour intervals                                           |
| Cell Color      | Build result status           | Success: Green, Failure: Red, Unstable: Yellow, None: Gray |
| Tooltip         | Build details on hover        | Job name, build number, duration                           |
| Click Action    | Navigate to build detail page | -                                                          |

## Server Status Widget

| Metric            | Description                   | Threshold      |
| ----------------- | ----------------------------- | -------------- |
| Connection Status | Online/offline                | -              |
| Response Time     | API response time             | >5s warning    |
| Active Builds     | Currently running build count | -              |
| Queue Wait        | Waiting job count             | >10 warning    |
| Agent Count       | Connected agents / total      | -              |
| Last Sync         | Last data sync time           | >10min warning |

## Related APIs

| API Endpoint                  | Method | Description                 | Cache      |
| ----------------------------- | ------ | --------------------------- | ---------- |
| `/api/v1/dashboard/timeline`  | GET    | 24-hour build timeline      | 5 minutes  |
| `/api/v1/dashboard/servers`   | GET    | Server status summary       | 30 seconds |
| `/api/v1/dashboard/agents`    | GET    | Agent status summary        | 1 minute   |
| `/api/v1/dashboard/queue`     | GET    | Build queue status          | Real-time  |
| `/api/v1/dashboard/libraries` | GET    | Library version information | 15 minutes |
| `/api/v1/dashboard/metrics`   | GET    | System metrics              | 1 minute   |
