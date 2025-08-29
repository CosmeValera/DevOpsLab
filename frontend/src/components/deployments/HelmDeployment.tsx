import React from "react";
import { Package } from "lucide-react";
import CommandTooltip from "../shared/CommandTooltip";

const HelmDeployment: React.FC = () => {
  const helmCommands = [
    {
      command: "kubectl apply -f deployments/k8s/namespace.yaml",
      explanation: "Create the devopslab namespace for the Helm deployment"
    },
    {
      command: "kubectl create configmap postgres-init-script --from-file=init.sql=./db/init.sql -n devopslab",
      explanation: "Create a ConfigMap with the database initialization script"
    },
    {
      command: "helm install devopslab ./deployments/helm/devopslab -f ./deployments/helm/devopslab/values-dev.yaml",
      explanation: "Install the DevOpsLab Helm chart with development values"
    },
    {
      command: "helm install devopslab ./deployments/helm/devopslab -f ./deployments/helm/devopslab/values-prod.yaml",
      explanation: "Install the DevOpsLab Helm chart with production values"
    },
    {
      command: "helm upgrade devopslab ./deployments/helm/devopslab -f ./deployments/helm/devopslab/values-prod.yaml",
      explanation: "Update an existing Helm release with new configuration or chart version"
    },
    {
      command: "helm uninstall devopslab",
      explanation: "Remove the DevOpsLab Helm release and all associated resources"
    },
    {
      command: "helm list",
      explanation: "List all Helm releases and their current status"
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
          <Package className="deployment__icon" size={48} />
          <h1 className="deployment__title">Helm Deployment</h1>
          <p className="deployment__subtitle">
            Kubernetes package manager that simplifies application deployment and management with templating and versioning.
          </p>
        </div>
      </div>

      {/* Commands Section */}
      <div className="deployment__section">
        <h2 className="deployment__section-title">Helm Commands</h2>
        <p className="deployment__section-description">
          Deploy and manage the application using Helm charts with environment-specific values.
        </p>
        
        <div className="deployment__commands">
          {helmCommands.map((item, index) => (
            <CommandTooltip 
              key={index}
              command={item.command}
              explanation={item.explanation}
            />
          ))}
        </div>
      </div>

      {/* Helm Chart Structure */}
      <div className="deployment__section">
        <h2 className="deployment__section-title">Helm Chart Components</h2>
        <p className="deployment__section-description">
          The Helm chart includes templates and values for complete application lifecycle management:
        </p>
        
        <div className="configuration-overview">
          <div className="config-service">
            <h4>Templates</h4>
            <p>Kubernetes manifest templates with Go templating for dynamic values</p>
          </div>
          <div className="config-service">
            <h4>Values Files</h4>
            <p>Environment-specific configurations for dev and production deployments</p>
          </div>
          <div className="config-service">
            <h4>Chart Metadata</h4>
            <p>Chart version, dependencies, and application information</p>
          </div>
          <div className="config-service">
            <h4>Hooks</h4>
            <p>Pre and post-installation actions for database migrations and setup</p>
          </div>
        </div>
      </div>

      {/* Key Benefits */}
      <div className="deployment__section">
        <h2 className="deployment__section-title">Key Benefits</h2>
        <div className="deployment__benefits">
          <div className="benefit-item">
            <div className="benefit-item__icon">✓</div>
            <div className="benefit-item__content">
              <h3>Package Management</h3>
              <p>Bundle entire applications with dependencies into versioned, reusable packages</p>
            </div>
          </div>
          <div className="benefit-item">
            <div className="benefit-item__icon">✓</div>
            <div className="benefit-item__content">
              <h3>Version Control</h3>
              <p>Track and rollback application versions with built-in release management</p>
            </div>
          </div>
          <div className="benefit-item">
            <div className="benefit-item__icon">✓</div>
            <div className="benefit-item__content">
              <h3>Easy Rollbacks</h3>
              <p>Quickly revert to previous working versions when issues are detected</p>
            </div>
          </div>
          <div className="benefit-item">
            <div className="benefit-item__icon">✓</div>
            <div className="benefit-item__content">
              <h3>Template Engine</h3>
              <p>Powerful Go templating for dynamic manifest generation and value substitution</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelmDeployment;