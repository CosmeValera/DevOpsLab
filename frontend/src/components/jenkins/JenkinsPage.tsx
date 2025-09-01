import React, { useState } from "react";

import { 
  FileText,
  Terminal,
  Zap,
} from "lucide-react";
import { pipelineConfigs } from "./pipelineConfigs";
import PipelineStatus from "./PipelineStatus";
import JenkinsConfiguration from "./JenkinsConfiguration";

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

      {/* Jenkins Configuration Section */}
      <JenkinsConfiguration />

      {/* Pipeline Status Section */}
      <PipelineStatus />

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
