import React from 'react'
import { GitBranch, Code, BarChart3 } from 'lucide-react'

import CopyCommandBox from '../shared/CopyCommandBox'

const JenkinsPipeline: React.FC = () => {
  const jenkinsStartCommands = [
    'docker run -d --name jenkins -p 8080:8080 -p 50000:50000 -v jenkins_home:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock jenkins/jenkins:lts',
  ];
  const jenkinsPasswordCommand = [
    'docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword',
  ];
  const jenkinsPipelineCommands = [
    'jenkins-cli.jar build devopslab-pipeline',
    'curl -X POST http://localhost:8080/job/devopslab-pipeline/build',
  ];
  return (
    <div>
      <section className="card">
        <h2 style={{ fontSize: '28px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <GitBranch />
          Jenkins CI/CD Pipeline
        </h2>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', marginBottom: '16px' }}>
          CI/CD automation for builds, testing and deployments. Use the button to go back to Home.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* Commands Section */}
          <div>
            <h3 style={{ fontSize: '20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Code />
              Start Jenkins in Docker
            </h3>
            <div>
              {jenkinsStartCommands.map(cmd => (
                <CopyCommandBox key={cmd} command={cmd} />
              ))}
            </div>
            <h3 style={{ fontSize: '20px', margin: '32px 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Code />
              Get Initial Admin Password
            </h3>
            <div>
              {jenkinsPasswordCommand.map(cmd => (
                <CopyCommandBox key={cmd} command={cmd} />
              ))}
            </div>
            <h3 style={{ fontSize: '20px', margin: '32px 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Code />
              Manual Pipeline Execution
            </h3>
            <div>
              {jenkinsPipelineCommands.map(cmd => (
                <CopyCommandBox key={cmd} command={cmd} />
              ))}
            </div>
          </div>
          {/* Key Features Section */}
          <div>
            <h3 style={{ fontSize: '20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BarChart3 />
              Key Features
            </h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'white' }}>
                ✓ Automated testing
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'white' }}>
                ✓ Docker image building
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'white' }}>
                ✓ Automated deployment
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'white' }}>
                ✓ Pipeline visualization
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Jenkins overview content */}
      <section className="card" style={{ marginTop: '16px' }}>
        <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>Jenkins Setup</h3>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>
          Jenkins runs automatically with docker-compose. Access via http://localhost:8080
        </p>
        <CopyCommandBox command="docker-compose up -d" />
      </section>

      <section className="card" style={{ marginTop: '16px' }}>
        <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>Pipelines</h3>
        <div className="grid">
          <div className="card">
            <h4 style={{ marginBottom: '8px' }}>Master Pipeline</h4>
            <p style={{ marginBottom: '8px', color: 'rgba(255,255,255,0.8)' }}>Runs all deployment types end-to-end.</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span className="badge">Checkout</span>
              <span className="badge">Build</span>
              <span className="badge">Test</span>
              <span className="badge">Deploy Docker</span>
              <span className="badge">Deploy K8s</span>
              <span className="badge">Deploy Helm</span>
            </div>
          </div>
          <div className="card">
            <h4 style={{ marginBottom: '8px' }}>Docker Pipeline</h4>
            <p style={{ marginBottom: '8px', color: 'rgba(255,255,255,0.8)' }}>Build and deploy using Docker.</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span className="badge">Build Image</span>
              <span className="badge">Push Registry</span>
              <span className="badge">Deploy Container</span>
            </div>
          </div>
          <div className="card">
            <h4 style={{ marginBottom: '8px' }}>Kubernetes Pipeline</h4>
            <p style={{ marginBottom: '8px', color: 'rgba(255,255,255,0.8)' }}>Native Kubernetes deployment.</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span className="badge">Apply Manifests</span>
              <span className="badge">Verify Deployment</span>
              <span className="badge">Health Check</span>
            </div>
          </div>
          <div className="card">
            <h4 style={{ marginBottom: '8px' }}>Helm Pipeline</h4>
            <p style={{ marginBottom: '8px', color: 'rgba(255,255,255,0.8)' }}>Deploy using Helm Charts.</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span className="badge">Lint Chart</span>
              <span className="badge">Install/Upgrade</span>
              <span className="badge">Test Release</span>
            </div>
          </div>
        </div>
      </section>

      {/* Jenkinsfile Example */}
      <section className="card" style={{ marginTop: '16px' }}>
        <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>Jenkinsfile</h3>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>Pipeline as code for complete automation.</p>
        <pre style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px', overflowX: 'auto' }}>
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
      </section>
    </div>
  )
}

export default JenkinsPipeline
