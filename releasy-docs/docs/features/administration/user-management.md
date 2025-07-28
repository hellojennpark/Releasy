# User Management

## Page Description

Page for managing system user accounts and permissions

## Components

| Component                   | Description                          | Function               |
| --------------------------- | ------------------------------------ | ---------------------- |
| User List Table             | Complete user list                   | Search, filter, sort   |
| Add User Modal              | New user account creation            | Form validation        |
| Permission Management Panel | User-specific permission settings    | Role-based permissions |
| Batch Operation Tools       | Manage multiple users simultaneously | Export, deactivate     |
| Audit Log                   | User-related change history          | Filterable             |

## User List Table

| Column     | Description                    | Sortable | Filterable     |
| ---------- | ------------------------------ | -------- | -------------- |
| User ID    | Login ID                       | ✓        | Text search    |
| Name       | Real name                      | ✓        | Text search    |
| Email      | Email address                  | ✓        | Text search    |
| Department | Department                     | ✓        | Select box     |
| Role       | System role                    | ✓        | Checkbox group |
| Status     | Active/inactive                | ✓        | Toggle         |
| Last Login | Recent access time             | ✓        | Date range     |
| Created    | Account creation time          | ✓        | Date range     |
| Action     | Edit/delete/permission buttons | -        | -              |

## Add/Edit User Form

| Field Name         | Type        | Required | Validation Rules                 | Description            |
| ------------------ | ----------- | -------- | -------------------------------- | ---------------------- |
| User ID            | text        | ✓        | Alphanumeric, 3-20 chars, unique | Login ID               |
| Name               | text        | ✓        | Korean+English, 2-50 chars       | Real name              |
| Email              | email       | ✓        | Email format, unique             | For notifications      |
| Department         | select      | -        | Existing department list         | Organization info      |
| Position           | select      | -        | Existing position list           | Organization info      |
| Phone Number       | tel         | -        | Phone number format              | Contact                |
| Temporary Password | password    | ✓        | Password policy compliance       | For first login        |
| Role               | multiselect | ✓        | Minimum 1 selection              | System permissions     |
| Account Expiry     | date        | -        | Future date                      | For temporary accounts |
| Active Status      | checkbox    | -        | -                                | Default: active        |

## Permission Role Definitions

| Role Name   | Description           | Permission Scope                     |
| ----------- | --------------------- | ------------------------------------ |
| Super Admin | Highest administrator | Access to all functions              |
| Admin       | General administrator | All functions except user management |
| Operator    | Operator              | Job execution, monitoring            |
| Developer   | Developer             | Job creation/editing, execution      |
| Viewer      | Viewer                | Read-only access                     |
| Guest       | Guest                 | Limited viewing                      |

## Related APIs

| API Endpoint                           | Method | Description               | Security Verification               |
| -------------------------------------- | ------ | ------------------------- | ----------------------------------- |
| `/api/v1/admin/users`                  | GET    | Retrieve user list        | Admin permission                    |
| `/api/v1/admin/users`                  | POST   | Create user               | Input validation + duplicate check  |
| `/api/v1/admin/users/{id}`             | PUT    | Modify user information   | Permission verification             |
| `/api/v1/admin/users/{id}`             | DELETE | Delete user               | Related data check                  |
| `/api/v1/admin/users/{id}/permissions` | GET    | Retrieve user permissions | -                                   |
| `/api/v1/admin/users/{id}/permissions` | PUT    | Set user permissions      | Permission inheritance verification |
| `/api/v1/admin/users/bulk`             | POST   | Batch user processing     | CSV upload support                  |
