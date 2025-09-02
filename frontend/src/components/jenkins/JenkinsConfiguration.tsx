import { 
  Settings,
  ExternalLink,
  User,
  Shield
} from "lucide-react";
import CopyCommandBox from "../shared/CopyCommandBox";

const JenkinsConfiguration = () => {
  return (
    <>
      {/* Quick Start Section */}
      <div className="jenkins-section">
        <div className="section-header">
          <h2 className="section-title">
            <Settings size={20} />
            Jenkins Configuration
          </h2>
          <p className="section-description">
            Get Jenkins up and running in minutes with Docker Compose
          </p>
        </div>

        <div className="jenkins-setup-card">
          <div className="setup-card__content">
            {/* Step 1 */}
            <div className="setup-step">
              <div className="step-header">
                <div className="step-number">1</div>
                <h4>Start Jenkins with docker-compose</h4>
              </div>
              <CopyCommandBox command="docker-compose up -d" />
              
              <div className="step-alternative">
                <p className="alternative-label">(Or with docker)</p>
                <CopyCommandBox command="docker build --build-arg DOCKER_GID=$(getent group docker | cut -d: -f3) -t devopslab-jenkins ./jenkins" />
                <CopyCommandBox command="docker run -d --name jenkins --network host -e JENKINS_OPTS=--httpPort=8080 --restart=on-failure -v jenkins_home:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock devopslab-jenkins" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="setup-step">
              <div className="step-header">
                <div className="step-number">2</div>
                <h4>Access Jenkins</h4>
              </div>
              <div className="access-info">
                <ExternalLink size={16} />
                <span>Access Jenkins at: <a href="http://localhost:8080" target="_blank" rel="noopener noreferrer">http://localhost:8080</a></span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="setup-step">
              <div className="step-header">
                <div className="step-number">3</div>
                <h4>Get Initial Admin Password</h4>
              </div>
              <p>After starting Jenkins, retrieve the initial admin password for the <strong>admin</strong> user:</p>
              <CopyCommandBox command="docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword" />

              <div className="info-box">
                <div className="info-box__icon">
                  <User size={16} />
                </div>
                <div className="info-box__content">
                  <span className="info-box__title">Default Admin User: admin</span>
                  <span className="info-box__description">Use the password from the command above to log in as administrator</span>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="setup-step">
              <div className="step-header">
                <div className="step-number">4</div>
                <h4>Configure Backend Authentication</h4>
              </div>
              <p>Create a <strong>.env</strong> file in the backend directory with Jenkins credentials for the pipeline status to work:</p>
              <CopyCommandBox command='echo -e "JENKINS_HOST=http://localhost:8080\nJENKINS_USER=admin\nJENKINS_TOKEN=$(docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword)\nPORT=3001\nNODE_ENV=development" > backend/.env' />
              
              <div className="info-box">
                <div className="info-box__icon">
                  <Shield size={16} />
                </div>
                <div className="info-box__content">
                  <span className="info-box__title">Backend Configuration</span>
                  <span className="info-box__description">This creates the .env file with Jenkins authentication. The backend will use these credentials to fetch pipeline status from Jenkins.</span>
                </div>
              </div>
            </div>
            
            {/* Step 5 */}
            <div className="setup-step">
              <div className="step-header">
                <div className="step-number">5</div>
                <h4>Remove Jenkins (if needed)</h4>
              </div>
              <CopyCommandBox command="docker rm -f jenkins && docker rmi -f devopslab-jenkins && docker volume rm -f jenkins_home devopslab_jenkins_home" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default JenkinsConfiguration;