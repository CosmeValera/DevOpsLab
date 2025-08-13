import React from 'react'
import { GitBranch, Code, BarChart3 } from 'lucide-react'

const JenkinsPipeline: React.FC = () => {
  return (
    <div>
      <section className="card">
        <h2 style={{ fontSize: '28px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <GitBranch />
          Jenkins CI/CD Pipeline
        </h2>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', marginBottom: '32px' }}>
          Automated CI/CD pipeline for building, testing, and deploying the application.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div>
            <h3 style={{ fontSize: '20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Code />
              Pipeline Stages
            </h3>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '14px' }}>
              <div style={{ color: '#fbbf24' }}>stage('Build') {}</div>
              <div style={{ color: '#fbbf24' }}>stage('Test') {}</div>
              <div style={{ color: '#fbbf24' }}>stage('Build Images') {}</div>
              <div style={{ color: '#fbbf24' }}>stage('Deploy') {}</div>
            </div>
          </div>
          
          <div>
            <h3 style={{ fontSize: '20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BarChart3 />
              Key Features
            </h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: '#22c55e' }}>
                ✓ Automated testing
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: '#22c55e' }}>
                ✓ Docker image building
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: '#22c55e' }}>
                ✓ Automated deployment
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: '#22c55e' }}>
                ✓ Pipeline visualization
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

export default JenkinsPipeline
