import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  Rocket, 
  BookOpen, 
  Zap, 
  Cloud, 
  Server, 
  Database,
  ExternalLink,
  ArrowRight,
  Play,
  Compass
} from "lucide-react";

const IntroductionPage: React.FC = () => {
  const navigate = useNavigate();
  const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL;
  const isProduction = !API_BASE_URL.includes('localhost');

  const handleNavigation = (tab: string) => {
    navigate(`/${tab}`);
  };

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
              Master modern DevOps practices with hands-on learning. Deploy applications using Docker, 
              Kubernetes, and CI/CD pipelines with real-world examples and interactive tutorials.
            </p>
          </div>
        </div>
      </div>

      {/* Architecture Overview */}
      <div className="introduction-section">
        <div className="section-header">
          <h2 className="section-title">
            <Server size={20} />
            Architecture Overview
          </h2>
          <p className="section-description">
            {isProduction 
              ? 'This DevOps Lab is deployed on AWS cloud infrastructure'
              : 'This DevOps Lab can run locally or in the cloud'
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
                  <strong>Want to explore locally?</strong> You can build this entire system on your own machine by following the setup instructions in the Deployments section.
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
                    href="https://d3nl9bq5so9qcn.cloudfront.net/introduction" 
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

      {/* Explore the Platform */}
      <div className="introduction-section">
        <div className="section-header">
          <h2 className="section-title">
            <Compass size={20} />
            Explore the Platform
          </h2>
          <p className="section-description">
            Navigate through different sections to learn and practice DevOps skills
          </p>
        </div>

        <div className="navigation-guide">
          {/* Jenkins */}
          <div 
            className="nav-card nav-card--clickable"
            onClick={() => handleNavigation('jenkins')}
          >
            <div className="nav-card__icon">
              <Zap size={24} />
            </div>
            <div className="nav-card__content">
              <h3>Jenkins</h3>
              <p>CI/CD automation with live pipelines monitoring and configuration.</p>
              <div className="nav-card__features">
                <span className="feature-tag">Pipeline Status</span>
                <span className="feature-tag">Interactive Jobs</span>
                <span className="feature-tag">Configuration</span>
              </div>
              <div className="nav-card__action">
                <Play size={16} />
                <span>Start Learning</span>
                <ArrowRight size={16} />
              </div>
            </div>
          </div>

          {/* Tutorials */}
          <div 
            className="nav-card nav-card--clickable"
            onClick={() => handleNavigation('tutorials')}
          >
            <div className="nav-card__icon">
              <BookOpen size={24} />
            </div>
            <div className="nav-card__content">
              <h3>Tutorials</h3>
              <p>Comprehensive learning paths for each DevOps technology</p>
              <div className="nav-card__features">
                <span className="feature-tag">Beginner-friendly</span>
                <span className="feature-tag">Hands-on Exercises</span>
                <span className="feature-tag">Real-world Examples</span>
              </div>
              <div className="nav-card__action">
                <Play size={16} />
                <span>Start Learning</span>
                <ArrowRight size={16} />
              </div>
            </div>
          </div>

          {/* Deployments */}
          <div 
            className="nav-card nav-card--clickable"
            onClick={() => handleNavigation('deployments')}
          >
            <div className="nav-card__icon">
              <Rocket size={24} />
            </div>
            <div className="nav-card__content">
              <h3>Deployments</h3>
              <p>Step-by-step deployment guides to build this whole application using devops tools like Docker or Kubernetes</p>
              <div className="nav-card__features">
                <span className="feature-tag">Docker</span>
                <span className="feature-tag">Docker Compose</span>
                <span className="feature-tag">Kubernetes</span>
                <span className="feature-tag">Kustomize</span>
                <span className="feature-tag">Helm</span>
              </div>
              <div className="nav-card__action">
                <Play size={16} />
                <span>Start Learning</span>
                <ArrowRight size={16} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default IntroductionPage;
