import React from "react";
import { 
  Rocket, 
  BookOpen, 
  Zap, 
  Cloud, 
  Server, 
  Database,
  Container,
  Layers,
  Package,
  Settings,
  ExternalLink,
  ArrowRight,
  CheckCircle,
  Users,
  Clock
} from "lucide-react";

const IntroductionPage: React.FC = () => {
  const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL;
  const isProduction = !API_BASE_URL.includes('localhost');

  const deploymentMethods = [
    {
      icon: Container,
      title: "Docker",
      description: "Containerize applications with Docker and Docker Compose",
      features: ["Container isolation", "Multi-stage builds", "Docker Compose orchestration"]
    },
    {
      icon: Layers,
      title: "Kubernetes",
      description: "Deploy and manage containerized applications at scale",
      features: ["Pod orchestration", "Service discovery", "Auto-scaling", "Health checks"]
    },
    {
      icon: Settings,
      title: "Kustomize",
      description: "Template-free configuration management for Kubernetes",
      features: ["Base and overlays", "Strategic merge patches", "Environment-specific configs"]
    },
    {
      icon: Package,
      title: "Helm",
      description: "Package and distribute Kubernetes applications",
      features: ["Chart templating", "Dependency management", "Release management"]
    }
  ];

  const tutorials = [
    {
      icon: Container,
      title: "Docker Fundamentals",
      description: "Master containerization from the ground up",
      duration: "30 min",
      level: "Beginner"
    },
    {
      icon: Layers,
      title: "Kubernetes Introduction",
      description: "Orchestrate containers at scale",
      duration: "45 min",
      level: "Intermediate"
    },
    {
      icon: Settings,
      title: "Kustomize Deep Dive",
      description: "Template-free configuration management",
      duration: "35 min",
      level: "Intermediate"
    },
    {
      icon: Package,
      title: "Creating Helm Charts",
      description: "Package and distribute applications",
      duration: "60 min",
      level: "Advanced"
    },
    {
      icon: Zap,
      title: "Jenkins CI/CD",
      description: "Automate your development workflow",
      duration: "40 min",
      level: "Intermediate"
    }
  ];

  const jenkinsPipelines = [
    {
      name: "Master Pipeline",
      description: "Orchestrates all deployment pipelines in sequence"
    },
    {
      name: "Docker Pipeline",
      description: "Builds and deploys services using Docker containers"
    },
    {
      name: "Kubernetes Pipeline",
      description: "Deploys applications using raw Kubernetes manifests"
    },
    {
      name: "Kustomize Pipeline",
      description: "Deploys applications using Kustomize configuration management"
    },
    {
      name: "Helm Pipeline",
      description: "Deploys services using Helm charts for Kubernetes"
    }
  ];

  return (
    <div className="introduction-page">
      {/* Hero Section */}
      <div className="introduction-hero">
        <div className="introduction-hero__content">
          <div className="introduction-hero__icon">
            <Rocket size={48} />
          </div>
          <div className="introduction-hero__text">
            <h1 className="introduction-hero__title">DevOps Lab</h1>
            <p className="introduction-hero__subtitle">
              A comprehensive demonstration of modern DevOps practices including Docker, Kubernetes, and CI/CD pipelines. 
              This project showcases deployment strategies from containerization to production-ready orchestration.
            </p>
          </div>
        </div>
      </div>

      {/* Project Overview */}
      <div className="introduction-section">
        <div className="section-header">
          <h2 className="section-title">
            <Rocket size={20} />
            What is DevOps Lab?
          </h2>
          <p className="section-description">
            DevOps Lab is a hands-on learning platform that demonstrates real-world DevOps practices through 
            a complete application deployment pipeline. It's designed to help developers and DevOps engineers 
            understand modern deployment strategies and CI/CD automation.
          </p>
        </div>

        <div className="overview-cards">
          <div className="overview-card">
            <div className="overview-card__icon">
              <Container size={24} />
            </div>
            <div className="overview-card__content">
              <h3>Containerization</h3>
              <p>Learn Docker fundamentals and container orchestration with practical examples</p>
            </div>
          </div>
          <div className="overview-card">
            <div className="overview-card__icon">
              <Layers size={24} />
            </div>
            <div className="overview-card__content">
              <h3>Orchestration</h3>
              <p>Master Kubernetes deployment strategies and configuration management</p>
            </div>
          </div>
          <div className="overview-card">
            <div className="overview-card__icon">
              <Zap size={24} />
            </div>
            <div className="overview-card__content">
              <h3>Automation</h3>
              <p>Build robust CI/CD pipelines with Jenkins for seamless deployments</p>
            </div>
          </div>
        </div>
      </div>

      {/* Architecture Overview */}
      <div className="introduction-section">
        <div className="section-header">
          <h2 className="section-title">
            <Cloud size={20} />
            Architecture Overview
          </h2>
          <p className="section-description">
            {isProduction 
              ? 'This DevOps Lab is deployed on AWS cloud infrastructure with a modern serverless architecture'
              : 'This DevOps Lab can run locally or in the cloud, demonstrating both development and production environments'
            }
          </p>
        </div>

        <div className="architecture-card">
          {isProduction ? (
            <div className="architecture-content">
              <div className="architecture-info">
                <div className="architecture-item">
                  <div className="architecture-icon">
                    <Cloud size={24} />
                  </div>
                  <div className="architecture-details">
                    <h4>AWS S3</h4>
                    <p>Frontend hosting and static file delivery</p>
                  </div>
                </div>
                <div className="architecture-item">
                  <div className="architecture-icon">
                    <Database size={24} />
                  </div>
                  <div className="architecture-details">
                    <h4>AWS Lambda</h4>
                    <p>Serverless API for pipeline status and backend logic</p>
                  </div>
                </div>
                <div className="architecture-item">
                  <div className="architecture-icon">
                    <Server size={24} />
                  </div>
                  <div className="architecture-details">
                    <h4>AWS EC2</h4>
                    <p>Jenkins server with automated CI/CD pipelines</p>
                  </div>
                </div>
              </div>
              <div className="architecture-note">
                <p>
                  <strong>Want to explore locally?</strong> You can build this entire system on your own machine 
                  by following the setup instructions in the Jenkins section. This gives you full control and 
                  the ability to customize the pipelines.
                </p>
              </div>
            </div>
          ) : (
            <div className="architecture-content">
              <div className="architecture-info">
                <div className="architecture-item">
                  <div className="architecture-icon">
                    <Server size={24} />
                  </div>
                  <div className="architecture-details">
                    <h4>Local Development</h4>
                    <p>React + Vite frontend with Node.js Express backend</p>
                  </div>
                </div>
                <div className="architecture-item">
                  <div className="architecture-icon">
                    <Cloud size={24} />
                  </div>
                  <div className="architecture-details">
                    <h4>Cloud Alternative</h4>
                    <p>Powered by AWS, it uses S3 for frontend hosting, Lambda for the API and EC2 for the Jenkins server</p>
                  </div>
                </div>
              </div>
              <div className="architecture-note">
                <p>
                  <strong>Try the cloud version:</strong> 
                  <a 
                    href="http://devopslab-cosmevalera.s3-website.eu-central-1.amazonaws.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="cloud-link"
                  >
                    <ExternalLink size={16} />
                    Visit Cloud Deployment
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* What You'll Learn */}
      <div className="introduction-section">
        <div className="section-header">
          <h2 className="section-title">
            <BookOpen size={20} />
            What You'll Learn
          </h2>
          <p className="section-description">
            Explore different aspects of modern DevOps through hands-on experience with real tools and practices
          </p>
        </div>

        <div className="learning-grid">
          <div className="learning-card">
            <div className="learning-card__header">
              <div className="learning-card__icon">
                <Rocket size={24} />
              </div>
              <h3>Deployments</h3>
            </div>
            <div className="learning-card__content">
              <p>Master multiple deployment strategies with step-by-step guides</p>
              <div className="learning-features">
                {deploymentMethods.map((method, index) => (
                  <div key={index} className="learning-feature">
                    <method.icon size={16} />
                    <span>{method.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="learning-card">
            <div className="learning-card__header">
              <div className="learning-card__icon">
                <BookOpen size={24} />
              </div>
              <h3>Tutorials</h3>
            </div>
            <div className="learning-card__content">
              <p>Comprehensive learning paths for each technology</p>
              <div className="tutorial-list">
                {tutorials.map((tutorial, index) => (
                  <div key={index} className="tutorial-item">
                    <div className="tutorial-item__icon">
                      <tutorial.icon size={16} />
                    </div>
                    <div className="tutorial-item__content">
                      <h4>{tutorial.title}</h4>
                      <p>{tutorial.description}</p>
                      <div className="tutorial-item__meta">
                        <span className="tutorial-duration">
                          <Clock size={12} />
                          {tutorial.duration}
                        </span>
                        <span className="tutorial-level">
                          <Users size={12} />
                          {tutorial.level}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="learning-card">
            <div className="learning-card__header">
              <div className="learning-card__icon">
                <Zap size={24} />
              </div>
              <h3>Jenkins CI/CD</h3>
            </div>
            <div className="learning-card__content">
              <p>Automated deployment pipelines with real-time monitoring</p>
              <div className="pipeline-list">
                {jenkinsPipelines.map((pipeline, index) => (
                  <div key={index} className="pipeline-item">
                    <CheckCircle size={16} />
                    <div className="pipeline-item__content">
                      <h4>{pipeline.name}</h4>
                      <p>{pipeline.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Start */}
      <div className="introduction-section">
        <div className="section-header">
          <h2 className="section-title">
            <Rocket size={20} />
            Quick Start
          </h2>
          <p className="section-description">
            Get started with DevOps Lab in minutes using Docker Compose
          </p>
        </div>

        <div className="quick-start-card">
          <div className="quick-start-card__content">
            <div className="quick-start-steps">
              <div className="quick-start-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>Clone the Repository</h4>
                  <p>Get the complete DevOps Lab project</p>
                  <code>git clone https://github.com/cosmevalera/devopslab</code>
                </div>
              </div>
              <div className="quick-start-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>Start with Docker Compose</h4>
                  <p>Launch all services with a single command</p>
                  <code>docker-compose up -d</code>
                </div>
              </div>
              <div className="quick-start-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>Explore the Application</h4>
                  <p>Visit localhost:3000 to start learning</p>
                  <code>http://localhost:3000</code>
                </div>
              </div>
            </div>
            <div className="quick-start-note">
              <p>
                <strong>Jenkins Access:</strong> To access Jenkins, execute: 
                <code>docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword</code>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Guide */}
      <div className="introduction-section">
        <div className="section-header">
          <h2 className="section-title">
            <ArrowRight size={20} />
            Explore the Platform
          </h2>
          <p className="section-description">
            Navigate through different sections to learn and practice DevOps skills
          </p>
        </div>

        <div className="navigation-guide">
          <div className="nav-card">
            <div className="nav-card__icon">
              <Rocket size={24} />
            </div>
            <div className="nav-card__content">
              <h3>Deployments</h3>
              <p>Step-by-step deployment guides for Docker, Kubernetes, Kustomize, and Helm</p>
              <ul>
                <li>Interactive command examples</li>
                <li>Real-time deployment monitoring</li>
                <li>Best practices and troubleshooting</li>
              </ul>
            </div>
          </div>

          <div className="nav-card">
            <div className="nav-card__icon">
              <BookOpen size={24} />
            </div>
            <div className="nav-card__content">
              <h3>Tutorials</h3>
              <p>Comprehensive learning paths for each DevOps technology</p>
              <ul>
                <li>Beginner to advanced levels</li>
                <li>Hands-on exercises</li>
                <li>Real-world examples</li>
              </ul>
            </div>
          </div>

          <div className="nav-card">
            <div className="nav-card__icon">
              <Zap size={24} />
            </div>
            <div className="nav-card__content">
              <h3>Jenkins</h3>
              <p>CI/CD automation with live pipeline monitoring</p>
              <ul>
                <li>Pipeline status and logs</li>
                <li>Interactive job execution</li>
                <li>Configuration management</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroductionPage;
