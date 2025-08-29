import React from "react";
import { Settings } from "lucide-react";
import CommandTooltip from "../shared/CommandTooltip";

const KustomizeDeployment: React.FC = () => {
  const kustomizeCommands = [
    {
      command: "kubectl apply -f deployments/k8s/namespace.yaml",
      explanation: "Create the devopslab namespace for organizing application resources"
    },
    {
      command: "kubectl create configmap postgres-init-script --from-file=init.sql=./db/init.sql -n devopslab",
      explanation: "Create a ConfigMap with the database initialization script"
    },
    {
      command: "kubectl apply -k deployments/kustomize/overlays/dev",
      explanation: "Deploy the application using Kustomize with development environment configuration"
    },
    {
      command: "kubectl apply -k deployments/kustomize/overlays/prod",
      explanation: "Deploy the application using Kustomize with production environment configuration"
    },
    {
      command: "kubectl kustomize deployments/kustomize/overlays/dev",
      explanation: "Preview the generated Kubernetes manifests for development without applying them"
    },
    {
      command: "kubectl delete -k deployments/kustomize/overlays/dev",
      explanation: "Remove all resources deployed with the development Kustomize configuration"
    },
    {
      command: "kubectl port-forward svc/frontend-service 3000:80 -n devopslab",
      explanation: "Forward local port 3000 to access the frontend service"
    }
  ];

  return (
    <div className="deployment-page">
      {/* Header */}
      <div className="deployment__header">
        <div className="deployment__header-content">
          <Settings className="deployment__icon" size={48} />
          <h1 className="deployment__title">Kustomize Deployment</h1>
          <p className="deployment__subtitle">
            Template-free configuration management for Kubernetes, enabling environment-specific customizations.
          </p>
        </div>
      </div>

      {/* Commands Section */}
      <div className="deployment__section">
        <h2 className="deployment__section-title">Kustomize Commands</h2>
        <p className="deployment__section-description">
          Deploy applications with environment-specific configurations using Kustomize overlays.
        </p>
        
        <div className="deployment__commands">
          {kustomizeCommands.map((item, index) => (
            <CommandTooltip 
              key={index}
              command={item.command}
              explanation={item.explanation}
            />
          ))}
        </div>
      </div>

      {/* Kustomize Structure */}
      <div className="deployment__section">
        <h2 className="deployment__section-title">Kustomize Structure</h2>
        <p className="deployment__section-description">
          Kustomize organizes configurations into base resources and environment-specific overlays:
        </p>
        
        <div className="configuration-overview">
          <div className="config-service">
            <h4>Base</h4>
            <p>Common Kubernetes manifests shared across all environments</p>
          </div>
          <div className="config-service">
            <h4>Dev Overlay</h4>
            <p>Development-specific patches and configurations</p>
          </div>
          <div className="config-service">
            <h4>Prod Overlay</h4>
            <p>Production optimizations and security configurations</p>
          </div>
          <div className="config-service">
            <h4>Patches</h4>
            <p>Environment-specific modifications to base resources</p>
          </div>
        </div>
      </div>

      {/* Key Benefits */}
      <div className="deployment__section">
        <h2 className="deployment__section-title">Key Features</h2>
        <div className="deployment__benefits">
          <div className="benefit-item">
            <div className="benefit-item__icon">✓</div>
            <div className="benefit-item__content">
              <h3>Environment-Specific Configs</h3>
              <p>Customize deployments for different environments without duplicating manifests</p>
            </div>
          </div>
          <div className="benefit-item">
            <div className="benefit-item__icon">✓</div>
            <div className="benefit-item__content">
              <h3>No Templating Required</h3>
              <p>Pure Kubernetes YAML without complex templating or variable substitution</p>
            </div>
          </div>
          <div className="benefit-item">
            <div className="benefit-item__icon">✓</div>
            <div className="benefit-item__content">
              <h3>Declarative Approach</h3>
              <p>Define what you want, not how to get there, with strategic merge patches</p>
            </div>
          </div>
          <div className="benefit-item">
            <div className="benefit-item__icon">✓</div>
            <div className="benefit-item__content">
              <h3>GitOps Friendly</h3>
              <p>Perfect for GitOps workflows with version-controlled configuration changes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KustomizeDeployment;