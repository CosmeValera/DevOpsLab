import React from "react";
import { Box } from "lucide-react";
import CommandTooltip from "../shared/CommandTooltip";

const DockerDeployment: React.FC = () => {
  const dockerCommands = [
    {
      command: "git clone https://github.com/cosmevalera/devopslab",
      explanation: "Clone the DevOpsLab repository from GitHub to your local machine"
    },
    {
      command: "cd devopslab",
      explanation: "Navigate into the cloned repository directory"
    },
    {
      command: "docker build -t devopslab-frontend ./frontend",
      explanation: "Build a Docker image for the frontend application with the tag 'devopslab-frontend'"
    },
    {
      command: "docker build -t devopslab-backend ./backend", 
      explanation: "Build a Docker image for the backend application with the tag 'devopslab-backend'"
    },
    {
      command: "docker run -d --name frontend -p 3000:3000 devopslab-frontend",
      explanation: "Run the frontend container in detached mode, mapping port 3000 to access the application"
    },
    {
      command: "docker run -d --name backend -p 3001:3001 devopslab-backend",
      explanation: "Run the backend container in detached mode, mapping port 3001 for API access"
    }
  ];

  return (
    <div className="deployment-page">
      {/* Header */}
      <div className="deployment__header">
        <div className="deployment__header-content">
          <Box className="deployment__icon" size={48} />
          <h1 className="deployment__title">Docker Deployment</h1>
          <p className="deployment__subtitle">
            Basic containerization with Docker for consistent environments across development and production.
          </p>
        </div>
      </div>

      {/* Commands Section */}
      <div className="deployment__section">
        <h2 className="deployment__section-title">Basic Commands</h2>
        <p className="deployment__section-description">
          Follow these commands to deploy the application using Docker containers.
        </p>
        
        <div className="deployment__commands">
          {dockerCommands.map((item, index) => (
            <CommandTooltip 
              key={index}
              command={item.command}
              explanation={item.explanation}
            />
          ))}
        </div>
      </div>

      {/* Key Benefits */}
      <div className="deployment__section">
        <h2 className="deployment__section-title">Key Benefits</h2>
        <div className="deployment__benefits">
          <div className="benefit-item">
            <div className="benefit-item__icon">✓</div>
            <div className="benefit-item__content">
              <h3>Environment Consistency</h3>
              <p>Ensure the same environment across development, testing, and production</p>
            </div>
          </div>
          <div className="benefit-item">
            <div className="benefit-item__icon">✓</div>
            <div className="benefit-item__content">
              <h3>Easy Local Development</h3>
              <p>Quick setup for local development without complex dependency management</p>
            </div>
          </div>
          <div className="benefit-item">
            <div className="benefit-item__icon">✓</div>
            <div className="benefit-item__content">
              <h3>Resource Isolation</h3>
              <p>Each container runs in isolation with its own resources and dependencies</p>
            </div>
          </div>
          <div className="benefit-item">
            <div className="benefit-item__icon">✓</div>
            <div className="benefit-item__content">
              <h3>Simplified Deployment</h3>
              <p>Package applications with all dependencies for easy deployment anywhere</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DockerDeployment;