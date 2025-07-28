# Job History

## Page Description

Page to view and analyze execution history of all jobs

## Components

| Component            | Description                             | Function                   |
| -------------------- | --------------------------------------- | -------------------------- |
| Time Range Selection | Set query range with date picker        | Presets (today/week/month) |
| Server Filter        | Multi-select server selection           | All/individual servers     |
| Status Filter        | Success/failure/unstable/aborted filter | Checkbox group             |
| History Table        | Paginated build history                 | Infinite scroll option     |
| Statistics Chart     | Success rate, duration trends           | Interactive chart          |
| Export               | Export query results to CSV/Excel       | Include filter conditions  |

## Display Elements (Table Columns)

| Column      | Description                      | Click Action                  |
| ----------- | -------------------------------- | ----------------------------- |
| Build ID    | #buildnumber format              | Navigate to build detail page |
| Job Name    | Jenkins job name                 | Navigate to job detail page   |
| Server      | Server name badge                | Apply server filter           |
| Trigger ID  | Execution trigger type           | -                             |
| Approval ID | Approval-related information     | Approval history modal        |
| Status      | Success/failure/unstable/aborted | Apply same status filter      |
| Duration    | HH:MM:SS format                  | Highlight duration chart      |
| Start Time  | Relative time + absolute time    | Adjust time range             |
| Executor    | User who executed                | Apply user filter             |

## Related APIs

| API Endpoint            | Method | Description            | Response Format       |
| ----------------------- | ------ | ---------------------- | --------------------- |
| `/api/v1/builds`        | GET    | Retrieve build history | Pagination            |
| `/api/v1/builds/stats`  | GET    | Build statistics data  | Aggregated for charts |
| `/api/v1/builds/export` | POST   | Export history         | File download         |
| `/api/v1/builds/trends` | GET    | Trend analysis data    | Time series data      |
