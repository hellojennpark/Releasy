# Job List

## Page Description

Main page for integrated viewing and management of jobs from all Jenkins servers

## Components

| Component        | Description                               | Function                 |
| ---------------- | ----------------------------------------- | ------------------------ |
| Server Tabs      | All/Server1/Server2... tab switching      | Server-based filtering   |
| Sync Status      | Last sync time + manual sync button       | Real-time status display |
| Search & Filter  | Job name, status, label search            | Real-time search         |
| Job Table        | Grid view/card view switchable            | Favorites, sorting       |
| Batch Operations | Execute/stop multiple jobs simultaneously | Checkbox selection       |

## Display Elements (Table Columns)

| Column           | Description                           | Sortable | Action           |
| ---------------- | ------------------------------------- | -------- | ---------------- |
| Star             | Favorite toggle                       | -        | Click toggle     |
| Job Name         | Link (navigate to job details)        | ✓        | Click navigation |
| Server           | Server name badge                     | ✓        | -                |
| Status           | Execution status icon + text          | ✓        | -                |
| Stage            | Current pipeline stage (when running) | -        | -                |
| Trigger ID       | Trigger method (Manual/Cron/SCM)      | ✓        | -                |
| Job ID           | Current build number                  | ✓        | -                |
| Approval ID      | Display pending approval stage        | -        | Approval button  |
| Last Success     | Last successful build time            | ✓        | -                |
| Last Failure     | Last failed build time                | ✓        | -                |
| Average Duration | Average of recent 10 builds           | -        | -                |
| Schedule         | Cron expression or trigger info       | -        | -                |
| Action           | Run/stop/edit buttons                 | -        | Dropdown menu    |

## Related APIs

| API Endpoint             | Method | Description            | Real-time Update        |
| ------------------------ | ------ | ---------------------- | ----------------------- |
| `/api/v1/jobs`           | GET    | Retrieve job list      | WebSocket connection    |
| `/api/v1/jobs/{id}/run`  | POST   | Execute job            | Immediate status update |
| `/api/v1/jobs/{id}/stop` | POST   | Stop job               | Immediate status update |
| `/api/v1/jobs/batch/run` | POST   | Batch execution        | Real-time progress      |
| `/api/v1/servers/sync`   | POST   | Manual synchronization | Sync progress           |
