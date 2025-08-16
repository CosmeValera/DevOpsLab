import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CopyCommandBox from './shared/CopyCommandBox'

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'deployments' | 'tutorials' | 'jenkins'>('deployments')

  return (
    <div>
      {/* Main Navigation Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        <button 
          className={`nav-tab ${activeTab === 'deployments' ? 'active' : ''}`}
          onClick={() => setActiveTab('deployments')}
          style={{ 
            flex: 1, 
            padding: '12px 24px', 
            backgroundColor: activeTab === 'deployments' ? '#14B8A6' : 'rgba(255,255,255,0.1)',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          🚀 Deployments
        </button>
        <button 
          className={`nav-tab ${activeTab === 'tutorials' ? 'active' : ''}`}
          onClick={() => setActiveTab('tutorials')}
          style={{ 
            flex: 1, 
            padding: '12px 24px', 
            backgroundColor: activeTab === 'tutorials' ? '#14B8A6' : 'rgba(255,255,255,0.1)',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          📚 Tutorials
        </button>
        <button 
          className={`nav-tab ${activeTab === 'jenkins' ? 'active' : ''}`}
          onClick={() => setActiveTab('jenkins')}
          style={{ 
            flex: 1, 
            padding: '12px 24px', 
            backgroundColor: activeTab === 'jenkins' ? '#14B8A6' : 'rgba(255,255,255,0.1)',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          ⚙️ Jenkins
        </button>
      </div>

      {/* Deployments Content */}
      {activeTab === 'deployments' && (
        <div>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>Deployment Methods</h2>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)' }}>
              Explore different ways to deploy the application
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
            {/* Docker Card */}
            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span style={{ fontSize: '24px' }}>🐳</span>
                <h3 style={{ fontSize: '20px', margin: 0 }}>Docker</h3>
              </div>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', marginBottom: '16px' }}>
                Basic containerization with Docker
              </p>
              
              <div style={{ marginBottom: '16px' }}>
                <h4 style={{ fontSize: '14px', marginBottom: '8px' }}>Commands:</h4>
                <CopyCommandBox command="docker build -t devopslab-frontend ." />
                <CopyCommandBox command="docker run -p 3000:3000 devopslab-frontend" />
              </div>

              <div>
                <h4 style={{ fontSize: '14px', marginBottom: '8px' }}>Features:</h4>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span className="badge">Portability</span>
                  <span className="badge">Isolation</span>
                  <span className="badge">Reproducibility</span>
                </div>
              </div>
            </div>

            {/* Docker Compose Card */}
            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span style={{ fontSize: '24px' }}>🐙</span>
                <h3 style={{ fontSize: '20px', margin: 0 }}>Docker Compose</h3>
              </div>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', marginBottom: '16px' }}>
                Multi-container orchestration
              </p>
              
              <div style={{ marginBottom: '16px' }}>
                <h4 style={{ fontSize: '14px', marginBottom: '8px' }}>Commands:</h4>
                <CopyCommandBox command="docker-compose up -d" />
                <CopyCommandBox command="docker-compose down" />
              </div>

              <div>
                <h4 style={{ fontSize: '14px', marginBottom: '8px' }}>Features:</h4>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span className="badge">Multi-service</span>
                  <span className="badge">Declarative config</span>
                  <span className="badge">Automatic networking</span>
                </div>
              </div>
            </div>

            {/* Kubernetes Card */}
            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span style={{ fontSize: '24px' }}>☸️</span>
                <h3 style={{ fontSize: '20px', margin: 0 }}>Kubernetes</h3>
              </div>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', marginBottom: '16px' }}>
                Native Kubernetes orchestration
              </p>
              
              <div style={{ marginBottom: '16px' }}>
                <h4 style={{ fontSize: '14px', marginBottom: '8px' }}>Commands:</h4>
                <CopyCommandBox command="kubectl apply -f deployments/k8s/" />
                <CopyCommandBox command="kubectl get pods" />
                <CopyCommandBox command="kubectl port-forward svc/frontend 3000:3000" />
              </div>

              <div>
                <h4 style={{ fontSize: '14px', marginBottom: '8px' }}>Features:</h4>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span className="badge">Scalability</span>
                  <span className="badge">High availability</span>
                  <span className="badge">Service discovery</span>
                </div>
              </div>
            </div>

            {/* Kustomize Card */}
            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span style={{ fontSize: '24px' }}>⚙️</span>
                <h3 style={{ fontSize: '20px', margin: 0 }}>Kustomize</h3>
              </div>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', marginBottom: '16px' }}>
                Template-free configuration management
              </p>
              
              <div style={{ marginBottom: '16px' }}>
                <h4 style={{ fontSize: '14px', marginBottom: '8px' }}>Commands:</h4>
                <CopyCommandBox command="kubectl apply -k deployments/kustomize/overlays/dev" />
                <CopyCommandBox command="kubectl apply -k deployments/kustomize/overlays/prod" />
              </div>

              <div>
                <h4 style={{ fontSize: '14px', marginBottom: '8px' }}>Features:</h4>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span className="badge">No templates</span>
                  <span className="badge">Environment-specific config</span>
                  <span className="badge">Declarative approach</span>
                </div>
              </div>
            </div>

            {/* Helm Card */}
            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span style={{ fontSize: '24px' }}>⎈</span>
                <h3 style={{ fontSize: '20px', margin: 0 }}>Helm</h3>
              </div>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', marginBottom: '16px' }}>
                Kubernetes package manager
              </p>
              
              <div style={{ marginBottom: '16px' }}>
                <h4 style={{ fontSize: '14px', marginBottom: '8px' }}>Commands:</h4>
                <CopyCommandBox command="helm install devopslab ./deployments/helm" />
                <CopyCommandBox command="helm upgrade devopslab ./deployments/helm" />
                <CopyCommandBox command="helm uninstall devopslab" />
              </div>

              <div>
                <h4 style={{ fontSize: '14px', marginBottom: '8px' }}>Features:</h4>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span className="badge">Release management</span>
                  <span className="badge">Advanced templating</span>
                  <span className="badge">Easy rollbacks</span>
                </div>
              </div>
            </div>
          </div>

          {/* Learn More Button */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
            <Link to="/deployments" className="btn" style={{ 
              padding: '12px 24px', 
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              🚀 Learn more
            </Link>
          </div>
        </div>
      )}

      {/* Tutorials Content */}
      {activeTab === 'tutorials' && (
        <div>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>DevOps Tutorials</h2>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)' }}>
              Learn the technologies step by step
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
            {/* Docker Tutorial */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>Docker Fundamentals</h3>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', marginBottom: '8px' }}>
                    Learn the basic concepts of containerization
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end' }}>
                  <span style={{ 
                    backgroundColor: '#DC2626', 
                    color: 'white', 
                    padding: '4px 8px', 
                    borderRadius: '4px', 
                    fontSize: '12px' 
                  }}>
                    Beginner
                  </span>
                  <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>30 min</span>
                </div>
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <h4 style={{ fontSize: '14px', marginBottom: '8px' }}>Topics covered:</h4>
                <ul style={{ margin: 0, paddingLeft: '16px', color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>
                  <li>What is Docker?</li>
                  <li>Images vs Containers</li>
                  <li>Dockerfile</li>
                  <li>Docker Hub</li>
                </ul>
              </div>

              <Link to="/tutorials/docker" className="btn" style={{ width: '100%', textAlign: 'center' }}>
                📚 Start Tutorial
              </Link>
            </div>

            {/* Kubernetes Tutorial */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>Kubernetes Introduction</h3>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', marginBottom: '8px' }}>
                    Fundamental orchestration concepts
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end' }}>
                  <span style={{ 
                    backgroundColor: '#F59E0B', 
                    color: 'white', 
                    padding: '4px 8px', 
                    borderRadius: '4px', 
                    fontSize: '12px' 
                  }}>
                    Intermediate
                  </span>
                  <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>45 min</span>
                </div>
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <h4 style={{ fontSize: '14px', marginBottom: '8px' }}>Topics covered:</h4>
                <ul style={{ margin: 0, paddingLeft: '16px', color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>
                  <li>Pods</li>
                  <li>Deployments</li>
                  <li>Services</li>
                  <li>ConfigMaps</li>
                </ul>
              </div>

              <Link to="/tutorials/kubernetes" className="btn" style={{ width: '100%', textAlign: 'center' }}>
                📚 Start Tutorial
              </Link>
            </div>

            {/* Kustomize Tutorial */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>Kustomize Deep Dive</h3>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', marginBottom: '8px' }}>
                    Template-free configuration management
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end' }}>
                  <span style={{ 
                    backgroundColor: '#F59E0B', 
                    color: 'white', 
                    padding: '4px 8px', 
                    borderRadius: '4px', 
                    fontSize: '12px' 
                  }}>
                    Intermediate
                  </span>
                  <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>35 min</span>
                </div>
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <h4 style={{ fontSize: '14px', marginBottom: '8px' }}>Topics covered:</h4>
                <ul style={{ margin: 0, paddingLeft: '16px', color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>
                  <li>Bases and Overlays</li>
                  <li>Patches</li>
                  <li>Generators</li>
                  <li>Transformers</li>
                </ul>
              </div>

              <Link to="/tutorials/kustomize" className="btn" style={{ width: '100%', textAlign: 'center' }}>
                📚 Start Tutorial
              </Link>
            </div>

            {/* Helm Tutorial */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>Creating Helm Charts</h3>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', marginBottom: '8px' }}>
                    Package and distribute Kubernetes applications
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end' }}>
                  <span style={{ 
                    backgroundColor: '#DC2626', 
                    color: 'white', 
                    padding: '4px 8px', 
                    borderRadius: '4px', 
                    fontSize: '12px' 
                  }}>
                    Advanced
                  </span>
                  <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>60 min</span>
                </div>
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <h4 style={{ fontSize: '14px', marginBottom: '8px' }}>Topics covered:</h4>
                <ul style={{ margin: 0, paddingLeft: '16px', color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>
                  <li>Chart Structure</li>
                  <li>Templates</li>
                  <li>Values</li>
                  <li>Dependencies</li>
                </ul>
              </div>

              <Link to="/tutorials/helm" className="btn" style={{ width: '100%', textAlign: 'center' }}>
                📚 Start Tutorial
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Jenkins Content */}
      {activeTab === 'jenkins' && (
        <div>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>Jenkins CI/CD</h2>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)' }}>
              Automated deployments and pipelines
            </p>
          </div>

          {/* Jenkins Setup */}
          <div className="card" style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>⚙️ Jenkins Configuration</h3>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>
              Jenkins runs automatically with docker-compose
            </p>
            <CopyCommandBox command="docker-compose up -d" />
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', marginTop: '8px' }}>
              Access Jenkins at: http://localhost:8080
            </p>
            {/* Jenkins Password Command */}
            <div style={{ marginTop: '16px', padding: '16px', backgroundColor: 'rgba(255, 193, 7, 0.1)', borderRadius: '8px', border: '1px solid rgba(255, 193, 7, 0.3)' }}>
              <h4 style={{ fontSize: '16px', marginBottom: '8px', color: '#FFC107' }}>⚠️ Get Jenkins Initial Password</h4>
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
            <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>📄 Jenkinsfile</h3>
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
      )}
    </div>
  )
}

export default Home