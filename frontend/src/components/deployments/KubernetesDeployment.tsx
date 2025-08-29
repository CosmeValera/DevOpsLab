import React from "react";
import { Server } from "lucide-react";
import CommandTooltip from "../shared/CommandTooltip";

const KubernetesDeployment: React.FC = () => {
  const kubernetesCommands = [
    {
      command: "kubectl apply -f deployments/k8s/namespace.yaml",
      explanation: "Create the devopslab namespace to organize and isolate application resources"
    },
    {
      command: "kubectl create configmap postgres-init-script --from-file=init.sql=./db/init.sql -n devopslab",
      explanation: "Create a ConfigMap containing the database initialization script"
    },
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
      command: "kubectl apply -f deployments/k8s/",
      explanation: "Deploy all Kubernetes manifests (deployments, services, configmaps) to the cluster"
    },
    {
      command: "kubectl get pods -n devopslab",
      explanation: "Check the status of all pods in the devopslab namespace"
    },
    {
      command: "kubectl port-forward svc/frontend-service 3000:80 -n devopslab",
      explanation: "Forward local port 3000 to the frontend service to access the application"
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
          Deploy the application to a Kubernetes cluster using kubectl and the provided manifests.
        </p>
        
        <div className="deployment__commands">
          {kubernetesCommands.map((item, index) => (
            <CommandTooltip 
              key={index}
              command={item.command}
              explanation={item.explanation}
            />
          ))}
        </div>
      </div>

      {/* Architecture Overview */}
      <div className="deployment__section">
        <h2 className="deployment__section-title">Kubernetes Resources</h2>
        <p className="deployment__section-description">
          The deployment includes the following Kubernetes resources:
        </p>
        
        <div className="configuration-overview">
          <div className="config-service">
            <h4>Deployments</h4>
            <p>Manage pods for frontend, backend, and database services</p>
          </div>
          <div className="config-service">
            <h4>Services</h4>
            <p>Expose applications and enable service-to-service communication</p>
          </div>
          <div className="config-service">
            <h4>ConfigMaps</h4>
            <p>Store configuration data and database initialization scripts</p>
          </div>
          <div className="config-service">
            <h4>Persistent Volumes</h4>
            <p>Provide persistent storage for the database</p>
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
          <div className="benefit-item">
            <div className="benefit-item__icon">✓</div>
            <div className="benefit-item__content">
              <h3>Service Discovery</h3>
              <p>Built-in DNS for service discovery and inter-service communication</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KubernetesDeployment;