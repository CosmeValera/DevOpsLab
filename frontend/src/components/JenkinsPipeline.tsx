import React from 'react'
import { GitBranch, Code, BarChart3 } from 'lucide-react'
import CopyCommandBox from './CopyCommandBox'

const JenkinsPipeline: React.FC = () => {
  const jenkinsStartCommands = [
    'docker run -d --name jenkins -p 8080:8080 -p 50000:50000 -v jenkins_home:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock jenkins/jenkins:lts',
  ];
  const jenkinsPasswordCommand = [
    'docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword',
  ];
  const jenkinsPipelineCommands = [
    'jenkins-cli.jar build devopslab-pipeline',
    'curl -X POST http://localhost:8080/job/devopslab-pipeline/build',
  ];
  return (
    <div>
      <section className="card">
        <h2 style={{ fontSize: '28px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <GitBranch />
          Jenkins CI/CD Pipeline
        </h2>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', marginBottom: '32px' }}>
          Automated CI/CD pipeline for building, testing, and deploying the application.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* Commands Section */}
          <div>
            <h3 style={{ fontSize: '20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Code />
              Start Jenkins in Docker
            </h3>
            <div>
              {jenkinsStartCommands.map(cmd => (
                <CopyCommandBox key={cmd} command={cmd} />
              ))}
            </div>
            <h3 style={{ fontSize: '20px', margin: '32px 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Code />
              Get Initial Admin Password
            </h3>
            <div>
              {jenkinsPasswordCommand.map(cmd => (
                <CopyCommandBox key={cmd} command={cmd} />
              ))}
            </div>
            <h3 style={{ fontSize: '20px', margin: '32px 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Code />
              Manual Pipeline Execution
            </h3>
            <div>
              {jenkinsPipelineCommands.map(cmd => (
                <CopyCommandBox key={cmd} command={cmd} />
              ))}
            </div>
          </div>
          {/* Key Features Section */}
          <div>
            <h3 style={{ fontSize: '20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BarChart3 />
              Key Features
            </h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'white' }}>
                ✓ Automated testing
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'white' }}>
                ✓ Docker image building
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'white' }}>
                ✓ Automated deployment
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'white' }}>
                ✓ Pipeline visualization
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

export default JenkinsPipeline
