import React from 'react'
import { Link } from 'react-router-dom'

const Tutorials: React.FC = () => {
  return (
    <div>
      <section className="card">
        <h2 style={{ fontSize: '28px', marginBottom: '16px' }}>DevOps Tutorials</h2>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>
          Choose a topic to start learning. Use the button below to go back to Home.
        </p>
      </section>

      <div className="grid" style={{ marginTop: '16px' }}>
        <div className="card">
          <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Docker Fundamentals</h3>
          <ul style={{ margin: 0, paddingLeft: '16px' }}>
            <li>¿Qué es Docker?</li>
            <li>Imágenes vs Contenedores</li>
            <li>Dockerfile</li>
            <li>Docker Hub</li>
          </ul>
          <div style={{ marginTop: '16px' }}>
            <Link to="/tutorials/docker" className="btn">Open tutorial</Link>
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Kubernetes Introduction</h3>
          <ul style={{ margin: 0, paddingLeft: '16px' }}>
            <li>Pods</li>
            <li>Deployments</li>
            <li>Services</li>
            <li>ConfigMaps</li>
          </ul>
          <div style={{ marginTop: '16px' }}>
            <Link to="/tutorials/kubernetes" className="btn">Open tutorial</Link>
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Kustomize Deep Dive</h3>
          <ul style={{ margin: 0, paddingLeft: '16px' }}>
            <li>Bases y Overlays</li>
            <li>Patches</li>
            <li>Generadores</li>
            <li>Transformers</li>
          </ul>
          <div style={{ marginTop: '16px' }}>
            <Link to="/tutorials/kustomize" className="btn">Open tutorial</Link>
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Creating Helm Charts</h3>
          <ul style={{ margin: 0, paddingLeft: '16px' }}>
            <li>Estructura del Chart</li>
            <li>Templates</li>
            <li>Values</li>
            <li>Dependencies</li>
          </ul>
          <div style={{ marginTop: '16px' }}>
            <Link to="/tutorials/helm" className="btn">Open tutorial</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tutorials


