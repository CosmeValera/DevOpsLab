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
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2496ED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-6 h-6">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
              <line x1="12" y1="22.08" x2="12" y2="12"/>
            </svg>
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
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2496ED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-6 h-6">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
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
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#326CE5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-6 h-6">
              <circle cx="12" cy="12" r="10"/>
              <circle cx="12" cy="12" r="6"/>
              <circle cx="12" cy="12" r="2"/>
            </svg>
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
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#326CE5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-6 h-6">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
            </svg>
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
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0F1689" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-6 h-6">
              <polygon points="12,2 15.09,8.26 22,9 17,14 18.18,21 12,17.77 5.82,21 7,14 2,9 8.91,8.26"/>
            </svg>
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
