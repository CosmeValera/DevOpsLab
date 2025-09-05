import { GitBranch, ExternalLink, Code, Cloud, Play } from "lucide-react";

interface QuickActionsProps {
  isProduction: boolean;
}

const QuickActions: React.FC<QuickActionsProps> = ({ isProduction }) => {
  return (
    <div className="jenkins-section">
      <div className="section-header">
        <h2 className="section-title">
          <GitBranch size={20} />
          Quick Actions
        </h2>
        <p className="section-description">
          {isProduction 
            ? 'Explore the live CI/CD pipelines and infrastructure'
            : 'Get started with your local Jenkins setup'
          }
        </p>
      </div>

      <div className="quick-actions-grid">
        {isProduction ? (
          <>
            <div className="quick-action-card">
              <div className="quick-action-icon">
                <ExternalLink size={24} />
              </div>
              <div className="quick-action-content">
                <h4>View Jenkins Server</h4>
                <p>Access the live Jenkins instance on EC2</p>
                <a 
                  href="http://ec2-54-93-162-158.eu-central-1.compute.amazonaws.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="quick-action-link"
                >
                  Open Jenkins
                </a>
              </div>
            </div>
            <div className="quick-action-card">
              <div className="quick-action-icon">
                <Play size={24} />
              </div>
              <div className="quick-action-content">
                <h4>Try Live Pipelines</h4>
                <p>Click pipeline cards below to interact with Jenkins jobs</p>
                <button 
                  className="quick-action-link"
                  onClick={() => {
                    const pipelineSection = document.querySelector('.jenkins-section:nth-of-type(4)');
                    pipelineSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Go to Pipelines
                </button>
              </div>
            </div>
            <div className="quick-action-card">
              <div className="quick-action-icon">
                <Code size={24} />
              </div>
              <div className="quick-action-content">
                <h4>Explore Source Code</h4>
                <p>Check out the complete DevOps Lab repository</p>
                <a 
                  href="https://github.com/cosmevalera/devopslab" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="quick-action-link"
                >
                  View on GitHub
                </a>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="quick-action-card">
              <div className="quick-action-icon">
                <Cloud size={24} />
              </div>
              <div className="quick-action-content">
                <h4>Try Cloud Version</h4>
                <p>Experience the full AWS deployment</p>
                <a 
                  href="http://devopslab-cosmevalera.s3-website.eu-central-1.amazonaws.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="quick-action-link"
                >
                  Visit Cloud
                </a>
              </div>
            </div>
            <div className="quick-action-card">
              <div className="quick-action-icon">
                <Code size={24} />
              </div>
              <div className="quick-action-content">
                <h4>View Source Code</h4>
                <p>Explore the complete project repository</p>
                <a 
                  href="https://github.com/cosmevalera/devopslab" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="quick-action-link"
                >
                  GitHub Repo
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuickActions;
