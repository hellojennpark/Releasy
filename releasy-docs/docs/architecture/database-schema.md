# Database Schema

## Jenkins Servers Configuration

```postgresql
CREATE TABLE jenkins_servers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    url VARCHAR(500) NOT NULL,
    username VARCHAR(100),
    api_token_encrypted TEXT,
    auth_method VARCHAR(20) DEFAULT 'token', -- 'token', 'password', 'certificate'
    is_active BOOLEAN DEFAULT true,
    sync_interval_minutes INTEGER DEFAULT 5,
    connection_timeout_seconds INTEGER DEFAULT 30,
    last_sync_at TIMESTAMP,
    last_sync_status VARCHAR(20), -- 'success', 'failed', 'pending'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Users

```postgresql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255),
    full_name VARCHAR(200),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```

## Permission

```postgresql
CREATE TABLE permission_requests (
    id SERIAL PRIMARY KEY,
    requester_id INTEGER REFERENCES users(id),
    jenkins_server_ids INTEGER[], -- Array of server IDs
    permission_level VARCHAR(20) NOT NULL, -- 'view', 'create', 'edit'
    request_reason TEXT,
    request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    start_date DATE,
    end_date DATE,
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    reviewed_by INTEGER REFERENCES users(id),
    reviewed_at TIMESTAMP,
    review_comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```

## User Permissions (approved permissions)

```postgresql

CREATE TABLE user_permissions (
id SERIAL PRIMARY KEY,
user_id INTEGER REFERENCES users(id),
jenkins_server_id INTEGER REFERENCES jenkins_servers(id),
permission_level VARCHAR(20) NOT NULL,
granted_by INTEGER REFERENCES users(id),
start_date DATE,
end_date DATE,
is_active BOOLEAN DEFAULT true,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
UNIQUE(user_id, jenkins_server_id, permission_level)
);

```

## Jobs (synced from Jenkins)

```postgresql

CREATE TABLE jenkins_jobs (
id SERIAL PRIMARY KEY,
jenkins_server_id INTEGER REFERENCES jenkins_servers(id),
job_name VARCHAR(200) NOT NULL,
job_url VARCHAR(500),
display_name VARCHAR(200),
description TEXT,
is_buildable BOOLEAN DEFAULT true,
is_starred BOOLEAN DEFAULT false,
folder_path VARCHAR(500), -- for folder organization
last_build_number INTEGER,
last_successful_build_number INTEGER,
last_failed_build_number INTEGER,
next_build_number INTEGER,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
synced_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
UNIQUE(jenkins_server_id, job_name)
);

```

## Job Builds/Tasks History

```postgresql

CREATE TABLE job_builds (
id SERIAL PRIMARY KEY,
jenkins_job_id INTEGER REFERENCES jenkins_jobs(id),
build_number INTEGER NOT NULL,
build_id VARCHAR(100), -- Jenkins build ID
status VARCHAR(20), -- 'SUCCESS', 'FAILURE', 'UNSTABLE', 'ABORTED', 'RUNNING'
result VARCHAR(20),
duration_ms BIGINT,
started_at TIMESTAMP,
finished_at TIMESTAMP,
started_by VARCHAR(100),
build_url VARCHAR(500),
console_log_size BIGINT,
parameters JSONB, -- build parameters
stages JSONB, -- pipeline stages info
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
synced_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
UNIQUE(jenkins_job_id, build_number)
);

```

## Job Build Stages (for pipeline visualization)

```postgresql

CREATE TABLE build_stages (
id SERIAL PRIMARY KEY,
job_build_id INTEGER REFERENCES job_builds(id),
stage_name VARCHAR(200) NOT NULL,
stage_status VARCHAR(20), -- 'SUCCESS', 'FAILURE', 'UNSTABLE', 'ABORTED', 'RUNNING', 'PAUSED'
duration_ms BIGINT,
started_at TIMESTAMP,
finished_at TIMESTAMP,
log_size BIGINT,
needs_approval BOOLEAN DEFAULT false,
approved_by VARCHAR(100),
approved_at TIMESTAMP,
stage_order INTEGER,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```

## Job Metadata and Documentation

```postgresql

CREATE TABLE job_metadata (
id SERIAL PRIMARY KEY,
jenkins_job_id INTEGER REFERENCES jenkins_jobs(id) UNIQUE,
markdown_description TEXT,
tags VARCHAR(100)[],
owner_team VARCHAR(100),
contact_email VARCHAR(255),
documentation_url VARCHAR(500),
average_duration_ms BIGINT,
success_rate DECIMAL(5,2), -- percentage
updated_by INTEGER REFERENCES users(id),
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```

## Job Triggers/Schedules

```postgresql

CREATE TABLE job_triggers (
id SERIAL PRIMARY KEY,
jenkins_job_id INTEGER REFERENCES jenkins_jobs(id),
trigger_type VARCHAR(50), -- 'cron', 'scm', 'upstream', 'manual'
trigger_config JSONB, -- cron expression, upstream jobs, etc.
is_active BOOLEAN DEFAULT true,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```

## Jenkins Agents/Nodes

```postgresql

CREATE TABLE jenkins_agents (
id SERIAL PRIMARY KEY,
jenkins_server_id INTEGER REFERENCES jenkins_servers(id),
agent_name VARCHAR(200) NOT NULL,
agent_description TEXT,
is_online BOOLEAN DEFAULT false,
is_idle BOOLEAN DEFAULT true,
num_executors INTEGER DEFAULT 1,
labels VARCHAR(100)[],
architecture VARCHAR(50),
os VARCHAR(50),
java_version VARCHAR(50),
uptime_ms BIGINT,
memory_total_mb INTEGER,
memory_available_mb INTEGER,
disk_space_total_gb INTEGER,
disk_space_available_gb INTEGER,
cpu_usage_percent DECIMAL(5,2),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
synced_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
UNIQUE(jenkins_server_id, agent_name)
);

```

## Shared Libraries tracking

```postgresql

CREATE TABLE shared_libraries (
id SERIAL PRIMARY KEY,
jenkins_server_id INTEGER REFERENCES jenkins_servers(id),
library_name VARCHAR(200) NOT NULL,
version VARCHAR(100),
repository_url VARCHAR(500),
branch VARCHAR(100),
updated_at TIMESTAMP,
synced_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
UNIQUE(jenkins_server_id, library_name)
);

```

## Build Queue

```postgresql

CREATE TABLE build_queue (
id SERIAL PRIMARY KEY,
jenkins_server_id INTEGER REFERENCES jenkins_servers(id),
queue_id INTEGER NOT NULL,
job_name VARCHAR(200),
queued_at TIMESTAMP,
waiting_reason TEXT,
parameters JSONB,
estimated_duration_ms BIGINT,
synced_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
UNIQUE(jenkins_server_id, queue_id)
);

```

## System Configuration

```postgresql

CREATE TABLE system_config (
id SERIAL PRIMARY KEY,
config_key VARCHAR(100) NOT NULL UNIQUE,
config_value TEXT,
description TEXT,
updated_by INTEGER REFERENCES users(id),
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```

## Audit Log

```postgresql

CREATE TABLE audit_log (
id SERIAL PRIMARY KEY,
user_id INTEGER REFERENCES users(id),
action VARCHAR(100) NOT NULL, -- 'job_run', 'permission_request', 'job_edit', etc.
resource_type VARCHAR(50), -- 'job', 'permission', 'user', etc.
resource_id INTEGER,
details JSONB,
ip_address INET,
user_agent TEXT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```

## Indexes for performance

```postgresql
CREATE INDEX idx_jenkins_jobs_server_id ON jenkins_jobs(jenkins_server_id);
CREATE INDEX idx_job_builds_job_id ON job_builds(jenkins_job_id);
CREATE INDEX idx_job_builds_status ON job_builds(status);
CREATE INDEX idx_job_builds_started_at ON job_builds(started_at);
CREATE INDEX idx_user_permissions_user_server ON user_permissions(user_id, jenkins_server_id);
CREATE INDEX idx_permission_requests_status ON permission_requests(status);
CREATE INDEX idx_build_queue_server_id ON build_queue(jenkins_server_id);
CREATE INDEX idx_audit_log_user_action ON audit_log(user_id, action);
CREATE INDEX idx_audit_log_created_at ON audit_log(created_at);

```
