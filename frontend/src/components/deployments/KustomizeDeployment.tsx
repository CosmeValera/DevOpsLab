import React from "react";
import { Settings } from "lucide-react";
import CommandSteps from "../shared/CommandSteps";

const KustomizeDeployment: React.FC = () => {
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
      title: "Namespace & ConfigMap",
      description: "Set up the Kubernetes namespace and configure the database initialization",
      commands: [
        {
          command: "kubectl apply -f deployments/k8s/namespace.yaml",
          explanation: "Create the devopslab namespace for organizing application resources"
        },
        {
          command: "kubectl create configmap postgres-init-script --from-file=init.sql=./db/init.sql -n devopslab",
          explanation: "Create a ConfigMap with the database initialization script"
        }
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
        }
      ]
    },
    {
      title: "Deploy with Kustomize",
      description: "Use Kustomize to deploy environment-specific configurations",
      commands: [
        {
          command: "kubectl apply -k deployments/kustomize/overlays/dev",
          explanation: "Deploy the application using Kustomize with development environment configuration"
        },
        {
          command: "kubectl kustomize deployments/kustomize/overlays/dev",
          explanation: "Preview the generated Kubernetes manifests for development without applying them"
        },
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
          <CommandSteps steps={commandSteps} />
        </div>
        
        {/* Verification Section */}
        <div className="deployment__section">
          <h2 className="deployment__section-title">Verify Deployment</h2>
          <p className="deployment__section-description">
            After deploying with Kustomize, verify your environment-specific configuration is working.
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
              <div className="verification-step__icon">🔧</div>
              <div className="verification-step__content">
                <h4>Kustomize Preview</h4>
                <p>Preview generated manifests: <code>kubectl kustomize deployments/kustomize/overlays/dev</code></p>
              </div>
            </div>
            
            <div className="verification-step">
              <div className="verification-step__icon">📊</div>
              <div className="verification-step__content">
                <h4>Environment Resources</h4>
                <p>Check dev environment: <code>kubectl get all -n devopslab</code></p>
              </div>
            </div>
          </div>
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