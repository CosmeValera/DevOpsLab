import React from 'react'
import { Link } from 'react-router-dom'

const TutorialsPage: React.FC = () => {
  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>DevOps Tutorials</h2>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)' }}>
          Learn the technologies step by step
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
        {/* Docker Tutorial */}
        <div className="card tutorial-card" style={{ boxShadow: '0 4px 24px rgba(20,184,166,0.08)', transition: 'transform 0.2s', marginBottom: '16px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '22px', marginBottom: '8px', fontWeight: 700, color: 'var(--color-text)' }}>Docker Fundamentals</h3>
              <p style={{ fontSize: '15px', color: 'var(--color-text)', opacity: 0.7, marginBottom: '8px' }}>
                Learn the basic concepts of containerization
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end' }}>
              <span style={{
                background: 'linear-gradient(90deg, #dc2626 60%, #f87171 100%)',
                color: '#fff',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.5px',
                boxShadow: '0 2px 8px rgba(220,38,38,0.08)'
              }}>
                Beginner
              </span>
              <span style={{ fontSize: '12px', color: 'var(--color-text)', opacity: 0.5 }}>30 min</span>
            </div>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '15px', marginBottom: '8px', fontWeight: 600, color: 'var(--accent-blue)' }}>Topics covered:</h4>
            <ul style={{ margin: 0, paddingLeft: '18px', color: 'var(--color-text)', fontSize: '14px', lineHeight: 1.7, listStyle: 'disc' }}>
              <li>What is Docker?</li>
              <li>Images vs Containers</li>
              <li>Dockerfile</li>
              <li>Docker Hub</li>
            </ul>
          </div>
          <Link to="/tutorials/docker" className="btn" style={{ width: '100%', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 700, fontSize: '16px', marginTop: '8px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
            Start Tutorial
          </Link>
        </div>

        {/* Kubernetes Tutorial */}
        <div className="card tutorial-card" style={{ borderLeft: '6px solid var(--accent-purple)', boxShadow: '0 4px 24px rgba(168,85,247,0.08)', transition: 'transform 0.2s', marginBottom: '16px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '22px', marginBottom: '8px', fontWeight: 700, color: 'var(--color-text)' }}>Kubernetes Introduction</h3>
              <p style={{ fontSize: '15px', color: 'var(--color-text)', opacity: 0.7, marginBottom: '8px' }}>
                Fundamental orchestration concepts
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end' }}>
              <span style={{
                background: 'linear-gradient(90deg, #f59e0b 60%, #fbbf24 100%)',
                color: '#fff',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.5px',
                boxShadow: '0 2px 8px rgba(245,158,11,0.08)'
              }}>
                Intermediate
              </span>
              <span style={{ fontSize: '12px', color: 'var(--color-text)', opacity: 0.5 }}>45 min</span>
            </div>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '15px', marginBottom: '8px', fontWeight: 600, color: 'var(--accent-purple)' }}>Topics covered:</h4>
            <ul style={{ margin: 0, paddingLeft: '18px', color: 'var(--color-text)', fontSize: '14px', lineHeight: 1.7, listStyle: 'disc' }}>
              <li>Pods</li>
              <li>Deployments</li>
              <li>Services</li>
              <li>ConfigMaps</li>
            </ul>
          </div>
          <Link to="/tutorials/kubernetes" className="btn" style={{ width: '100%', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 700, fontSize: '16px', marginTop: '8px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
            Start Tutorial
          </Link>
        </div>

        {/* Kustomize Tutorial */}
        <div className="card tutorial-card" style={{ borderLeft: '6px solid var(--accent-yellow)', boxShadow: '0 4px 24px rgba(245,158,11,0.08)', transition: 'transform 0.2s', marginBottom: '16px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '22px', marginBottom: '8px', fontWeight: 700, color: 'var(--color-text)' }}>Kustomize Deep Dive</h3>
              <p style={{ fontSize: '15px', color: 'var(--color-text)', opacity: 0.7, marginBottom: '8px' }}>
                Template-free configuration management
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end' }}>
              <span style={{
                background: 'linear-gradient(90deg, #f59e0b 60%, #fbbf24 100%)',
                color: '#fff',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.5px',
                boxShadow: '0 2px 8px rgba(245,158,11,0.08)'
              }}>
                Intermediate
              </span>
              <span style={{ fontSize: '12px', color: 'var(--color-text)', opacity: 0.5 }}>35 min</span>
            </div>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '15px', marginBottom: '8px', fontWeight: 600, color: 'var(--accent-yellow)' }}>Topics covered:</h4>
            <ul style={{ margin: 0, paddingLeft: '18px', color: 'var(--color-text)', fontSize: '14px', lineHeight: 1.7, listStyle: 'disc' }}>
              <li>Bases and Overlays</li>
              <li>Patches</li>
              <li>Generators</li>
              <li>Transformers</li>
            </ul>
          </div>
          <Link to="/tutorials/kustomize" className="btn" style={{ width: '100%', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 700, fontSize: '16px', marginTop: '8px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
            Start Tutorial
          </Link>
        </div>

        {/* Helm Tutorial */}
        <div className="card tutorial-card" style={{ borderLeft: '6px solid var(--accent-red)', boxShadow: '0 4px 24px rgba(220,38,38,0.08)', transition: 'transform 0.2s', marginBottom: '16px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '22px', marginBottom: '8px', fontWeight: 700, color: 'var(--color-text)' }}>Creating Helm Charts</h3>
              <p style={{ fontSize: '15px', color: 'var(--color-text)', opacity: 0.7, marginBottom: '8px' }}>
                Package and distribute Kubernetes applications
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end' }}>
              <span style={{
                background: 'linear-gradient(90deg, #dc2626 60%, #f87171 100%)',
                color: '#fff',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.5px',
                boxShadow: '0 2px 8px rgba(220,38,38,0.08)'
              }}>
                Advanced
              </span>
              <span style={{ fontSize: '12px', color: 'var(--color-text)', opacity: 0.5 }}>60 min</span>
            </div>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '15px', marginBottom: '8px', fontWeight: 600, color: 'var(--accent-red)' }}>Topics covered:</h4>
            <ul style={{ margin: 0, paddingLeft: '18px', color: 'var(--color-text)', fontSize: '14px', lineHeight: 1.7, listStyle: 'disc' }}>
              <li>Chart Structure</li>
              <li>Templates</li>
              <li>Values</li>
              <li>Dependencies</li>
            </ul>
          </div>
          <Link to="/tutorials/helm" className="btn" style={{ width: '100%', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 700, fontSize: '16px', marginTop: '8px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
            Start Tutorial
          </Link>
        </div>

        {/* Jenkins Tutorial */}
        <div className="card tutorial-card" style={{ borderLeft: '6px solid var(--accent-green)', boxShadow: '0 4px 24px rgba(34,167,59,0.08)', transition: 'transform 0.2s', marginBottom: '16px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '22px', marginBottom: '8px', fontWeight: 700, color: 'var(--color-text)' }}>Jenkins CI/CD</h3>
              <p style={{ fontSize: '15px', color: 'var(--color-text)', opacity: 0.7, marginBottom: '8px' }}>
                Automated pipelines for continuous integration and deployment
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end' }}>
              <span style={{
                background: 'linear-gradient(90deg, #22a73b 60%, #4ade80 100%)',
                color: '#fff',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.5px',
                boxShadow: '0 2px 8px rgba(34,167,59,0.08)'
              }}>
                Intermediate
              </span>
              <span style={{ fontSize: '12px', color: 'var(--color-text)', opacity: 0.5 }}>40 min</span>
            </div>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '15px', marginBottom: '8px', fontWeight: 600, color: 'var(--accent-green)' }}>Topics covered:</h4>
            <ul style={{ margin: 0, paddingLeft: '18px', color: 'var(--color-text)', fontSize: '14px', lineHeight: 1.7, listStyle: 'disc' }}>
              <li>Pipeline Concepts</li>
              <li>Jenkinsfile</li>
              <li>CI/CD Stages</li>
              <li>Automation Benefits</li>
            </ul>
          </div>
          <Link to="/tutorials/jenkins" className="btn" style={{ width: '100%', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 700, fontSize: '16px', marginTop: '8px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
            Start Tutorial
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TutorialsPage
