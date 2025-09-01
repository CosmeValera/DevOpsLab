import React from "react";

import { 
  Star, 
  AlertTriangle, 
  Settings,
  ExternalLink,
  User
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
            Quick Setup
          </h2>
          <p className="section-description">
            Get Jenkins up and running in minutes with Docker Compose
          </p>
        </div>

        <div className="jenkins-setup-card">
          <div className="setup-card__header">
            <div className="setup-card__icon">
              <Star size={24} />
            </div>
            <div className="setup-card__title">
              <h3>Jenkins Configuration</h3>
              <p>Automated setup with docker-compose</p>
            </div>
          </div>

          <div className="setup-card__content">
            <div className="command-section">
              <h4>1. Start Jenkins with docker-compose</h4>
              <CopyCommandBox command="docker-compose up -d" />
            </div>
            <div className="command-section">
              <h4>(Or with docker)</h4>
              <CopyCommandBox command="docker build --build-arg DOCKER_GID=$(getent group docker | cut -d: -f3) -t devopslab-jenkins ./jenkins" />
              <CopyCommandBox command="docker run -d --name jenkins -p 8080:8080 -p 50000:50000 --network host -e JENKINS_OPTS=--httpPort=8080 --restart=on-failure -v jenkins_home:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock devopslab-jenkins" />
            </div>

            <div className="access-info">
              <div className="access-info__item">
                <ExternalLink size={16} />
                <span>2. Access Jenkins at: <a href="http://localhost:8080" target="_blank" rel="noopener noreferrer">http://localhost:8080</a></span>
              </div>
            </div>

            <div className="warning-section">
              <div className="warning-header">
                <AlertTriangle size={16} />
                <h4>3. Get Initial Admin Password</h4>
              </div>
              <p>After starting Jenkins, retrieve the initial admin password for the <strong>admin</strong> user:</p>
              <CopyCommandBox command="docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword" />

              <div className="admin-info">
                <div className="admin-info__item">
                  <User size={16} />
                  <div className="admin-info__text">
                    <span><strong>Default Admin User:</strong> admin</span>
                    <span>Use the password from the command above to log in as administrator</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="warning-section">
              <div className="warning-header">
                <AlertTriangle size={16} />
                <h4>4. Configure Backend Authentication</h4>
              </div>
              <p>Create a <strong>.env</strong> file in the backend directory with Jenkins credentials for the pipeline status to work:</p>
              <CopyCommandBox command='echo -e "JENKINS_HOST=http://localhost:8080\nJENKINS_USER=admin\nJENKINS_TOKEN=$(docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword)\nPORT=3001\nNODE_ENV=development" > backend/.env' />
              
              <div className="admin-info">
                <div className="admin-info__item">
                  <Settings size={16} />
                  <div className="admin-info__text">
                    <span><strong>Backend Configuration:</strong> This creates the .env file with Jenkins authentication</span>
                    <span>The backend will use these credentials to fetch pipeline status from Jenkins</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="command-section">
              <h4>5. Remove Jenkins (if needed)</h4>
              <CopyCommandBox command="docker rm -f jenkins && docker rmi -f devopslab-jenkins && docker volume rm jenkins_home" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default JenkinsConfiguration;