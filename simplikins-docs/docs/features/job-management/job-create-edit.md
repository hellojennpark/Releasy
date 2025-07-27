# Job Create/Edit

## Page Description

Page for creating new Jenkins jobs or editing existing ones

## Components

| Component             | Description                         | Validation                 |
| --------------------- | ----------------------------------- | -------------------------- |
| Basic Info Section    | Name, description, server selection | Required input validation  |
| Source Code Section   | Git repository, branch settings     | URL format validation      |
| Build Trigger Section | Schedule, SCM, upstream settings    | Cron expression validation |
| Pipeline Section      | Jenkinsfile path or script          | Syntax validation          |
| Notification Section  | Email, Slack notification settings  | Email format validation    |
| Permission Section    | Access and execution permissions    | Permission check           |

## Form Field Details

| Section       | Field Name       | Type        | Required | Validation Rules             |
| ------------- | ---------------- | ----------- | -------- | ---------------------------- |
| Basic Info    | Job Name         | text        | ✓        | Alphanumeric, -, \_ allowed  |
| Basic Info    | Description      | textarea    | -        | Max 500 characters           |
| Basic Info    | Target Server    | select      | ✓        | Only servers with permission |
| Basic Info    | Folder Path      | text        | -        | Slash (/) separated          |
| Source Code   | Git URL          | url         | ✓        | Git URL format               |
| Source Code   | Branch           | text        | -        | Default: main                |
| Source Code   | Credentials      | select      | -        | Saved credentials            |
| Build Trigger | Scheduling       | text        | -        | Cron expression              |
| Build Trigger | SCM Polling      | checkbox    | -        | -                            |
| Build Trigger | Upstream Jobs    | multiselect | -        | Existing job list            |
| Pipeline      | Jenkinsfile Path | text        | -        | Default: Jenkinsfile         |
| Pipeline      | Inline Script    | code        | -        | Groovy syntax validation     |

## Advanced Settings

| Setting Item           | Description                                | Options               |
| ---------------------- | ------------------------------------------ | --------------------- |
| Concurrent Build Limit | Limit number of concurrent builds          | 1-10                  |
| Build Retention Policy | Build history retention rules              | Count/period based    |
| Parameters             | Parameters to input during build execution | String/Boolean/Choice |
| Labels                 | Agent labels to execute on                 | Multi-select          |
| Timeout                | Maximum build execution time               | Minutes               |

## Related APIs

| API Endpoint                       | Method | Description              | Validation                 |
| ---------------------------------- | ------ | ------------------------ | -------------------------- |
| `/api/v1/jobs`                     | POST   | Create new job request   | Server-side validation     |
| `/api/v1/jobs/{id}`                | PUT    | Modify job request       | Permission validation      |
| `/api/v1/jobs/validate`            | POST   | Configuration validation | Real-time validation       |
| `/api/v1/servers/{id}/credentials` | GET    | Available credentials    | Permission-based filtering |
| `/api/v1/jobs/{id}/preview`        | POST   | Configuration preview    | Jenkinsfile parsing        |
