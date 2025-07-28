# Real-time Updates

## WebSocket Connection

| Event Type           | Payload                                | Subscription Scope |
| -------------------- | -------------------------------------- | ------------------ |
| build_started        | job_id, build_number, user             | All/individual job |
| build_finished       | job_id, build_number, status, duration | All/individual job |
| stage_completed      | build_id, stage_name, status           | Individual build   |
| queue_updated        | server_id, queue_count                 | By server          |
| agent_status_changed | server_id, agent_name, status          | By server          |
| permission_requested | request_id, requester                  | Admin only         |

## Notification System

| Notification Type | Trigger Condition             | Recipients         |
| ----------------- | ----------------------------- | ------------------ |
| Build Failure     | 3 consecutive failures        | Job owner or admin |
| Approval Pending  | Manual approval stage reached | Approval authority |
| Queue Congestion  | Wait over 10 minutes          | Operators          |
| System Error      | API connection failure        | Admin              |
| Permission Expiry | 7 days before expiry          | Corresponding user |
