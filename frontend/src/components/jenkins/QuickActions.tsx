import { GitBranch, Code, Cloud, Settings } from "lucide-react";


const QuickActions = () => {
  return (
    <div className="jenkins-section">
      <div className="section-header">
        <h2 className="section-title">
          <GitBranch size={20} />
          Quick Actions
        </h2>
        <p className="section-description"> Get started with your local Jenkins setup</p>
      </div>

      <div className="quick-actions-grid">
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
            <Settings size={24} />
          </div>
          <div className="quick-action-content">
            <h4>Configure Your Own Pipeline</h4>
            <p>Set up Jenkins locally and create custom pipelines</p>
            <button 
              className="quick-action-link"
              onClick={() => {
                const jenkinsConfigSection = document.querySelector('.jenkins-section:nth-of-type(2)');
                jenkinsConfigSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Setup Jenkins
            </button>
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
      </div>
    </div>
  );
};

export default QuickActions;
