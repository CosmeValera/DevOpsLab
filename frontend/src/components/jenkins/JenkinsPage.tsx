import React from 'react'
import CopyCommandBox from '../shared/CopyCommandBox'

const JenkinsPage: React.FC = () => {
  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>Jenkins CI/CD</h2>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)' }}>
          Automated deployments and pipelines
        </p>
      </div>

      {/* Jenkins Setup */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '20px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D33833" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-5 h-5">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 1v6m0 6v6"/>
            <path d="m21 12-6-3.5v7z"/>
            <path d="m3 12 6-3.5v7z"/>
            <path d="m21 7.5-6 3.5v0"/>
            <path d="m3 16.5 6-3.5v0"/>
            <path d="m21 16.5-6-3.5v0"/>
            <path d="m3 7.5 6 3.5v0"/>
          </svg>
          Jenkins Configuration
        </h3>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>
          Jenkins runs automatically with docker-compose
        </p>
        <CopyCommandBox command="docker-compose up -d" />
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', marginTop: '8px' }}>
          Access Jenkins at: http://localhost:8080
        </p>
        
        {/* Jenkins Password Command */}
        <div style={{ marginTop: '16px', padding: '16px', backgroundColor: 'rgba(255, 193, 7, 0.1)', borderRadius: '8px', border: '1px solid rgba(255, 193, 7, 0.3)' }}>
          <h4 style={{ fontSize: '16px', marginBottom: '8px', color: '#FFC107', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFC107" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-4 h-4">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
              <path d="M12 9v4"/>
              <path d="m12 17.02.01 0"/>
            </svg>
            Get Jenkins Initial Password
          </h4>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', marginBottom: '8px' }}>
            After starting Jenkins, get the initial admin password:
          </p>
          <CopyCommandBox command="docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword" />
        </div>
      </div>

      {/* Pipeline Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
        {/* Master Pipeline */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '18px', margin: 0 }}>Master Pipeline</h3>
            <span style={{ 
              backgroundColor: '#10B981', 
              color: 'white', 
              padding: '4px 8px', 
              borderRadius: '4px', 
              fontSize: '12px' 
            }}>
              Success
            </span>
          </div>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>
            Master pipeline that executes all deployment types
          </p>
          <div>
            <h4 style={{ fontSize: '14px', marginBottom: '8px' }}>Stages:</h4>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <span className="badge">Checkout</span>
              <span className="badge">Build</span>
              <span className="badge">Test</span>
              <span className="badge">Deploy Docker</span>
              <span className="badge">Deploy K8s</span>
              <span className="badge">Deploy Helm</span>
            </div>
          </div>
        </div>

        {/* Docker Pipeline */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '18px', margin: 0 }}>Docker Pipeline</h3>
            <span style={{ 
              backgroundColor: '#10B981', 
              color: 'white', 
              padding: '4px 8px', 
              borderRadius: '4px', 
              fontSize: '12px' 
            }}>
              Success
            </span>
          </div>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>
            Build and deploy with Docker
          </p>
          <div>
            <h4 style={{ fontSize: '14px', marginBottom: '8px' }}>Stages:</h4>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <span className="badge">Build Image</span>
              <span className="badge">Push Registry</span>
              <span className="badge">Deploy Container</span>
            </div>
          </div>
        </div>

        {/* Kubernetes Pipeline */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '18px', margin: 0 }}>Kubernetes Pipeline</h3>
            <span style={{ 
              backgroundColor: '#F59E0B', 
              color: 'white', 
              padding: '4px 8px', 
              borderRadius: '4px', 
              fontSize: '12px' 
            }}>
              Running
            </span>
          </div>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>
            Native Kubernetes deployment
          </p>
          <div>
            <h4 style={{ fontSize: '14px', marginBottom: '8px' }}>Stages:</h4>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <span className="badge">Apply Manifests</span>
              <span className="badge">Verify Deployment</span>
              <span className="badge">Health Check</span>
            </div>
          </div>
        </div>

        {/* Helm Pipeline */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '18px', margin: 0 }}>Helm Pipeline</h3>
            <span style={{ 
              backgroundColor: '#6B7280', 
              color: 'white', 
              padding: '4px 8px', 
              borderRadius: '4px', 
              fontSize: '12px' 
            }}>
              Pending
            </span>
          </div>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>
            Deploy using Helm Charts
          </p>
          <div>
            <h4 style={{ fontSize: '14px', marginBottom: '8px' }}>Stages:</h4>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <span className="badge">Lint Chart</span>
              <span className="badge">Install/Upgrade</span>
              <span className="badge">Test Release</span>
            </div>
          </div>
        </div>
      </div>

      {/* Jenkinsfile */}
      <div className="card" style={{ marginTop: '24px' }}>
        <h3 style={{ fontSize: '20px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-5 h-5">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
            <polyline points="14,2 14,8 20,8"/>
          </svg>
          Jenkinsfile
        </h3>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>
          Pipeline as code for complete automation
        </p>
        <pre style={{ 
          background: 'rgba(0,0,0,0.3)', 
          padding: '16px', 
          borderRadius: '8px', 
          overflowX: 'auto', 
          fontSize: '12px',
          color: '#E5E7EB'
        }}>
{`pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'docker build -t devopslab .'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('Deploy') {
            parallel {
                stage('Docker') {
                    steps {
                        sh 'docker-compose up -d'
                    }
                }
                stage('Kubernetes') {
                    steps {
                        sh 'kubectl apply -f k8s/'
                    }
                }
                stage('Helm') {
                    steps {
                        sh 'helm upgrade --install devopslab ./helm'
                    }
                }
            }
        }
    }
}`}
        </pre>
      </div>
    </div>
  )
}

export default JenkinsPage
