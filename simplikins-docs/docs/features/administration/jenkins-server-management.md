# Jenkins Server Management

## Page Description

Admin-only page for Jenkins server connection settings and management

## Components

| Component         | Description                        | Permission |
| ----------------- | ---------------------------------- | ---------- |
| Server List Table | Registered Jenkins server list     | Admin      |
| Add Server Modal  | New server registration form       | Admin      |
| Connection Test   | Server connection status check     | Admin      |
| Sync Settings     | Sync frequency and option settings | Admin      |
| Log Viewer        | Server-specific sync logs          | Admin      |

## Server List Table

| Column      | Description                | Display Format |
| ----------- | -------------------------- | -------------- |
| Server Name | User-defined server name   | Text           |
| URL         | Jenkins server address     | Link           |
| Status      | Connection status          | Status badge   |
| Auth Method | Token/Password/Certificate | Icon           |
| Last Sync   | Recent sync time           | Relative time  |
| Job Count   | Number of jobs on server   | Number         |
| Action      | Edit/delete/test buttons   | Button group   |

## Server Registration/Edit Form

| Field Name         | Type     | Required | Validation        | Description                             |
| ------------------ | -------- | -------- | ----------------- | --------------------------------------- |
| Server Name        | text     | ✓        | Uniqueness        | Internal name                           |
| Jenkins URL        | url      | ✓        | URL format        | `https://jenkins.company.com`           |
| Port               | number   | -        | 1-65535           | If not included in URL                  |
| Auth Method        | select   | ✓        | enum              | API Token/Username+Password/Certificate |
| Username           | text     | ✓        | -                 | Jenkins user ID                         |
| API Token/Password | password | ✓        | Encrypted storage | Auth info (encrypted storage)           |
| Connection Timeout | number   | -        | 5-300 seconds     | Default: 30 seconds                     |
| Sync Frequency     | number   | -        | 1-60 minutes      | Default: 5 minutes                      |
| Active Status      | checkbox | -        | -                 | Disable sync when inactive              |
| Description        | textarea | -        | Max 200 chars     | Server purpose description              |

## Connection Test Features

| Test Item         | Description                   | Success Criteria        |
| ----------------- | ----------------------------- | ----------------------- |
| Basic Connection  | Jenkins server accessibility  | HTTP 200 response       |
| Auth Verification | Provided credentials validity | Successful API call     |
| Permission Check  | Required permission ownership | Job list query possible |
| API Version       | Jenkins version compatibility | Minimum version 2.200+  |
| Plugin Check      | Required plugin installation  | Pipeline API plugins    |

## Related APIs

| API Endpoint                               | Method | Description               | Security                      |
| ------------------------------------------ | ------ | ------------------------- | ----------------------------- |
| `/api/v1/admin/servers`                    | GET    | Retrieve server list      | Admin permission              |
| `/api/v1/admin/servers`                    | POST   | Register new server       | Input validation + encryption |
| `/api/v1/admin/servers&#123;id&#125;`      | PUT    | Modify server information | Change history recording      |
| `/api/v1/admin/servers&#123;id&#125;`      | DELETE | Delete server             | Related data cleanup          |
| `/api/v1/admin/servers&#123;id&#125;/test` | POST   | Connection test           | Real-time verification        |
| `/api/v1/admin/servers&#123;id&#125;/sync` | POST   | Manual synchronization    | Progress return               |
