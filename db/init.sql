-- DevOpsLab Database Initialization Script
-- This script creates the database schema and seed data

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create deployments table
CREATE TABLE IF NOT EXISTS deployments (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id),
    environment VARCHAR(20) NOT NULL,
    version VARCHAR(20) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    deployed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create metrics table
CREATE TABLE IF NOT EXISTS metrics (
    id SERIAL PRIMARY KEY,
    service_name VARCHAR(50) NOT NULL,
    metric_name VARCHAR(50) NOT NULL,
    metric_value DECIMAL(10,2) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert seed data
INSERT INTO users (username, email) VALUES
    ('admin', 'admin@devopslab.com'),
    ('developer', 'dev@devopslab.com'),
    ('devops', 'devops@devopslab.com')
ON CONFLICT (username) DO NOTHING;

INSERT INTO projects (name, description, status) VALUES
    ('DevOpsLab Frontend', 'React TypeScript frontend application', 'active'),
    ('DevOpsLab Backend', 'Node.js Express API backend', 'active'),
    ('DevOpsLab Database', 'PostgreSQL database with monitoring', 'active')
ON CONFLICT DO NOTHING;

INSERT INTO deployments (project_id, environment, version, status) VALUES
    (1, 'development', '1.0.0', 'completed'),
    (2, 'development', '1.0.0', 'completed'),
    (3, 'development', '1.0.0', 'completed'),
    (1, 'staging', '1.0.0', 'pending'),
    (2, 'staging', '1.0.0', 'pending')
ON CONFLICT DO NOTHING;

INSERT INTO metrics (service_name, metric_name, metric_value) VALUES
    ('frontend', 'response_time', 150.5),
    ('frontend', 'memory_usage', 85.2),
    ('backend', 'response_time', 45.8),
    ('backend', 'memory_usage', 120.3),
    ('database', 'connection_count', 5.0),
    ('database', 'query_time', 12.5)
ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_deployments_environment ON deployments(environment);
CREATE INDEX IF NOT EXISTS idx_deployments_status ON deployments(status);
CREATE INDEX IF NOT EXISTS idx_metrics_service ON metrics(service_name);
CREATE INDEX IF NOT EXISTS idx_metrics_timestamp ON metrics(timestamp);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions (if needed for production)
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO postgres;
