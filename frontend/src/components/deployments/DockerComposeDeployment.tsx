import React from "react";
import { Layers } from "lucide-react";
import CommandSteps from "../shared/CommandSteps";

const DockerComposeDeployment: React.FC = () => {
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
      title: "Docker Compose Operations",
      description: "Manage the complete application stack with Docker Compose commands",
      commands: [
        {
          command: "docker-compose up -d",
          explanation: "Start all services defined in docker-compose.yml in detached mode (background)"
        },
        {
          command: "docker-compose ps",
          explanation: "Check the status of all running containers managed by Docker Compose"
        },
        {
          command: "docker-compose logs -f",
          explanation: "Follow the logs of all services in real-time to monitor application behavior"
        },
        {
          command: "docker-compose down",
          explanation: "Stop and remove all containers, networks, and volumes created by docker-compose up"
        }
      ]
    }
  ];

  return (
    <div className="deployment-page">
      {/* Header */}
      <div className="deployment__header">
        <div className="deployment__header-content">
          <Layers className="deployment__icon" size={48} />
          <h1 className="deployment__title">Docker Compose Deployment</h1>
          <p className="deployment__subtitle">
            Multi-container orchestration for full-stack application deployment with a single command.
          </p>
        </div>
      </div>

      {/* Commands Section */}
      <div className="deployment__section">
        <h2 className="deployment__section-title">Quick Start Commands</h2>
        <p className="deployment__section-description">
          Deploy the complete application stack including frontend, backend, and database with Docker Compose.
        </p>
        
        <div className="deployment__commands">
          <CommandSteps steps={commandSteps} />
        </div>
      </div>

      {/* Configuration Overview */}
      <div className="deployment__section">
        <h2 className="deployment__section-title">Docker Compose Configuration</h2>
        <p className="deployment__section-description">
          The docker-compose.yml file defines all services and their dependencies:
        </p>
        
        <div className="configuration-overview">
          <div className="config-service">
            <h4>Frontend Service</h4>
            <p>React application served on port 3000</p>
          </div>
          <div className="config-service">
            <h4>Backend Service</h4>
            <p>Node.js API server running on port 3001</p>
          </div>
          <div className="config-service">
            <h4>Database Service</h4>
            <p>PostgreSQL database with persistent storage</p>
          </div>
          <div className="config-service">
            <h4>Jenkins Service</h4>
            <p>CI/CD automation server on port 8080</p>
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
              <h3>Multi-Service Orchestration</h3>
              <p>Deploy entire application stack with all dependencies in one command</p>
            </div>
          </div>
          <div className="benefit-item">
            <div className="benefit-item__icon">✓</div>
            <div className="benefit-item__content">
              <h3>Declarative Configuration</h3>
              <p>Define your infrastructure as code with docker-compose.yml</p>
            </div>
          </div>
          <div className="benefit-item">
            <div className="benefit-item__icon">✓</div>
            <div className="benefit-item__content">
              <h3>Automatic Networking</h3>
              <p>Services can communicate with each other using service names as hostnames</p>
            </div>
          </div>
          <div className="benefit-item">
            <div className="benefit-item__icon">✓</div>
            <div className="benefit-item__content">
              <h3>Volume Management</h3>
              <p>Persistent data storage and easy volume mounting for development</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DockerComposeDeployment;
