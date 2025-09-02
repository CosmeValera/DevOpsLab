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
                <h4>Setup Repository</h4>
              </div>
              <p>Clone the repository and navigate to the project directory</p>
              <CopyCommandBox command="git clone https://github.com/cosmevalera/devopslab" />
              <CopyCommandBox command="cd devopslab" />
            </div>

            {/* Step 2 */}
            <div className="setup-step">
              <div className="step-header">
                <div className="step-number">2</div>
                <h4>Start Jenkins with docker-compose</h4>
              </div>
              <CopyCommandBox command="docker-compose up -d" />
              
              <div className="step-alternative">
                <p className="alternative-label">(Or with docker)</p>
                <CopyCommandBox command="docker build --build-arg DOCKER_GID=$(getent group docker | cut -d: -f3) -t devopslab-jenkins ./jenkins" />
                <CopyCommandBox command="docker run -d --name jenkins --network host -e JENKINS_OPTS=--httpPort=8080 --restart=on-failure -v jenkins_home:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock devopslab-jenkins" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="setup-step">
              <div className="step-header">
                <div className="step-number">3</div>
                <h4>Access Jenkins</h4>
              </div>
              <div className="access-info">
                <ExternalLink size={16} />
                <span>Access Jenkins at: <a href="http://localhost:8080" target="_blank" rel="noopener noreferrer">http://localhost:8080</a></span>
              </div>
            </div>

            {/* Step 4 */}
            <div className="setup-step">
              <div className="step-header">
                <div className="step-number">4</div>
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

            {/* Step 5 */}
            <div className="setup-step">
              <div className="step-header">
                <div className="step-number">5</div>
                <h4>Complete Jenkins Setup Wizard</h4>
              </div>
              <p>Follow these steps to complete the initial Jenkins setup:</p>
              
              <div className="wizard-steps">
                <div className="wizard-step">
                  <div className="wizard-step__number">5.1</div>
                  <div className="wizard-step__content">
                    <p>In the <strong>Unlock Jenkins</strong> screen, paste the password from step 4 and click <strong>"Continue"</strong>.</p>
                  </div>
                </div>

                <div className="wizard-step">
                  <div className="wizard-step__number">5.2</div>
                  <div className="wizard-step__content">
                    <p>In the <strong>Customize Jenkins</strong> screen, click <strong>"Install Suggested Plugins"</strong> and wait for 1-2 minutes.</p>
                  </div>
                </div>
                
                <div className="wizard-step">
                  <div className="wizard-step__number">5.3</div>
                  <div className="wizard-step__content">
                    <p>Once the plugins are installed, <strong>don't create a user</strong>. Instead, click the option below: <strong>"Skip and continue as admin"</strong>.</p>
                  </div>
                </div>
                
                <div className="wizard-step">
                  <div className="wizard-step__number">5.4</div>
                  <div className="wizard-step__content">
                    <p><strong>Jenkins URL:</strong> <code>http://localhost:8080/</code> is fine. Click <strong>"Save and Finish"</strong>.</p>
                  </div>
                </div>
                
                <div className="wizard-step">
                  <div className="wizard-step__number">5.5</div>
                  <div className="wizard-step__content">
                    <p>Click <strong>"Start using Jenkins"</strong>. From now on, you will log in using <strong>admin</strong> as user and the password from step 4.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 6 */}
            <div className="setup-step">
              <div className="step-header">
                <div className="step-number">6</div>
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
            
            {/* Step 7 */}
            <div className="setup-step">
              <div className="step-header">
                <div className="step-number">7</div>
                <h4>Remove Jenkins (if needed)</h4>
              </div>
              <CopyCommandBox command="docker rm -f jenkins && docker rmi -f devopslab-jenkins && docker volume rm -f jenkins_home" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default JenkinsConfiguration;