# Permission Request List (Admin)

## Page Description

Admin page for reviewing and approving/rejecting permission requests

## Components

| Component          | Description                                     | Function                  |
| ------------------ | ----------------------------------------------- | ------------------------- |
| Filter Panel       | Filter by status, server, requester, date range | Real-time filtering       |
| Request List Table | Paginated request list                          | Sortable, searchable      |
| Detail Modal       | Request details and action buttons              | Approve/reject processing |
| Batch Processing   | Process multiple requests simultaneously        | Checkbox selection        |

## Display Elements (Table Columns)

| Column           | Description                          | Sortable | Filterable |
| ---------------- | ------------------------------------ | -------- | ---------- |
| Request ID       | Click to open detail modal           | ✓        | -          |
| Requester        | Username + email                     | ✓        | ✓          |
| Target Server    | Server name (show count if multiple) | ✓        | ✓          |
| Permission Level | View/Create/Edit badge               | ✓        | ✓          |
| Request Time     | Relative time + absolute time        | ✓        | ✓          |
| Duration         | Start date ~ End date                | -        | -          |
| Status           | Pending/Approved/Rejected            | ✓        | ✓          |
| Action           | Approve/reject buttons               | -        | -          |

## Related APIs

| API Endpoint                         | Method | Description                      | Query Parameters                                   |
| ------------------------------------ | ------ | -------------------------------- | -------------------------------------------------- |
| `/api/v1/permissions/requests`       | GET    | Retrieve permission request list | status, server_id, requester_id, page, limit, sort |
| `/api/v1/permissions/requests/{id}`  | PUT    | Approve/reject request           | action, comment                                    |
| `/api/v1/permissions/requests/batch` | PUT    | Batch processing                 | request_ids[], action, comment                     |
