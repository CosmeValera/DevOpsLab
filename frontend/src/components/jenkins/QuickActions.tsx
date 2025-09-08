import { GitBranch, Cloud, Settings } from "lucide-react";

const QuickActions = () => {
  const handleCloudClick = () => {
    window.open('https://d3nl9bq5so9qcn.cloudfront.net', '_blank');
  };

  const handleJenkinsSetupClick = () => {
    const jenkinsConfigSection = document.querySelector('.jenkins-section:nth-of-type(2)');
    jenkinsConfigSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  return (
    <div className="jenkins-section">
      <div className="section-header">
        <h2 className="section-title">
          <GitBranch size={20} />
          Quick Actions
        </h2>
        <p className="section-description">Use our cloud setup or configure your local Jenkins</p>
      </div>

      <div className="quick-actions-grid">
        <button 
          className="quick-action-card" 
          onClick={handleCloudClick}
          onKeyDown={(e) => handleKeyDown(e, handleCloudClick)}
          tabIndex={0}
          aria-label="Try Cloud Version - Experience the full AWS deployment"
        >
          <div className="quick-action-icon">
            <Cloud size={24} />
          </div>
          <div className="quick-action-content">
            <h4>Try Cloud Version</h4>
            <p>Try the deployed application with AWS S3, Lambda and EC2</p>
            <button
              className="quick-action-link"
              tabIndex={-1}
            >
              Visit Cloud
            </button>
          </div>
        </button>
        
        <button 
          className="quick-action-card" 
          onClick={handleJenkinsSetupClick}
          onKeyDown={(e) => handleKeyDown(e, handleJenkinsSetupClick)}
          tabIndex={0}
          aria-label="Configure Your Own Pipeline - Set up Jenkins locally and create custom pipelines"
        >
          <div className="quick-action-icon">
            <Settings size={24} />
          </div>
          <div className="quick-action-content">
            <h4>Configure Your Own Pipeline</h4>
            <p>Set up Jenkins locally and create custom pipelines</p>
            <button 
              className="quick-action-link"
              tabIndex={-1}
            >
              Setup Jenkins
            </button>
          </div>
        </button>
      </div>
    </div>
  );
};

export default QuickActions;