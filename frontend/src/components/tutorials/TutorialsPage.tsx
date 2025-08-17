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

        {/* Jenkins Tutorial */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>Jenkins CI/CD</h3>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', marginBottom: '8px' }}>
                Automated pipelines for continuous integration and deployment
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
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>40 min</span>
            </div>
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <h4 style={{ fontSize: '14px', marginBottom: '8px' }}>Topics covered:</h4>
            <ul style={{ margin: 0, paddingLeft: '16px', color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>
              <li>Pipeline Concepts</li>
              <li>Jenkinsfile</li>
              <li>CI/CD Stages</li>
              <li>Automation Benefits</li>
            </ul>
          </div>

          <Link to="/tutorials/jenkins" className="btn" style={{ width: '100%', textAlign: 'center' }}>
            📚 Start Tutorial
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TutorialsPage
