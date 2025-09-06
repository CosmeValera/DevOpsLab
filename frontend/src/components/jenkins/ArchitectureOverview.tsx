import { Cloud, Server, Database } from "lucide-react";

interface ArchitectureOverviewProps {
  isProduction: boolean;
}

const ArchitectureOverview: React.FC<ArchitectureOverviewProps> = ({ isProduction }) => {
  return (
    <div className="jenkins-section">
      <div className="section-header">
        <h2 className="section-title">
          <Cloud size={20} />
          Architecture Overview
        </h2>
        <p className="section-description">
          {isProduction 
            ? 'This Jenkins CI/CD system is deployed on AWS cloud infrastructure'
            : 'This Jenkins CI/CD system can run locally or in the cloud'
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
                <strong>Want to explore locally?</strong> You can build this entire system on your own machine by following the setup instructions in the Jenkins Configuration section below. This gives you full control and the ability to customize the pipelines.
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
                  <p>React + Vite frontend with Node.js + Express backend</p>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default ArchitectureOverview;
