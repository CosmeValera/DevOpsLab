import React from 'react'
import { ExternalLink, Code, BarChart3 } from 'lucide-react'
import CopyCommandBox from '../shared/CopyCommandBox'

const DockerDeployment: React.FC = () => {
  const dockerComposeCommands = [
    'git clone https://github.com/cosmevalera/devopslab',
    'cd devopslab',
    'docker-compose up -d',
    'docker-compose down',
    'docker-compose ps',
    'docker-compose logs -f',
  ];
  const manualDockerCommands = [
    'docker build -t devopslab-frontend ./frontend',
    'docker build -t devopslab-backend ./backend',
    'docker run -d --name postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=devopslab postgres:15',
    'docker run -d --name backend --link postgres -p 3001:3001 devopslab-backend',
    'docker run -d --name frontend -p 3000:3000 devopslab-frontend',
    'docker rmi -f devopslab-frontend devopslab-backend devopslab-jenkins postgres:15-alpine',
    'docker image prune -f',
  ];
  return (
    <div>
      {/* Docker Deployment Section */}
      <section className="card">
        <h2 style={{ fontSize: '28px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8z"/>
            <path d="m3.3 7 8.7 5 8.7-5"/>
            <path d="M12 22V12"/>
          </svg>
          Docker Deployment
        </h2>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', marginBottom: '32px' }}>
          Docker containerization allows for consistent environments across development, testing, and production.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* Commands Section */}
          <div>
            <h3 style={{ fontSize: '20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Code />
              Quick Start with Docker Compose
            </h3>
            <div>
              {dockerComposeCommands.map(cmd => (
                <CopyCommandBox key={cmd} command={cmd} />
              ))}
            </div>
            <h3 style={{ fontSize: '20px', margin: '32px 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Code />
              Manual Docker Commands
            </h3>
            <div>
              {manualDockerCommands.map(cmd => (
                <CopyCommandBox key={cmd} command={cmd} />
              ))}
            </div>
          </div>
          {/* Key Benefits Section */}
          <div>
            <h3 style={{ fontSize: '20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BarChart3 />
              Key Benefits
            </h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'white' }}>
                ✓ Environment consistency
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'white' }}>
                ✓ Easy local development
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'white' }}>
                ✓ Simplified deployment
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'white' }}>
                ✓ Resource isolation
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Configuration Files Section */}
      <section className="card" style={{ marginTop: '24px' }}>
        <h3 style={{ fontSize: '20px', marginBottom: '16px' }}>Configuration Files</h3>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', marginBottom: '24px' }}>
          View the actual configuration files used for Docker deployment.
        </p>
        
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <a 
            href="https://github.com/yourusername/devopslab" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn"
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <ExternalLink />
            View on GitHub
          </a>
          
          <button className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Code />
            Configuration
          </button>
          
          <button className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BarChart3 />
            Monitoring
          </button>
        </div>
      </section>

      {/* Docker Compose Details */}
      <section className="card" style={{ marginTop: '24px' }}>
        <h3 style={{ fontSize: '20px', marginBottom: '16px' }}>Docker Compose Setup</h3>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', marginBottom: '16px' }}>
          The project includes a complete Docker Compose configuration for easy local development.
        </p>
        
        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '12px', overflowX: 'auto' }}>
          <div style={{ color: '#fbbf24' }}># docker-compose.yml</div>
          <div style={{ color: '#fbbf24' }}>version: '3.8'</div>
          <br />
          <div style={{ color: '#fbbf24' }}>services:</div>
          <div style={{ color: '#fbbf24', marginLeft: '16px' }}>postgres:</div>
          <div style={{ color: '#fbbf24', marginLeft: '32px' }}>image: postgres:15-alpine</div>
          <div style={{ color: '#fbbf24', marginLeft: '32px' }}>environment:</div>
          <div style={{ color: '#fbbf24', marginLeft: '48px' }}>POSTGRES_DB: devopslab</div>
          <div style={{ color: '#fbbf24', marginLeft: '48px' }}>POSTGRES_PASSWORD: password</div>
          <br />
          <div style={{ color: '#fbbf24', marginLeft: '16px' }}>backend:</div>
          <div style={{ color: '#fbbf24', marginLeft: '32px' }}>build: ./backend</div>
          <div style={{ color: '#fbbf24', marginLeft: '32px' }}>ports:</div>
          <div style={{ color: '#fbbf24', marginLeft: '48px' }}>- "3001:3001"</div>
          <br />
          <div style={{ color: '#fbbf24', marginLeft: '16px' }}>frontend:</div>
          <div style={{ color: '#fbbf24', marginLeft: '32px' }}>build: ./frontend</div>
          <div style={{ color: '#fbbf24', marginLeft: '32px' }}>ports:</div>
          <div style={{ color: '#fbbf24', marginLeft: '48px' }}>- "3000:3000"</div>
        </div>
      </section>

      {/* Quick Commands */}
      <section className="card" style={{ marginTop: '24px' }}>
        <h3 style={{ fontSize: '20px', marginBottom: '16px' }}>Quick Commands</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px' }}>
            <h4 style={{ fontSize: '14px', marginBottom: '8px', color: '#fbbf24' }}>Start Services</h4>
            <div style={{ fontFamily: 'monospace', fontSize: '12px', color: '#22c55e' }}>
              docker-compose up -d
            </div>
          </div>
          
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px' }}>
            <h4 style={{ fontSize: '14px', marginBottom: '8px', color: '#fbbf24' }}>View Logs</h4>
            <div style={{ fontFamily: 'monospace', fontSize: '12px', color: '#22c55e' }}>
              docker-compose logs -f
            </div>
          </div>
          
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px' }}>
            <h4 style={{ fontSize: '14px', marginBottom: '8px', color: '#fbbf24' }}>Stop Services</h4>
            <div style={{ fontFamily: 'monospace', fontSize: '12px', color: '#22c55e' }}>
              docker-compose down
            </div>
          </div>
          
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px' }}>
            <h4 style={{ fontSize: '14px', marginBottom: '8px', color: '#fbbf24' }}>Rebuild Images</h4>
            <div style={{ fontFamily: 'monospace', fontSize: '12px', color: '#22c55e' }}>
              docker-compose build --no-cache
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DockerDeployment
