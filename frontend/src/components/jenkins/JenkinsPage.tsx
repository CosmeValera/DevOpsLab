import React from "react";
import CopyCommandBox from "../shared/CopyCommandBox";

const JenkinsPage: React.FC = () => {
  return (
    <div className="home-section">
      <div className="section__header">
        <h2 className="section__title">Jenkins CI/CD</h2>
        <p className="section__subtitle">Automated deployments and pipelines</p>
      </div>

      {/* Jenkins Setup */}
      <div className="card jenkins-setup">
        <h3
          className="setup-title"
          style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="w-5 h-5">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 1v6m0 6v6" />
            <path d="m21 12-6-3.5v7z" />
            <path d="m3 12 6-3.5v7z" />
            <path d="m21 7.5-6 3.5v0" />
            <path d="m3 16.5 6-3.5v0" />
            <path d="m21 16.5-6-3.5v0" />
            <path d="m3 7.5 6 3.5v0" />
          </svg>
          Jenkins Configuration
        </h3>
        <p className="common-p-small">
          Jenkins runs automatically with docker-compose
        </p>
        <CopyCommandBox command="docker-compose up -d" />
        <p className="common-p-small-mt8">
          Access Jenkins at: http://localhost:8080
        </p>

        {/* Jenkins Password Command */}
        <div className="warning-box">
          <h4 className="warning-title">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="w-4 h-4">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <path d="M12 9v4" />
              <path d="m12 17.02.01 0" />
            </svg>
            Get Jenkins Initial Password
          </h4>
          <p className="common-p-small-mb8">
            After starting Jenkins, get the initial admin password:
          </p>
          <CopyCommandBox command="docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword" />
        </div>
      </div>

      {/* Pipeline Cards */}
      <div className="jenkins__status">
        {/* Master Pipeline */}
        <div className="card">
          <div className="pipeline-header">
            <h3 className="pipeline-title">Master Pipeline</h3>
            <span className="status-badge status-success">Success</span>
          </div>
          <p className="pipeline-description">
            Master pipeline that executes all deployment types
          </p>
          <div className="pipeline-stages">
            <h4 className="stages-title">Stages:</h4>
            <div className="stages-badges">
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
          <div className="pipeline-header">
            <h3 className="pipeline-title">Docker Pipeline</h3>
            <span className="status-badge status-success">Success</span>
          </div>
          <p className="pipeline-description">Build and deploy with Docker</p>
          <div className="pipeline-stages">
            <h4 className="stages-title">Stages:</h4>
            <div className="stages-badges">
              <span className="badge">Build Image</span>
              <span className="badge">Push Registry</span>
              <span className="badge">Deploy Container</span>
            </div>
          </div>
        </div>

        {/* Kubernetes Pipeline */}
        <div className="card">
          <div className="pipeline-header">
            <h3 className="pipeline-title">Kubernetes Pipeline</h3>
            <span className="status-badge status-running">Running</span>
          </div>
          <p className="pipeline-description">Native Kubernetes deployment</p>
          <div className="pipeline-stages">
            <h4 className="stages-title">Stages:</h4>
            <div className="stages-badges">
              <span className="badge">Apply Manifests</span>
              <span className="badge">Verify Deployment</span>
              <span className="badge">Health Check</span>
            </div>
          </div>
        </div>

        {/* Helm Pipeline */}
        <div className="card">
          <div className="pipeline-header">
            <h3 className="pipeline-title">Helm Pipeline</h3>
            <span className="status-badge status-pending">Pending</span>
          </div>
          <p className="pipeline-description">Deploy using Helm Charts</p>
          <div className="pipeline-stages">
            <h4 className="stages-title">Stages:</h4>
            <div className="stages-badges">
              <span className="badge">Lint Chart</span>
              <span className="badge">Install/Upgrade</span>
              <span className="badge">Test Release</span>
            </div>
          </div>
        </div>
      </div>

      {/* Jenkinsfile */}
      <div className="card jenkinsfile-section">
        <h3
          className="jenkinsfile-title"
          style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="w-5 h-5">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14,2 14,8 20,8" />
          </svg>
          Jenkinsfile
        </h3>
        <p className="common-p-small">
          Pipeline as code for complete automation
        </p>
        <pre className="code-block">
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
  );
};

export default JenkinsPage;
