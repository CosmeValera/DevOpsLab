import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Server, 
  Settings, 
  Package,
  Box,
  Layers,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import CopyCommandBox from "../shared/CopyCommandBox";

const deploymentMethods = [
  {
    id: "docker",
    title: "Docker",
    description: "Basic containerization with Docker",
    icon: <Box />,
    path: "/deployments/docker",
    commands: [
      "docker build -t devopslab-frontend .",
      "docker run -p 3000:3000 devopslab-frontend"
    ],
    features: ["Portability", "Isolation", "Reproducibility"],
    techClass: "tech-card--docker"
  },
  {
    id: "docker-compose",
    title: "Docker Compose",
    description: "Multi-container orchestration",
    icon: <Layers />,
    path: "/deployments/docker-compose",
    commands: [
      "docker-compose up -d",
      "docker-compose down"
    ],
    features: ["Multi-service", "Declarative config", "Automatic networking"],
    techClass: "tech-card--docker-compose"
  },
  {
    id: "kubernetes",
    title: "Kubernetes",
    description: "Native Kubernetes orchestration",
    icon: <Server />,
    path: "/deployments/kubernetes",
    commands: [
      "kubectl apply -f deployments/k8s/",
      "kubectl get pods",
      "kubectl port-forward svc/frontend 3000:3000"
    ],
    features: ["Scalability", "High availability", "Service discovery"],
    techClass: "tech-card--kubernetes"
  },
  {
    id: "kustomize",
    title: "Kustomize",
    description: "Template-free configuration management",
    icon: <Settings />,
    path: "/deployments/kustomize",
    commands: [
      "kubectl apply -k deployments/kustomize/overlays/dev",
      "kubectl apply -k deployments/kustomize/overlays/prod"
    ],
    features: ["No templates", "Environment-specific config", "Declarative approach"],
    techClass: "tech-card--kustomize"
  },
  {
    id: "helm",
    title: "Helm",
    description: "Kubernetes package manager",
    icon: <Package />,
    path: "/deployments/helm",
    commands: [
      "helm install devopslab ./deployments/helm",
      "helm upgrade devopslab ./deployments/helm",
      "helm uninstall devopslab"
    ],
    features: ["Release management", "Advanced templating", "Easy rollbacks"],
    techClass: "tech-card--helm"
  }
];

const DeploymentPage: React.FC = () => {
  const navigate = useNavigate();

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="home-section">
      <div className="section__header">
        <h2 className="section__title">Deployment Methods</h2>
        <p className="section__subtitle">
          Explore different ways to deploy this application
        </p>
      </div>

      <div className="home-section__grid">
        {deploymentMethods.map((method) => (
          <div
            key={method.id}
            className={`tech-card card--interactive ${method.techClass}`}
            onClick={() => handleCardClick(method.path)}
            style={{ cursor: 'pointer' }}>
            <div className="tech-card__icon">
              {method.icon}
            </div>
            
            <h3 className="tech-card__title">{method.title}</h3>
            <p className="tech-card__description">{method.description}</p>

            <div className="deployment__commands">
              <h4>Basic commands:</h4>
              {method.commands.map((command, index) => (
                <CopyCommandBox key={index} command={command} />
              ))}
            </div>

            <div className="tech-card__features">
              {method.features.map((feature, index) => (
                <span key={index} className="tech-card__feature">
                  <CheckCircle size={12} />
                  {feature}
                </span>
              ))}
            </div>

            <div className="tech-card__footer">
              <Link 
                to={method.path}
                className="btn btn--primary btn--with-icon"
                style={{ width: "100%" }}
                onClick={(e) => e.stopPropagation()}>
                <ArrowRight size={16} />
                How to Deploy
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeploymentPage;