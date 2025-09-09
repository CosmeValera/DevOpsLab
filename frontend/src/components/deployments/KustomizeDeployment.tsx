import React from "react";
import { Settings, BookOpen } from "lucide-react";
import CommandSteps from "../shared/CommandSteps";
import CrossReferenceLinks from "../shared/CrossReferenceLinks";

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
        }
      ]
    },
    {
      title: "Predeploy Setup",
      description: "Set up the Kubernetes namespace",
      commands: [
        {
          command: "kubectl apply -f deployments/k8s/namespace.yaml",
          explanation: "Create the devopslab namespace to organize and isolate application resources"
        }
      ]
    },
    {
      title: "Deploy with Kustomize",
      description: "Use Kustomize to preview, deploy and delete environment-specific configurations",
      commands: [
        {
          command: "kubectl kustomize deployments/kustomize/overlays/dev # Preview manifests",
          explanation: "Preview the generated Kubernetes manifests for development without applying them"
        },
        {
          command: "kubectl apply -k deployments/kustomize/overlays/dev # Dev",
          explanation: "Deploy the application using Kustomize with development environment configuration"
        },
        {
          command: "kubectl apply -k deployments/kustomize/overlays/prod # Prod",
          explanation: "Deploy the application using Kustomize with production environment configuration"
        },
        {
          command: "kubectl delete -k deployments/kustomize/overlays/dev # Delete",
          explanation: "Delete the application using Kustomize with development environment configuration"
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
          Deploy this application with environment-specific configurations using Kustomize overlays.
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
              <div className="verification-step__icon">📊</div>
              <div className="verification-step__content">
                <h4>Environment Resources</h4>
                <p>Check dev environment: <code>kubectl get all -n devopslab</code></p>
              </div>
            </div>
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

      {/* Cross-reference to tutorial */}
      <div className="deployment-section">
        <CrossReferenceLinks 
          title="Want to Learn More?"
          links={[
            {
              title: "Kustomize Tutorial",
              path: "/tutorials/kustomize",
              description: "Learn template-free configuration management with bases, overlays, and patches",
              icon: BookOpen,
              type: 'tutorial' as const
            }
          ] as any}
        />
      </div>
    </div>
  );
};

export default KustomizeDeployment;