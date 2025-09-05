import React from "react";

import { Zap } from "lucide-react";
import PipelineStatus from "./PipelineStatus";
import JenkinsConfiguration from "./JenkinsConfiguration";
import PipelineConfigurations from "./PipelineConfigurations";

const JenkinsPage: React.FC = () => {
  const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL;
  const env = API_BASE_URL.includes('localhost') ? 'local' : 'production';

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

      {/* Local Jenkins Configuration Section */}
      {env === 'local' && (
        <JenkinsConfiguration />
      )}

      {/* Pipeline Status Section */}
      <PipelineStatus />

      {/* Pipeline Configurations Section */}
      <PipelineConfigurations />
      
      {/* Cloud Jenkins Configuration Section */}
      {env === 'production' && (
        <JenkinsConfiguration />
      )}
    </div>
  );
};

export default JenkinsPage;
