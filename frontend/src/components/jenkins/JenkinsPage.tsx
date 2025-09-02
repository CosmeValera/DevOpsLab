import React from "react";

import { Zap } from "lucide-react";
import PipelineStatus from "./PipelineStatus";
import JenkinsConfiguration from "./JenkinsConfiguration";
import PipelineConfigurations from "./PipelineConfigurations";

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
      <PipelineConfigurations />
    </div>
  );
};

export default JenkinsPage;
