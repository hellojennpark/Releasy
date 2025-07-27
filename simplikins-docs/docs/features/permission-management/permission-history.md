# Permission History

## Page Description

Page to view history of all permission requests and processing results

## Components

| Component            | Description                            | Function                |
| -------------------- | -------------------------------------- | ----------------------- |
| Advanced Filter      | Multi-condition filtering              | Saved filter presets    |
| History Table        | Complete permission processing history | Infinite scroll         |
| Export Tools         | CSV/Excel export                       | Export filtered results |
| Statistics Dashboard | Approval rate, processing time, etc.   | Chart visualization     |

## Display Elements (Table Columns)

| Column             | Description                 | Include in Export |
| ------------------ | --------------------------- | ----------------- |
| Request ID         | Unique identifier           | ✓                 |
| Requester Info     | Name, email, department     | ✓                 |
| Target Server      | Server name list            | ✓                 |
| Permission Level   | View/Create/Edit            | ✓                 |
| Request Reason     | Full text                   | ✓                 |
| Request Time       | ISO 8601 format             | ✓                 |
| Permission Period  | Start date ~ End date       | ✓                 |
| Processing Result  | Approved/Rejected/Expired   | ✓                 |
| Processor          | Admin who approved/rejected | ✓                 |
| Processing Time    | Processing completion time  | ✓                 |
| Processing Comment | Admin comment               | ✓                 |

## Related APIs

| API Endpoint                         | Method | Description                 | Function                   |
| ------------------------------------ | ------ | --------------------------- | -------------------------- |
| `/api/v1/permissions/history`        | GET    | Retrieve permission history | Pagination, filtering      |
| `/api/v1/permissions/history/export` | POST   | Export data                 | CSV/Excel format selection |
| `/api/v1/permissions/history/stats`  | GET    | Permission statistics data  | Aggregated data for charts |
