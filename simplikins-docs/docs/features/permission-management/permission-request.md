# Permission Request Page

## Page Description

A page where users can request access permissions for Jenkins servers

## Components

| Component               | Description                             | Required       | Validation            |
| ----------------------- | --------------------------------------- | -------------- | --------------------- |
| Requester Info          | Auto-display logged-in user information | Required       | -                     |
| Request ID              | System-generated unique ID              | Auto-generated | UUID format           |
| Target Server Selection | Multi-selectable Jenkins server list    | Required       | Minimum 1 selection   |
| Permission Level        | Select from View, Create, Edit          | Required       | Enum validation       |
| Request Reason          | Text input field                        | Required       | 10-500 characters     |
| Start Date              | Permission start date                   | Required       | Date after today      |
| End Date                | Permission end date                     | Required       | Date after start date |

## Display Elements

- **Server List**: Card format showing server name, status, description
- **Permission Level Description**: Detailed permission guide for each level
- **Request History**: Display recent 3 requests for the user

## Related APIs

| API Endpoint                              | Method | Description                            | Request Data                                                    |
| ----------------------------------------- | ------ | -------------------------------------- | --------------------------------------------------------------- |
| `/api/v1/servers`                         | GET    | Retrieve available Jenkins server list | -                                                               |
| `/api/v1/permissions/requests`            | POST   | Create permission request              | requester_id, server_ids[], level, reason, start_date, end_date |
| `/api/v1/permissions/requests/my-history` | GET    | My request history                     | limit=3                                                         |
