import React from "react";
import { Zap } from "lucide-react";
import PipelineStatus from "./PipelineStatus";
import JenkinsConfiguration from "./JenkinsConfiguration";
import PipelineConfigurations from "./PipelineConfigurations";
import QuickActions from "./QuickActions";

const JenkinsPage: React.FC = () => {
  const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL;
  const isProduction = !API_BASE_URL.includes('localhost');

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

      {/* Quick Actions Section - Only for local */}
      {!isProduction && <QuickActions isProduction={isProduction} />}

      {/* Local Jenkins Configuration Section */}
      {!isProduction && <JenkinsConfiguration />}

      {/* Pipeline Status Section */}
      <PipelineStatus />

      {/* Pipeline Configurations Section */}
      <PipelineConfigurations />
      
      {/* Cloud Jenkins Configuration Section */}
      {isProduction && <JenkinsConfiguration />}
    </div>
  );
};

export default JenkinsPage;