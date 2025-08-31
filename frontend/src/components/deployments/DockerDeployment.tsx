import React from "react";
import { Box } from "lucide-react";
import CommandSteps from "../shared/CommandSteps";

const DockerDeployment: React.FC = () => {
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
      title: "Build & Run Containers",
      description: "Build Docker images and run containers for the application services",
      commands: [
        {
          command: "docker build -t devopslab-frontend ./frontend",
          explanation: "Build a Docker image for the frontend application with the tag 'devopslab-frontend'"
        },
        {
          command: "docker run -d --name frontend -p 3000:3000 devopslab-frontend",
          explanation: "Run the frontend container in detached mode, mapping port 3000 to access the application"
        },
        {
          command: "localhost:3000",
          explanation: "Access the frontend application at localhost:3000"
        },
        {
          command: "docker build -t devopslab-backend ./backend", 
          explanation: "Build a Docker image for the backend application with the tag 'devopslab-backend'"
        },
        {
          command: "docker run -d --name backend -p 3001:3001 devopslab-backend",
          explanation: "Run the backend container in detached mode, mapping port 3001 for API access"
        },
        {
          command: "localhost:3001",
          explanation: "Access the backend application at localhost:3001"
        },
        {
          command: "docker build --build-arg DOCKER_GID=$(getent group docker | cut -d: -f3) -t devopslab-jenkins ./jenkins", 
          explanation: "Build a Docker image for the jenkins application with the tag 'devopslab-jenkins'"
        },
        {
          command: "docker run -d --name jenkins -p 8080:8080 -p 50000:50000 --network host -e JENKINS_OPTS=--httpPort=8080 --restart=on-failure -v jenkins_home:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock devopslab-jenkins",
          explanation: "Run the jenkins container in detached mode, mapping port 8080 for Jenkins access"
        },
        {
          command: "localhost:8080",
          explanation: "Access the Jenkins application at localhost:8080"
        }
      ]
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
          <CommandSteps steps={commandSteps} />
        </div>
        
        {/* Verification Section */}
        <div className="deployment__section">
          <h2 className="deployment__section-title">Verify Deployment</h2>
          <p className="deployment__section-description">
            After running the containers, verify your deployment is working correctly.
          </p>
          
          <div className="verification-steps">
            <div className="verification-step">
              <div className="verification-step__icon">🌐</div>
              <div className="verification-step__content">
                <h4>Frontend Application</h4>
                <p>Visit <code>http://localhost:3000</code> in your browser to access the React application.</p>
              </div>
            </div>
            
            <div className="verification-step">
              <div className="verification-step__icon">🔌</div>
              <div className="verification-step__content">
                <h4>Backend API</h4>
                <p>Test the API at <code>http://localhost:3001</code> or use <code>curl http://localhost:3001/health</code></p>
              </div>
            </div>
            
            <div className="verification-step">
              <div className="verification-step__icon">📊</div>
              <div className="verification-step__content">
                <h4>Container Status</h4>
                <p>Check running containers with <code>docker ps</code> to ensure both containers are healthy.</p>
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