# Job Detail

## Page Description

Page for managing detailed information, execution history, and settings of individual jobs

## Components

| Component         | Description                      | Editable                 |
| ----------------- | -------------------------------- | ------------------------ |
| Job Header        | Display job name, server, status | -                        |
| Action Buttons    | Run, edit, delete buttons        | Permission-based display |
| Job Info Card     | Basic information and statistics | -                        |
| Markdown Document | Job description document         | ✓ (Inline editing)       |
| Pipeline Graph    | Visual pipeline display          | -                        |
| Build History     | Recent build list                | -                        |

## Job Info Card Content

| Info Item         | Description                     | Calculation Method  |
| ----------------- | ------------------------------- | ------------------- |
| Server Name       | Jenkins server name             | Static              |
| Job Name          | Jenkins job name                | Static              |
| Last Build Status | Recent build result             | Real-time           |
| Average Duration  | Average of recent 10 builds     | Dynamic calculation |
| Success Rate      | Success rate for recent 30 days | Dynamic calculation |
| Last Success      | Last successful build time      | Dynamic             |
| Next Schedule     | Next scheduled execution time   | Cron calculation    |

## Pipeline Graph Features

| Feature            | Description                            | Interaction                |
| ------------------ | -------------------------------------- | -------------------------- |
| Stage Status       | Success/failure display for each stage | Click to view logs         |
| Duration           | Execution time for each stage          | Hover for details          |
| Approval Pending   | Stages requiring manual approval       | Approval/reject buttons    |
| Log Viewer         | Console logs for each stage            | Filter, Head/Tail settings |
| Parallel Execution | Display stages running in parallel     | Expandable/collapsible     |

## Related APIs

| API Endpoint                                   | Method | Description                | Real-time |
| ---------------------------------------------- | ------ | -------------------------- | --------- |
| `/api/v1/jobs/{id}`                            | GET    | Job detailed information   | ✓         |
| `/api/v1/jobs/{id}/metadata`                   | PUT    | Update markdown document   | -         |
| `/api/v1/jobs/{id}/builds`                     | GET    | Build history              | ✓         |
| `/api/v1/builds/{id}/stages`                   | GET    | Pipeline stage information | ✓         |
| `/api/v1/builds/{id}/stages/{stageId}/logs`    | GET    | Stage logs                 | ✓         |
| `/api/v1/builds/{id}/stages/{stageId}/approve` | POST   | Stage approval             | ✓         |
