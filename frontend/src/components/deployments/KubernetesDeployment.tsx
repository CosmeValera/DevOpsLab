import React from "react";
import { Server, BookOpen } from "lucide-react";
import CommandSteps from "../shared/CommandSteps";
import CrossReferenceLinks from "../shared/CrossReferenceLinks";

const KubernetesDeployment: React.FC = () => {
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
      description: "Set up the Kubernetes namespace and configure the database initialization",
      commands: [
        {
          command: "kubectl apply -f deployments/k8s/namespace.yaml",
          explanation: "Create the devopslab namespace to organize and isolate application resources"
        }
      ]
    },
    {
      title: "Deploy to Kubernetes",
      description: "Deploy or delete the application manifests",
      commands: [
        {
          command: "kubectl apply -f deployments/k8s/frontend/ -f deployments/k8s/backend/",
          explanation: "Deploy the frontend and backend Kubernetes manifests (deployment, service, configmap) to the cluster"
        },
        {
          command: "kubectl delete -f deployments/k8s/frontend/ -f deployments/k8s/backend/",
          explanation: "Delete the frontend and backend Kubernetes manifests (deployments, services, configmaps) to the cluster"
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
          <Server className="deployment__icon" size={48} />
          <h1 className="deployment__title">Kubernetes Deployment</h1>
          <p className="deployment__subtitle">
            Native Kubernetes orchestration with automatic scaling, load balancing, and self-healing capabilities.
          </p>
        </div>
      </div>

      {/* Commands Section */}
      <div className="deployment__section">
        <h2 className="deployment__section-title">Deployment Commands</h2>
        <p className="deployment__section-description">
          Deploy this application to a Kubernetes cluster using kubectl and the provided manifests.
        </p>
        
        <div className="deployment__commands">
          <CommandSteps steps={commandSteps} />
        </div>
        
        {/* Verification Section */}
        <div className="deployment__section">
          <h2 className="deployment__section-title">Verify Deployment</h2>
          <p className="deployment__section-description">
            After deploying to Kubernetes, verify your application is running correctly.
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
                <h4>Cluster Status</h4>
                <p>Check all resources: <code>kubectl get all -n devopslab</code></p>
              </div>
            </div>
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
              <h3>Auto-Scaling</h3>
              <p>Automatically scale applications based on CPU usage and custom metrics</p>
            </div>
          </div>
          <div className="benefit-item">
            <div className="benefit-item__icon">✓</div>
            <div className="benefit-item__content">
              <h3>Load Balancing</h3>
              <p>Built-in load balancing distributes traffic across multiple pod instances</p>
            </div>
          </div>
          <div className="benefit-item">
            <div className="benefit-item__icon">✓</div>
            <div className="benefit-item__content">
              <h3>Self-Healing</h3>
              <p>Automatically restart failed containers and replace unhealthy nodes</p>
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
              title: "Kubernetes Tutorial",
              path: "/tutorials/kubernetes",
              description: "Learn the fundamentals of Kubernetes, including pods, deployments, and services",
              icon: BookOpen,
              type: 'tutorial' as const
            }
          ] as any}
        />
      </div>
    </div>
  );
};

export default KubernetesDeployment;