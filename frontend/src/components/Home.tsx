import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Package, Server, GitBranch, BookOpen } from 'lucide-react'

const Home: React.FC = () => {
  const [tab, setTab] = useState<'deployments' | 'tutorials' | 'jenkins'>('deployments')

  return (
    <div>
      <section className="card">
        <h2 style={{ fontSize: '28px', marginBottom: '16px' }}>Deployment Methods</h2>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>
          Explore different ways to run and ship the application.
        </p>

        <div className="nav-tabs" style={{ marginTop: '16px' }}>
          <button className={`nav-tab ${tab === 'deployments' ? 'active' : ''}`} onClick={() => setTab('deployments')}>
            Deployments
          </button>
          <button className={`nav-tab ${tab === 'tutorials' ? 'active' : ''}`} onClick={() => setTab('tutorials')}>
            Tutorials
          </button>
          <button className={`nav-tab ${tab === 'jenkins' ? 'active' : ''}`} onClick={() => setTab('jenkins')}>
            Jenkins
          </button>
        </div>
      </section>

      {tab === 'deployments' && (
        <section className="card" style={{ marginTop: '16px' }}>
          <div className="grid">
            <div className="tech-card">
              <div className="tech-icon" style={{ color: '#2496ED' }}>
                <Package />
              </div>
              <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Docker</h3>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
                Containerización básica con Docker y Docker Compose.
              </p>
            </div>
            <div className="tech-card">
              <div className="tech-icon" style={{ color: '#326CE5' }}>
                <Server />
              </div>
              <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Kubernetes</h3>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
                Orquestación nativa en Kubernetes.
              </p>
            </div>
            <div className="tech-card">
              <div className="tech-icon" style={{ color: '#0F1689' }}>
                <Package />
              </div>
              <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Helm</h3>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
                Despliegues usando Helm Charts.
              </p>
            </div>
          </div>
          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
            <Link to="/deployments" className="btn">Explore more</Link>
          </div>
        </section>
      )}

      {tab === 'tutorials' && (
        <section className="card" style={{ marginTop: '16px' }}>
          <div className="grid">
            <div className="tech-card">
              <div className="tech-icon" style={{ color: '#2496ED' }}>
                <BookOpen />
              </div>
              <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Docker Fundamentals</h3>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
                Beginner-friendly guides about images, containers and workflows.
              </p>
            </div>
            <div className="tech-card">
              <div className="tech-icon" style={{ color: '#326CE5' }}>
                <BookOpen />
              </div>
              <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Kubernetes Introduction</h3>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
                Learn Pods, Deployments, and Services with simple examples.
              </p>
            </div>
          </div>
          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
            <Link to="/tutorials" className="btn">Explore more</Link>
          </div>
        </section>
      )}

      {tab === 'jenkins' && (
        <section className="card" style={{ marginTop: '16px' }}>
          <div className="grid">
            <div className="tech-card">
              <div className="tech-icon" style={{ color: '#D33833' }}>
                <GitBranch />
              </div>
              <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Jenkins CI/CD</h3>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
                Automatización de pipelines y despliegues.
              </p>
            </div>
          </div>
          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
            <Link to="/jenkins" className="btn">Explore more</Link>
          </div>
        </section>
      )}
    </div>
  )
}

export default Home


