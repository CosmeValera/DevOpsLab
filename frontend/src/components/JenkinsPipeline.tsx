import React from 'react'
import { GitBranch, Code, BarChart3 } from 'lucide-react'
import CopyCommandBox from './CopyCommandBox'

const JenkinsPipeline: React.FC = () => {
  const pipelineStages = [
    "stage('Build') {}",
    "stage('Test') {}",
    "stage('Build Images') {}",
    "stage('Deploy') {}",
  ];
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
            <div>
              {pipelineStages.map(stage => (
                <CopyCommandBox key={stage} command={stage} />
              ))}
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
