import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Github, 
  Code, 
  BarChart3,
  Play,
  Database,
  Server,
  Globe,
  Package,
  Settings
} from 'lucide-react'

interface Technology {
  name: string
  icon: React.ReactNode
  description: string
  color: string
}

interface OverviewProps {
  technologies: Technology[]
}

const Overview: React.FC<OverviewProps> = ({ technologies }) => {
  return (
    <div>
      {/* Project Architecture Section */}
      <section className="card">
        <h2 style={{ fontSize: '28px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Code />
          Project Architecture
        </h2>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', marginBottom: '32px' }}>
          This showcase demonstrates a complete DevOps workflow from development to production.
        </p>
        
        <div className="grid">
          {technologies.map((tech) => (
            <div key={tech.name} className="tech-card">
              <div className="tech-icon" style={{ color: tech.color }}>
                {tech.icon}
              </div>
              <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>{tech.name}</h3>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
                {tech.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Start Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '24px' }}>
        <section className="card">
          <h3 style={{ fontSize: '20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Play />
            Quick Start
          </h3>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', marginBottom: '16px' }}>
            Get the project running locally.
          </p>
          
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '14px' }}>
            <div style={{ color: '#22c55e' }}>$ git clone https://github.com/yourusername/devopslab</div>
            <div style={{ color: '#22c55e' }}>$ cd devopslab</div>
            <div style={{ color: '#22c55e' }}>$ docker-compose up -d</div>
          </div>
          
          <div style={{ marginTop: '16px' }}>
            <Link to="/docker" className="btn">
              View Docker Setup
            </Link>
          </div>
        </section>

        <section className="card">
          <h3 style={{ fontSize: '20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BarChart3 />
            Technologies Used
          </h3>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', marginBottom: '16px' }}>
            Modern DevOps stack.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Globe style={{ width: '16px', height: '16px' }} />
              <span style={{ fontSize: '14px' }}>Frontend:</span>
              <span style={{ 
                background: 'rgba(255,255,255,0.1)', 
                padding: '4px 8px', 
                borderRadius: '4px', 
                fontSize: '12px' 
              }}>
                Next.js + React
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Server style={{ width: '16px', height: '16px' }} />
              <span style={{ fontSize: '14px' }}>Backend:</span>
              <span style={{ 
                background: 'rgba(255,255,255,0.1)', 
                padding: '4px 8px', 
                borderRadius: '4px', 
                fontSize: '12px' 
              }}>
                Node.js + Express
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Database style={{ width: '16px', height: '16px' }} />
              <span style={{ fontSize: '14px' }}>Database:</span>
              <span style={{ 
                background: 'rgba(255,255,255,0.1)', 
                padding: '4px 8px', 
                borderRadius: '4px', 
                fontSize: '12px' 
              }}>
                PostgreSQL
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Code style={{ width: '16px', height: '16px' }} />
              <span style={{ fontSize: '14px' }}>Containerization:</span>
              <span style={{ 
                background: 'rgba(255,255,255,0.1)', 
                padding: '4px 8px', 
                borderRadius: '4px', 
                fontSize: '12px' 
              }}>
                Docker
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BarChart3 style={{ width: '16px', height: '16px' }} />
              <span style={{ fontSize: '14px' }}>CI/CD:</span>
              <span style={{ 
                background: 'rgba(255,255,255,0.1)', 
                padding: '4px 8px', 
                borderRadius: '4px', 
                fontSize: '12px' 
              }}>
                Jenkins
              </span>
            </div>
          </div>
        </section>
      </div>

      {/* Deployment Options */}
      <section className="card" style={{ marginTop: '24px' }}>
        <h3 style={{ fontSize: '20px', marginBottom: '16px' }}>Deployment Options</h3>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', marginBottom: '24px' }}>
          Choose your preferred deployment method:
        </p>
        
        <div className="grid">
          <Link to="/docker" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h4 style={{ fontSize: '16px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Code />
              Docker Compose
            </h4>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
              Simple local development and testing with Docker Compose.
            </p>
          </Link>
          
          <Link to="/kubernetes" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h4 style={{ fontSize: '16px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BarChart3 />
              Kubernetes
            </h4>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
              Production-ready container orchestration with Kubernetes.
            </p>
          </Link>
          
          <Link to="/helm" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h4 style={{ fontSize: '16px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Package />
              Helm Charts
            </h4>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
              Package and deploy with Helm charts for easy management.
            </p>
          </Link>
          
          <Link to="/kustomize" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h4 style={{ fontSize: '16px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Settings />
              Kustomize
            </h4>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
              Configuration management without templates.
            </p>
          </Link>
        </div>
      </section>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '32px' }}>
        <a 
          href="https://github.com/yourusername/devopslab" 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn"
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Github />
          View on GitHub
        </a>
        
        <Link 
          to="/dashboard" 
          className="btn btn-secondary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <BarChart3 />
          View Dashboard
        </Link>
      </div>
    </div>
  )
}

export default Overview
