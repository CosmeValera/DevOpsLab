import React, { useState } from "react";
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
  Zap,
  User
} from "lucide-react";
import CopyCommandBox from "../shared/CopyCommandBox";
import { pipelineConfigs } from "./pipelineConfigs";

const JenkinsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("master");

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
              Automated deployments and pipelines for smooth DevOps workflows
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
              <h4>1. Start Jenkins with docker-compose</h4>
              <CopyCommandBox command="docker-compose up -d" />
            </div>
            <div className="command-section">
              <h4>(Or with docker)</h4>
              <CopyCommandBox command="docker build --build-arg DOCKER_GID=$(getent group docker | cut -d: -f3) -t devopslab-jenkins ./jenkins" />
              <CopyCommandBox command="docker run -d --name jenkins -p 8080:8080 -p 50000:50000 --network host -e JENKINS_OPTS=--httpPort=8080 --restart=on-failure -v jenkins_home:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock devopslab-jenkins" />
            </div>

            <div className="access-info">
              <div className="access-info__item">
                <ExternalLink size={16} />
                <span>2. Access Jenkins at: <a href="http://localhost:8080" target="_blank" rel="noopener noreferrer">http://localhost:8080</a></span>
              </div>
            </div>

            <div className="warning-section">
              <div className="warning-header">
                <AlertTriangle size={16} />
                <h4>3. Get Initial Admin Password</h4>
              </div>
              <p>After starting Jenkins, retrieve the initial admin password for the <strong>admin</strong> user:</p>
              <CopyCommandBox command="docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword" />

              <div className="admin-info">
                <div className="admin-info__item">
                  <User size={16} />
                  <div className="admin-info__text">
                    <span><strong>Default Admin User:</strong> admin</span>
                    <span>Use the password from the command above to log in as administrator</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="command-section">
              <h4>4. Remove Jenkins (if needed)</h4>
              <CopyCommandBox command="docker rm -f jenkins && docker rmi -f devopslab-jenkins && docker volume rm jenkins_home" />
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
                <Clock size={16} />
                <span className="status-badge status-running">Running</span>
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
          </div>

          {/* Kubernetes Pipeline */}
          <div className="pipeline-card">
            <div className="pipeline-card__header">
              <div className="pipeline-card__title">
                <h3>Kubernetes Pipeline</h3>
                <p>Native K8s orchestration</p>
              </div>
              <div className="pipeline-card__status">
                <CheckCircle size={16} />
                <span className="status-badge status-success">Success</span>
              </div>
            </div>
          </div>
          
          {/* Kustomize Pipeline */}
          <div className="pipeline-card">
            <div className="pipeline-card__header">
              <div className="pipeline-card__title">
                <h3>Kustomize Pipeline</h3>
                <p>Environment-specific configurations</p>
              </div>
              <div className="pipeline-card__status">
                <Clock size={16} />
                <span className="status-badge status-running">Running</span>
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
          </div>

        </div>
      </div>

      {/* Pipeline Configurations Section */}
      <div className="jenkins-section">
        <div className="section-header">
          <h2 className="section-title">
            <FileText size={20} />
            Pipeline Configurations
          </h2>
          <p className="section-description">
            Explore different pipeline configurations for each deployment type
          </p>
        </div>

        <div className="pipeline-configs-card">
          <div className="pipeline-configs-card__header">
            <div className="pipeline-configs-card__icon">
              <Terminal size={24} />
            </div>
            <div className="pipeline-configs-card__title">
              <h3>Pipeline as Code</h3>
              <p>Declarative pipelines for complete automation</p>
            </div>
          </div>

          <div className="pipeline-configs-card__content">
            <div className="pipeline-tabs">
              <div className="pipeline-tabs__header">
                {Object.entries(pipelineConfigs).map(([key, config]) => (
                  <button
                    key={key}
                    className={`pipeline-tab ${activeTab === key ? 'pipeline-tab--active' : ''}`}
                    onClick={() => setActiveTab(key)}
                  >
                    {config.name}
                  </button>
                ))}
              </div>

              <div className="pipeline-tabs__content">
                <div className="pipeline-config">
                  <div className="pipeline-config__header">
                    <h4>{pipelineConfigs[activeTab as keyof typeof pipelineConfigs].name}</h4>
                    <p>{pipelineConfigs[activeTab as keyof typeof pipelineConfigs].description}</p>
                  </div>
                  <div className="pipeline-config__jenkinsfile">
                     <h5>Jenkinsfile:</h5>
                     <pre className="code-block">
{`pipeline {
    agent any
    
    stages {
${pipelineConfigs[activeTab as keyof typeof pipelineConfigs].stages.map((stage) => {
  if (stage.type === 'build') {
    return `        stage('${stage.name}') {
            steps {
                build job: '${stage.job}'
            }
        }`;
  } else {
    return `        stage('${stage.name}') {
            steps {
                sh '''${stage.command}'''
            }
        }`;
  }
}).join('\n')}
    }
}`}
                     </pre>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JenkinsPage;
