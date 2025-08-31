import React from "react";
import { Package } from "lucide-react";
import CommandSteps from "../shared/CommandSteps";

const HelmDeployment: React.FC = () => {
  const commandSteps = [
    {
      title: "Setup Repository",
      description: "Clone the repository and navigate to the project directory",
      commands: [
        {
          command: "git clone https://github.com/cosmevalera/devopslab",
          explanation: "Clone the DevOpsLab repository from GitHub to your local machine"
        },
        {
          command: "cd devopslab",
          explanation: "Navigate into the cloned repository directory"
        }
      ]
    },
    {
      title: "Build Images",
      description: "Build Docker images for the application services",
      commands: [
        {
          command: "docker build -t devopslab-frontend ./frontend",
          explanation: "Build a Docker image for the frontend application with the tag 'devopslab-frontend'"
        },
        {
          command: "docker build -t devopslab-backend ./backend", 
          explanation: "Build a Docker image for the backend application with the tag 'devopslab-backend'"
        },
      ]
    },
    {
      title: "Minikube Setup",
      description: "Start Minikube and load the required Docker images into the cluster",
      commands: [
        {
          command: "minikube start",
          explanation: "Start Minikube cluster for local Kubernetes development environment"
        },
        {
          command: "minikube image load devopslab-frontend",
          explanation: "Load the frontend Docker image into Minikube's Docker daemon"
        },
        {
          command: "minikube image load devopslab-backend",
          explanation: "Load the backend Docker image into Minikube's Docker daemon"
        },
        {
          command: "minikube image load postgres:15-alpine",
          explanation: "Load the postgres Docker image into Minikube's Docker daemon"
        }
      ]
    },
    {
      title: "Predeploy Setup",
      description: "Set up the Kubernetes namespace and configure the database initialization",
      commands: [
        {
          command: "kubectl apply -f deployments/k8s/namespace.yaml",
          explanation: "Create the devopslab namespace to organize and isolate application resources"
        },
        {
          command: "kubectl create configmap postgres-init-script --from-file=init.sql=./db/init.sql -n devopslab",
          explanation: "Create a ConfigMap containing the database initialization script"
        }
      ]
    },
    {
      title: "Helm Operations",
      description: "Deploy and manage the application using Helm charts",
      commands: [
        {
          command: "helm install devopslab ./deployments/helm/devopslab -f ./deployments/helm/devopslab/values-dev.yaml",
          explanation: "Install the DevOpsLab Helm chart with development values"
        },
        {
          command: "helm upgrade devopslab ./deployments/helm/devopslab -f ./deployments/helm/devopslab/values-prod.yaml",
          explanation: "Update an existing Helm release with new configuration or chart version"
        },
        {
          command: "helm list",
          explanation: "List all Helm releases and their current status"
        },
        {
          command: "helm uninstall devopslab",
          explanation: "Remove the DevOpsLab Helm release and all associated resources"
        }
      ]
    },
    {
      title: "Access & Monitor",
      description: "Access the deployed application and monitor the cluster status",
      commands: [
        {
          command: "kubectl port-forward svc/frontend-service 3000:80 -n devopslab",
          explanation: "Forward local port 3000 to access the frontend service"
        },
        {
          command: "kubectl port-forward svc/backend-service 3001:80 -n devopslab",
          explanation: "Forward local port 3001 to access the backend API service"
        },
        {
          command: "kubectl get all -n devopslab",
          explanation: "View all resources in the devopslab namespace including pods, services, and deployments"
        }
      ]
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
          <CommandSteps steps={commandSteps} />
        </div>
        
        {/* Verification Section */}
        <div className="deployment__section">
          <h2 className="deployment__section-title">Verify Deployment</h2>
          <p className="deployment__section-description">
            After deploying with Helm, verify your application and monitor the release status.
          </p>
          
          <div className="verification-steps">
            <div className="verification-step">
              <div className="verification-step__icon">🌐</div>
              <div className="verification-step__content">
                <h4>Frontend Application</h4>
                <p>Access the application through port-forward: <code>http://localhost:3000</code></p>
              </div>
            </div>
            
            <div className="verification-step">
              <div className="verification-step__icon">🔌</div>
              <div className="verification-step__content">
                <h4>Backend API</h4>
                <p>Test the API through port-forward: <code>http://localhost:3001</code></p>
              </div>
            </div>
            
            <div className="verification-step">
              <div className="verification-step__icon">📦</div>
              <div className="verification-step__content">
                <h4>Helm Release Status</h4>
                <p>Check release: <code>helm status devopslab</code> and <code>helm list</code></p>
              </div>
            </div>
            
            <div className="verification-step">
              <div className="verification-step__icon">📊</div>
              <div className="verification-step__content">
                <h4>Kubernetes Resources</h4>
                <p>Monitor resources: <code>kubectl get all -n devopslab</code></p>
              </div>
            </div>
          </div>
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