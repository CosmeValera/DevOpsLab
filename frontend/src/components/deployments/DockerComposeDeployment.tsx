import React from "react";
import { Layers, BookOpen } from "lucide-react";
import CommandSteps from "../shared/CommandSteps";
import CrossReferenceLinks from "../shared/CrossReferenceLinks";

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
          Deploy this complete application stack including frontend, backend and jenkins with Docker Compose.
        </p>
        
        <div className="deployment__commands">
          <CommandSteps steps={commandSteps} />
        </div>
        
        {/* Verification Section */}
        <div className="deployment__section">
          <h2 className="deployment__section-title">Verify Deployment</h2>
          <p className="deployment__section-description">
            After starting the services, verify your complete application stack is running.
          </p>
          
          <div className="verification-steps">
            <div className="verification-step">
              <div className="verification-step__icon">🌐</div>
              <div className="verification-step__content">
                <h4>Frontend Application</h4>
                <p>Visit <code>http://localhost:3000</code> to access the React application.</p>
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
              <div className="verification-step__icon">⚙️</div>
              <div className="verification-step__content">
                <h4>Jenkins CI/CD</h4>
                <p>Access Jenkins at <code>http://localhost:8080</code> for CI/CD pipeline management.</p>
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
        </div>
      </div>

      {/* Cross-reference to tutorial */}
      <div className="deployment-section">
        <CrossReferenceLinks 
          title="Want to Learn More?"
          links={[
            {
              title: "Docker Tutorial",
              path: "/tutorials/docker",
              description: "Master Docker fundamentals including containers, images, and Dockerfiles",
              icon: BookOpen,
              type: 'tutorial' as const
            }
          ] as any}
        />
      </div>
    </div>
  );
};

export default DockerComposeDeployment;
