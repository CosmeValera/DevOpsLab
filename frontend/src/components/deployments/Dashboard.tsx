import React, { useState, useEffect } from 'react'
import { BarChart3, Users, FolderOpen, Activity, Database, Server, Globe } from 'lucide-react'

interface User {
  id: number
  username: string
  email: string
  created_at: string
}

interface Project {
  id: number
  name: string
  description: string
  status: string
  created_at: string
}

interface Deployment {
  id: number
  project_id: number
  project_name: string
  environment: string
  version: string
  status: string
  deployed_at: string
}

interface Metric {
  service_name: string
  metric_name: string
  metric_value: number
  timestamp: string
}

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [deployments, setDeployments] = useState<Deployment[]>([])
  const [metrics, setMetrics] = useState<Metric[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const API_BASE = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3001'

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [usersRes, projectsRes, deploymentsRes, metricsRes] = await Promise.all([
          fetch(`${API_BASE}/api/users`),
          fetch(`${API_BASE}/api/projects`),
          fetch(`${API_BASE}/api/deployments`),
          fetch(`${API_BASE}/api/metrics`)
        ])

        const [usersData, projectsData, deploymentsData, metricsData] = await Promise.all([
          usersRes.json(),
          projectsRes.json(),
          deploymentsRes.json(),
          metricsRes.json()
        ])

        if (usersData.success) setUsers(usersData.data)
        if (projectsData.success) setProjects(projectsData.data)
        if (deploymentsData.success) setDeployments(deploymentsData.data)
        if (metricsData.success) setMetrics(metricsData.data)
      } catch (err) {
        setError('Failed to fetch dashboard data')
        console.error('Dashboard fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [API_BASE])

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '48px' }}>
        <div className="loading" style={{ margin: '0 auto 16px' }}></div>
        <p>Loading dashboard data...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '48px' }}>
        <p style={{ color: '#ef4444' }}>Error: {error}</p>
        <p className="common-p-small" style={{ opacity: 0.7 }}>
          Make sure the backend API is running on {API_BASE}
        </p>
      </div>
    )
  }

  return (
    <div>
      <section className="card">
        <h2 style={{ fontSize: '28px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <BarChart3 />
          DevOpsLab Dashboard
        </h2>
        <p className="common-p">
          Real-time metrics and deployment status for the DevOpsLab application.
        </p>
      </section>

      {/* Stats Overview */}
      <div className="grid" style={{ marginTop: '24px' }}>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <Users style={{ color: 'currentColor' }} />
            <h3 style={{ fontSize: '18px' }}>Users</h3>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>
            {users.length}
          </div>
          <p className="common-p-small" style={{ opacity: 0.7 }}>
            Registered users in the system
          </p>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <FolderOpen style={{ color: 'currentColor' }} />
            <h3 style={{ fontSize: '18px' }}>Projects</h3>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>
            {projects.length}
          </div>
          <p className="common-p-small" style={{ opacity: 0.7 }}>
            Active projects
          </p>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <Activity style={{ color: 'currentColor' }} />
            <h3 style={{ fontSize: '18px' }}>Deployments</h3>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>
            {deployments.length}
          </div>
          <p className="common-p-small" style={{ opacity: 0.7 }}>
            Total deployments
          </p>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <Database style={{ color: 'currentColor' }} />
            <h3 style={{ fontSize: '18px' }}>Metrics</h3>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>
            {metrics.length}
          </div>
          <p className="common-p-small" style={{ opacity: 0.7 }}>
            System metrics collected
          </p>
        </div>
      </div>

      {/* Recent Deployments */}
      <section className="card" style={{ marginTop: '24px' }}>
        <h3 style={{ fontSize: '20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Activity />
          Recent Deployments
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: '600' }}>Project</th>
                <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: '600' }}>Environment</th>
                <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: '600' }}>Version</th>
                <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: '600' }}>Status</th>
                <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: '600' }}>Deployed</th>
              </tr>
            </thead>
            <tbody>
              {deployments.slice(0, 5).map((deployment) => (
                <tr key={deployment.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '12px', fontSize: '14px' }}>{deployment.project_name}</td>
                  <td style={{ padding: '12px', fontSize: '14px' }}>{deployment.environment}</td>
                  <td style={{ padding: '12px', fontSize: '14px' }}>{deployment.version}</td>
                  <td style={{ padding: '12px' }}>
                    <span className={`status ${deployment.status === 'completed' ? 'success' : deployment.status === 'pending' ? 'pending' : 'error'}`}>
                      {deployment.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px', fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
                    {new Date(deployment.deployed_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* System Metrics */}
      <section className="card" style={{ marginTop: '24px' }}>
        <h3 style={{ fontSize: '20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BarChart3 />
          System Metrics
        </h3>
        <div className="grid">
          {metrics.slice(0, 6).map((metric, index) => (
            <div key={index} style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                {metric.service_name === 'frontend' && <Globe style={{ width: '16px', height: '16px' }} />}
                {metric.service_name === 'backend' && <Server style={{ width: '16px', height: '16px' }} />}
                {metric.service_name === 'database' && <Database style={{ width: '16px', height: '16px' }} />}
                <span style={{ fontSize: '14px', fontWeight: '600' }}>{metric.service_name}</span>
              </div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>
                {metric.metric_value}
              </div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>
                {metric.metric_name}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Dashboard
