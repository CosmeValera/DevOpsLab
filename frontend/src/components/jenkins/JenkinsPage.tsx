import React from "react";
import { 
  Star, 
  AlertTriangle, 
  Play, 
  CheckCircle, 
  Clock, 
  Pause,
  Settings,
  FileText,
  ExternalLink,
  Terminal,
  Zap
} from "lucide-react";
import CopyCommandBox from "../shared/CopyCommandBox";

const JenkinsPage: React.FC = () => {
  return (
    <div className="jenkins-page">
      {/* Header Section */}
      <div className="jenkins-header">
        <div className="jenkins-header__content">
          <div className="jenkins-header__icon">
            <Zap size={32} />
          </div>
          <div className="jenkins-header__text">
            <h1 className="jenkins-header__title">Jenkins CI/CD</h1>
            <p className="jenkins-header__subtitle">
              Automated deployments and pipelines for seamless DevOps workflows
            </p>
          </div>
        </div>
      </div>

      {/* Quick Start Section */}
      <div className="jenkins-section">
        <div className="section-header">
          <h2 className="section-title">
            <Settings size={20} />
            Quick Setup
          </h2>
          <p className="section-description">
            Get Jenkins up and running in minutes with Docker Compose
          </p>
        </div>

        <div className="jenkins-setup-card">
          <div className="setup-card__header">
            <div className="setup-card__icon">
              <Star size={24} />
            </div>
            <div className="setup-card__title">
              <h3>Jenkins Configuration</h3>
              <p>Automated setup with docker-compose</p>
            </div>
          </div>

          <div className="setup-card__content">
            <div className="command-section">
              <h4>Start Jenkins</h4>
              <CopyCommandBox command="docker-compose up -d" />
            </div>

            <div className="access-info">
              <div className="access-info__item">
                <ExternalLink size={16} />
                <span>Access Jenkins at: <a href="http://localhost:8080" target="_blank" rel="noopener noreferrer">http://localhost:8080</a></span>
              </div>
            </div>

            <div className="warning-section">
              <div className="warning-header">
                <AlertTriangle size={16} />
                <h4>Get Initial Admin Password</h4>
              </div>
              <p>After starting Jenkins, retrieve the initial admin password:</p>
              <CopyCommandBox command="docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword" />
            </div>
          </div>
        </div>
      </div>

      {/* Pipeline Status Section */}
      <div className="jenkins-section">
        <div className="section-header">
          <h2 className="section-title">
            <Play size={20} />
            Pipeline Status
          </h2>
          <p className="section-description">
            Monitor the status of your automated deployment pipelines
          </p>
        </div>

        <div className="pipelines-grid">
          {/* Master Pipeline */}
          <div className="pipeline-card pipeline-card--master">
            <div className="pipeline-card__header">
              <div className="pipeline-card__title">
                <h3>Master Pipeline</h3>
                <p>Orchestrates all deployment types</p>
              </div>
              <div className="pipeline-card__status">
                <CheckCircle size={16} />
                <span className="status-badge status-success">Success</span>
              </div>
            </div>

            <div className="pipeline-card__stages">
              <h4>Pipeline Stages</h4>
              <div className="stages-grid">
                <div className="stage-item stage-item--completed">
                  <CheckCircle size={14} />
                  <span>Checkout</span>
                </div>
                <div className="stage-item stage-item--completed">
                  <CheckCircle size={14} />
                  <span>Build</span>
                </div>
                <div className="stage-item stage-item--completed">
                  <CheckCircle size={14} />
                  <span>Test</span>
                </div>
                <div className="stage-item stage-item--completed">
                  <CheckCircle size={14} />
                  <span>Deploy Docker</span>
                </div>
                <div className="stage-item stage-item--completed">
                  <CheckCircle size={14} />
                  <span>Deploy K8s</span>
                </div>
                <div className="stage-item stage-item--completed">
                  <CheckCircle size={14} />
                  <span>Deploy Helm</span>
                </div>
              </div>
            </div>
          </div>

          {/* Docker Pipeline */}
          <div className="pipeline-card">
            <div className="pipeline-card__header">
              <div className="pipeline-card__title">
                <h3>Docker Pipeline</h3>
                <p>Container-based deployment</p>
              </div>
              <div className="pipeline-card__status">
                <CheckCircle size={16} />
                <span className="status-badge status-success">Success</span>
              </div>
            </div>

            <div className="pipeline-card__stages">
              <h4>Pipeline Stages</h4>
              <div className="stages-grid">
                <div className="stage-item stage-item--completed">
                  <CheckCircle size={14} />
                  <span>Build Image</span>
                </div>
                <div className="stage-item stage-item--completed">
                  <CheckCircle size={14} />
                  <span>Push Registry</span>
                </div>
                <div className="stage-item stage-item--completed">
                  <CheckCircle size={14} />
                  <span>Deploy Container</span>
                </div>
              </div>
            </div>
          </div>

          {/* Kubernetes Pipeline */}
          <div className="pipeline-card">
            <div className="pipeline-card__header">
              <div className="pipeline-card__title">
                <h3>Kubernetes Pipeline</h3>
                <p>Native K8s orchestration</p>
              </div>
              <div className="pipeline-card__status">
                <Clock size={16} />
                <span className="status-badge status-running">Running</span>
              </div>
            </div>

            <div className="pipeline-card__stages">
              <h4>Pipeline Stages</h4>
              <div className="stages-grid">
                <div className="stage-item stage-item--completed">
                  <CheckCircle size={14} />
                  <span>Apply Manifests</span>
                </div>
                <div className="stage-item stage-item--running">
                  <Clock size={14} />
                  <span>Verify Deployment</span>
                </div>
                <div className="stage-item stage-item--pending">
                  <Pause size={14} />
                  <span>Health Check</span>
                </div>
              </div>
            </div>
          </div>

          {/* Helm Pipeline */}
          <div className="pipeline-card">
            <div className="pipeline-card__header">
              <div className="pipeline-card__title">
                <h3>Helm Pipeline</h3>
                <p>Chart-based deployment</p>
              </div>
              <div className="pipeline-card__status">
                <Pause size={16} />
                <span className="status-badge status-pending">Pending</span>
              </div>
            </div>

            <div className="pipeline-card__stages">
              <h4>Pipeline Stages</h4>
              <div className="stages-grid">
                <div className="stage-item stage-item--pending">
                  <Pause size={14} />
                  <span>Lint Chart</span>
                </div>
                <div className="stage-item stage-item--pending">
                  <Pause size={14} />
                  <span>Install/Upgrade</span>
                </div>
                <div className="stage-item stage-item--pending">
                  <Pause size={14} />
                  <span>Test Release</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Jenkinsfile Section */}
      <div className="jenkins-section">
        <div className="section-header">
          <h2 className="section-title">
            <FileText size={20} />
            Pipeline as Code
          </h2>
          <p className="section-description">
            Complete automation with declarative Jenkinsfile
          </p>
        </div>

        <div className="jenkinsfile-card">
          <div className="jenkinsfile-card__header">
            <div className="jenkinsfile-card__icon">
              <Terminal size={24} />
            </div>
            <div className="jenkinsfile-card__title">
              <h3>Jenkinsfile</h3>
              <p>Declarative pipeline for complete automation</p>
            </div>
          </div>

          <div className="jenkinsfile-card__content">
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
      </div>
    </div>
  );
};

export default JenkinsPage;
