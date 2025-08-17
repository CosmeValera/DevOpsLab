import React from 'react'
import { Link } from 'react-router-dom'
import CopyCommandBox from '../shared/CopyCommandBox'

const DeploymentPage: React.FC = () => {
  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>Deployment Methods</h2>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)' }}>
          Explore different ways to deploy the application
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
        {/* Docker Card */}
        <Link to="/deployments/docker" className="card" style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
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
        </Link>

        {/* Docker Compose Card */}
        <Link to="/deployments/docker" className="card" style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
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
        </Link>

        {/* Kubernetes Card */}
        <Link to="/deployments/kubernetes" className="card" style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
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
        </Link>

        {/* Kustomize Card */}
        <Link to="/deployments/kustomize" className="card" style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
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
        </Link>

        {/* Helm Card */}
        <Link to="/deployments/helm" className="card" style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
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
        </Link>
      </div>
    </div>
  )
}

export default DeploymentPage
