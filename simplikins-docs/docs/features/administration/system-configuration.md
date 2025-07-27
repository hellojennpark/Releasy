# System Configuration

## Page Description

Page for managing overall Simkins system configuration

## Components

| Config Section        | Description                                  | Number of Settings |
| --------------------- | -------------------------------------------- | ------------------ |
| General Settings      | Basic system settings                        | 8 items            |
| Notification Settings | Email, Slack notification settings           | 12 items           |
| Security Settings     | Authentication, permission, session settings | 6 items            |
| Performance Settings  | Cache, sync, performance tuning              | 10 items           |
| Backup Settings       | Data backup and recovery settings            | 5 items            |

## General Settings Items

| Setting Key      | Description               | Type   | Default      | Validation         |
| ---------------- | ------------------------- | ------ | ------------ | ------------------ |
| app_name         | Application name          | string | "Simkins"    | 1-50 characters    |
| app_logo         | Logo image URL            | url    | -            | Image URL          |
| default_timezone | Default timezone          | select | "Asia/Seoul" | Valid timezone     |
| session_timeout  | Session timeout (minutes) | number | 480          | 30-1440 minutes    |
| page_size        | Default page size         | number | 20           | 10-100             |
| date_format      | Date display format       | select | "YYYY-MM-DD" | Date format        |
| language         | Default language          | select | "en"         | Supported language |
| theme            | Default theme             | select | "light"      | light/dark         |

## Notification Settings Items

| Setting Key               | Description                     | Type     | Required | Encrypted |
| ------------------------- | ------------------------------- | -------- | -------- | --------- |
| smtp_host                 | SMTP server address             | string   | ✓        | -         |
| smtp_port                 | SMTP port                       | number   | ✓        | -         |
| smtp_username             | SMTP username                   | string   | ✓        | -         |
| smtp_password             | SMTP password                   | password | ✓        | ✓         |
| smtp_tls                  | Use TLS                         | boolean  | -        | -         |
| slack_webhook_url         | Slack webhook URL               | url      | -        | ✓         |
| teams_webhook_url         | Teams webhook URL               | url      | -        | ✓         |
| notification_from         | Sender email                    | email    | ✓        | -         |
| notification_reply_to     | Reply-to email                  | email    | -        | -         |
| build_success_notify      | Build success notification      | boolean  | false    | -         |
| build_failure_notify      | Build failure notification      | boolean  | true     | -         |
| permission_request_notify | Permission request notification | boolean  | true     | -         |

## Security Settings Items

| Setting Key      | Description                    | Type     | Default        | Security Level |
| ---------------- | ------------------------------ | -------- | -------------- | -------------- |
| password_policy  | Password policy                | json     | Complex rules  | High           |
| login_attempts   | Login attempt limit            | number   | 5              | Medium         |
| lockout_duration | Account lockout time (minutes) | number   | 30             | Medium         |
| jwt_secret       | JWT signing key                | password | Auto-generated | Highest        |
| jwt_expiry       | JWT expiry time (hours)        | number   | 8              | Medium         |
| api_rate_limit   | API call limit (/hour)         | number   | 1000           | Medium         |

## Related APIs

| API Endpoint                      | Method | Description               | Cache Invalidation |
| --------------------------------- | ------ | ------------------------- | ------------------ |
| `/api/v1/admin/config`            | GET    | Retrieve all settings     | -                  |
| `/api/v1/admin/config/{section}`  | GET    | Retrieve section settings | -                  |
| `/api/v1/admin/config`            | PUT    | Update settings           | ✓                  |
| `/api/v1/admin/config/test-smtp`  | POST   | Test SMTP settings        | -                  |
| `/api/v1/admin/config/test-slack` | POST   | Test Slack settings       | -                  |
| `/api/v1/admin/config/backup`     | POST   | Create settings backup    | -                  |
| `/api/v1/admin/config/restore`    | POST   | Restore settings          | ✓                  |
