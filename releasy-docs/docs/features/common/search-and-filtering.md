# Search and Filtering

## Global Search

| Feature           | Description                        | Scope                             |
| ----------------- | ---------------------------------- | --------------------------------- |
| Integrated Search | Search all entities                | Jobs, Users, Builds               |
| Autocomplete      | Real-time suggestions while typing | Recent searches, popular searches |
| Search History    | Personal search history            | Store recent 10                   |
| Saved Searches    | Save frequently used searches      | Personal/team sharing             |

## Advanced Filtering

| Filter Type | Supported Operators                 | Example                             |
| ----------- | ----------------------------------- | ----------------------------------- |
| Text        | `contains`, `equals`, `starts_with` | `name contains "deploy"`            |
| Number      | `=`, `>`, `<`, `>=`, `<=`           | `duration > 300`                    |
| Date        | `before`, `after`, `between`        | `created_at after "2024-01-01"`     |
| Status      | `in`, `not_in`                      | `status in ["SUCCESS", "UNSTABLE"]` |
| Array       | `contains`, `not_contains`          | `tags contains "production"`        |
