# Audit Log

## Page Description

Page for tracking and analyzing all user activities in the system

## Components

| Component        | Description                             | Function                |
| ---------------- | --------------------------------------- | ----------------------- |
| Filter Panel     | Filter logs by various conditions       | Saved filter presets    |
| Log Table        | Time-ordered audit logs                 | Real-time updates       |
| Detail Viewer    | Detailed information of individual logs | JSON formatter          |
| Statistics Chart | Activity pattern analysis               | By time/user            |
| Export Tools     | Export log data                         | Multiple format support |
| Alert Settings   | Set notifications for specific events   | Rule-based              |

## Filter Options

| Filter Type   | Options         | Description                 |
| ------------- | --------------- | --------------------------- |
| Time Range    | Start-end time  | Maximum 1 year range        |
| User          | Multi-select    | Autocomplete support        |
| Action Type   | Checkbox group  | Categorized                 |
| Resource Type | Dropdown        | Job, User, Permission, etc. |
| Result        | Success/failure | Status filter               |
| IP Address    | Text input      | CIDR notation support       |
| User Agent    | Text input      | Browser/API distinction     |

## Log Table Columns

| Column     | Description                 | Display Format           | Click Action         |
| ---------- | --------------------------- | ------------------------ | -------------------- |
| Time       | Event occurrence time       | Relative + absolute time | Adjust time range    |
| User       | User who performed action   | Username + avatar        | Apply user filter    |
| Action     | Type of operation performed | Icon + text              | Action type filter   |
| Resource   | Target resource             | Type + ID                | Resource detail page |
| Result     | Success/failure             | Status badge             | Result filter        |
| IP Address | Client IP                   | IP address               | IP-based filter      |
| Details    | Additional information      | Preview text             | Detail modal         |

## Action Type Categories

| Category              | Action List                                               | Description                  |
| --------------------- | --------------------------------------------------------- | ---------------------------- |
| Authentication        | login, logout, login_failed                               | Login-related                |
| User Management       | user_create, user_update, user_delete                     | User account management      |
| Permission Management | permission_request, permission_approve, permission_revoke | Permission-related           |
| Job Management        | job_create, job_update, job_delete, job_run               | Jenkins job management       |
| System Settings       | config_update, server_add, server_delete                  | System configuration changes |
| Data Access           | data_export, data_import, backup_create                   | Data-related                 |

## Detail Information Structure

```json
{
  "id": "audit_log_id",
  "timestamp": "2024-01-15T10:30:00Z",
  "user_id": "john.doe",
  "action": "job_run",
  "resource_type": "job",
  "resource_id": "123",
  "result": "success",
  "ip_address": "192.168.1.100",
  "user_agent": "Mozilla/5.0...",
  "details": {
    "job_name": "deploy-production",
    "build_number": "456",
    "parameters": {
      "branch": "main",
      "environment": "production"
    }
  },
  "duration_ms": 150,
  "session_id": "session_123"
}
```

## Related APIs

| API Endpoint                 | Method | Description                   | Performance Optimization |
| ---------------------------- | ------ | ----------------------------- | ------------------------ |
| `/api/v1/admin/audit`        | GET    | Retrieve audit logs           | Index optimization       |
| `/api/v1/admin/audit/{id}`   | GET    | Retrieve specific log details | Cache utilization        |
| `/api/v1/admin/audit/export` | POST   | Export logs                   | Background processing    |
| `/api/v1/admin/audit/stats`  | GET    | Log statistics data           | Aggregate queries        |
| `/api/v1/admin/audit/alerts` | GET    | Retrieve alert rules          | -                        |
| `/api/v1/admin/audit/alerts` | POST   | Create alert rule             | Rule validation          |
