import React from "react";
import { Terminal, Package, Play, Settings, Info, AlertTriangle, CheckCircle, Box, Layers } from "lucide-react";
import TutorialLayout from "./TutorialLayout";
import CrossReferenceLinks from "../shared/CrossReferenceLinks";

const DockerTutorial: React.FC = () => {
  const crossReferenceLinks = [
    {
      title: "Docker Deployment",
      path: "/deployments/docker",
      description: "Deploy this application using individual Docker containers with step-by-step instructions",
      icon: Box,
      type: 'deployment' as const
    },
    {
      title: "Docker Compose Deployment",
      path: "/deployments/docker-compose",
      description: "Deploy the full application stack with Docker Compose for multi-service orchestration",
      icon: Layers,
      type: 'deployment' as const
    }
  ];

  return (
    <TutorialLayout
      title="Docker Fundamentals"
      description="Learn containerization basics"
      estimatedReadingTime="4 minutes"
      prerequisites="Basic command line knowledge"
      currentTutorial="docker"
      customNextSteps={
        <CrossReferenceLinks 
          title="Ready to Deploy?"
          links={crossReferenceLinks as any}
        />
      }
    >
      <div className="tutorial-section">
        <h2>What is Docker?</h2>
        <p>
          Docker is a platform that allows you to package your application and all its dependencies into a standardized unit called a <strong>container</strong>. 
          Think of containers as lightweight, portable packages that include everything needed to run your application: code, runtime, system tools, libraries, and settings.
        </p>
        
        <div className="info-box">
          <Info size={20} />
          <div>
            <h4>Why Docker?</h4>
            <p>
              Docker solves the "it works on my machine" problem by ensuring that your application runs the same way in any environment - 
              whether it's your laptop, a test server, or production.
            </p>
          </div>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Core Concepts</h2>
        
        <div className="concept-grid">
          <div className="concept-card">
            <div className="concept-card__icon">
              <Package size={24} />
            </div>
            <h3>Images</h3>
            <p>
              A read-only template that contains instructions for creating a container. 
              Images are built from a Dockerfile and can be shared via registries like Docker Hub.
            </p>
          </div>
          
          <div className="concept-card">
            <div className="concept-card__icon">
              <Play size={24} />
            </div>
            <h3>Containers</h3>
            <p>
              Running instances of images. Containers are isolated from each other and the host system, 
              but can communicate through defined networks and shared volumes.
            </p>
          </div>
          
          <div className="concept-card">
            <div className="concept-card__icon">
              <Settings size={24} />
            </div>
            <h3>Dockerfile</h3>
            <p>
              A text file with instructions for building an image. It defines the base image, 
              files to copy, commands to run, and the process to start when the container runs.
            </p>
          </div>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Understanding Images vs Containers</h2>
        
        <div className="comparison-table">
          <div className="comparison-table__header">
            <div className="comparison-table__cell">Aspect</div>
            <div className="comparison-table__cell">Images</div>
            <div className="comparison-table__cell">Containers</div>
          </div>
          <div className="comparison-table__row">
            <div className="comparison-table__cell">State</div>
            <div className="comparison-table__cell">Read-only</div>
            <div className="comparison-table__cell">Read-write</div>
          </div>
          <div className="comparison-table__row">
            <div className="comparison-table__cell">Purpose</div>
            <div className="comparison-table__cell">Template</div>
            <div className="comparison-table__cell">Running instance</div>
          </div>
          <div className="comparison-table__row">
            <div className="comparison-table__cell">Storage</div>
            <div className="comparison-table__cell">Layered filesystem</div>
            <div className="comparison-table__cell">Writable layer</div>
          </div>
          <div className="comparison-table__row">
            <div className="comparison-table__cell">Lifecycle</div>
            <div className="comparison-table__cell">Build once, use many</div>
            <div className="comparison-table__cell">Create, start, stop, delete</div>
          </div>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Dockerfile Basics</h2>
        
        <p>
          A Dockerfile is like a recipe for building your Docker image. It contains step-by-step instructions 
          that Docker follows to create a reproducible environment for your application.
        </p>

        <div className="code-example">
          <h4>Basic Dockerfile Example</h4>
          <pre className="code-block">
{`# Use official Node.js runtime as base image
FROM node:18-alpine

# Set working directory in container
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "start"]`}
          </pre>
        </div>

        <div className="dockerfile-instructions">
          <h4>Common Dockerfile Instructions</h4>
          <div className="instruction-list">
            <div className="instruction-item">
              <code>FROM</code>
              <span>Specifies the base image to use</span>
            </div>
            <div className="instruction-item">
              <code>WORKDIR</code>
              <span>Sets the working directory for subsequent instructions</span>
            </div>
            <div className="instruction-item">
              <code>COPY</code>
              <span>Copies files from host to container</span>
            </div>
            <div className="instruction-item">
              <code>RUN</code>
              <span>Executes commands during image build</span>
            </div>
            <div className="instruction-item">
              <code>EXPOSE</code>
              <span>Documents which ports the container listens on</span>
            </div>
            <div className="instruction-item">
              <code>CMD</code>
              <span>Specifies the command to run when container starts</span>
            </div>
          </div>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Your First Docker Workflow</h2>
        
        <div className="workflow-steps">
          <div className="workflow-step">
            <div className="workflow-step__number">1</div>
            <div className="workflow-step__content">
              <h4>Write a Dockerfile</h4>
              <p>Create a Dockerfile in your project root with instructions for building your application image.</p>
            </div>
          </div>
          
          <div className="workflow-step">
            <div className="workflow-step__number">2</div>
            <div className="workflow-step__content">
              <h4>Build the Image</h4>
              <p>Use <code>docker build</code> to create an image from your Dockerfile.</p>
              <div className="command-example">
                <Terminal size={16} />
                <code>docker build -t myapp:latest .</code>
              </div>
            </div>
          </div>
          
          <div className="workflow-step">
            <div className="workflow-step__number">3</div>
            <div className="workflow-step__content">
              <h4>Run a Container</h4>
              <p>Start a container from your image using <code>docker run</code>.</p>
              <div className="command-example">
                <Terminal size={16} />
                <code>docker run -p 8080:3000 myapp:latest</code>
              </div>
            </div>
          </div>
          
          <div className="workflow-step">
            <div className="workflow-step__number">4</div>
            <div className="workflow-step__content">
              <h4>Share Your Image</h4>
              <p>Push your image to a registry like Docker Hub for others to use.</p>
              <div className="command-example">
                <Terminal size={16} />
                <code>docker push username/myapp:latest</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Essential Docker Commands</h2>
        
        <div className="commands-grid">
          <div className="command-card">
            <h4>Image Management</h4>
            <div className="command-list">
              <div className="command-item">
                <code>docker images</code>
                <span>List all images</span>
              </div>
              <div className="command-item">
                <code>docker build -t name:tag .</code>
                <span>Build image from Dockerfile</span>
              </div>
              <div className="command-item">
                <code>docker pull image:tag</code>
                <span>Download image from registry</span>
              </div>
              <div className="command-item">
                <code>docker rmi image:tag</code>
                <span>Remove image</span>
              </div>
            </div>
          </div>
          
          <div className="command-card">
            <h4>Container Management</h4>
            <div className="command-list">
              <div className="command-item">
                <code>docker ps</code>
                <span>List running containers</span>
              </div>
              <div className="command-item">
                <code>docker run image:tag</code>
                <span>Create and start container</span>
              </div>
              <div className="command-item">
                <code>docker stop container_id</code>
                <span>Stop running container</span>
              </div>
              <div className="command-item">
                <code>docker rm container_id</code>
                <span>Remove container</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Key Takeaways</h2>
        
        <div className="best-practices">
          <div className="practice-item practice-item--good">
            <CheckCircle size={20} />
            <div>
              <h4>Images are Templates</h4>
              <p>Think of images as blueprints that define how to create a container. They're read-only and reusable.</p>
            </div>
          </div>
          
          <div className="practice-item practice-item--good">
            <CheckCircle size={20} />
            <div>
              <h4>Containers are Running Instances</h4>
              <p>Containers are the actual running applications created from images. They're isolated and portable.</p>
            </div>
          </div>
          
          <div className="practice-item practice-item--good">
            <CheckCircle size={20} />
            <div>
              <h4>Dockerfiles are Recipes</h4>
              <p>Dockerfiles contain step-by-step instructions for building images. They make your setup reproducible.</p>
            </div>
          </div>
          
          <div className="practice-item practice-item--warning">
            <AlertTriangle size={20} />
            <div>
              <h4>Start Simple</h4>
              <p>Begin with basic Dockerfiles and gradually learn advanced features like multi-stage builds and optimization.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Next Steps</h2>
        
        <p>
          Congratulations! You now understand the fundamentals of Docker. In the next tutorial, 
          we'll explore Kubernetes and learn how to orchestrate multiple containers at scale.
        </p>
        
        <div className="next-steps">
          <div className="next-step">
            <h4>Practice</h4>
            <p>Try building and running a simple web application with Docker</p>
          </div>
          <div className="next-step">
            <h4>Explore</h4>
            <p>Learn about Docker Compose for multi-container applications</p>
          </div>
          <div className="next-step">
            <h4>Continue</h4>
            <p>Move on to Kubernetes to learn container orchestration</p>
          </div>
        </div>
      </div>
    </TutorialLayout>
  );
};

export default DockerTutorial;
