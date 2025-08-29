import React from "react";
import { ExternalLink, Code, BarChart3 } from "lucide-react";
import CopyCommandBox from "../shared/CopyCommandBox";

const DockerDeployment: React.FC = () => {
  const dockerComposeCommands = [
    "git clone https://github.com/cosmevalera/devopslab",
    "cd devopslab",
    "docker-compose up -d",
    "docker-compose down",
    "docker-compose ps",
    "docker-compose logs -f",
  ];
  const manualDockerCommands = [
    "docker build -t devopslab-frontend ./frontend",
    "docker build -t devopslab-backend ./backend",
    "docker run -d --name postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=devopslab postgres:15",
    "docker run -d --name backend --link postgres -p 3001:3001 devopslab-backend",
    "docker run -d --name frontend -p 3000:3000 devopslab-frontend",
    "docker rmi -f devopslab-frontend devopslab-backend devopslab-jenkins postgres:15-alpine",
    "docker image prune -f",
  ];
  return (
    <div>
      {/* Docker Deployment Section */}
      <section className="card">
        <h2
          className="docker-title"
          style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round">
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8z" />
            <path d="m3.3 7 8.7 5 8.7-5" />
            <path d="M12 22V12" />
          </svg>
          Docker Deployment
        </h2>
        <p className="docker-subtitle">
          Docker containerization allows for consistent environments across
          development, testing, and production.
        </p>

        <div className="deployment-two-column">
          {/* Commands Section */}
          <div>
            <h3 className="section-title-with-icon">
              <Code />
              Quick Start with Docker Compose
            </h3>
            <div>
              {dockerComposeCommands.map((cmd) => (
                <CopyCommandBox key={cmd} command={cmd} />
              ))}
            </div>
            <h3 className="section-title-spaced">
              <Code />
              Manual Docker Commands
            </h3>
            <div>
              {manualDockerCommands.map((cmd) => (
                <CopyCommandBox key={cmd} command={cmd} />
              ))}
            </div>
          </div>
          {/* Key Benefits Section */}
          <div>
            <h3 className="section-title-with-icon">
              <BarChart3 />
              Key Benefits
            </h3>
            <ul className="key-features-list">
              <li className="key-features-item">✓ Environment consistency</li>
              <li className="key-features-item">✓ Easy local development</li>
              <li className="key-features-item">✓ Simplified deployment</li>
              <li className="key-features-item">✓ Resource isolation</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Configuration Files Section */}
      <section className="card section-card">
        <h3 className="section-title">Configuration Files</h3>
        <p className="section-description">
          View the actual configuration files used for Docker deployment.
        </p>

        <div className="config-buttons">
          <a
            href="https://github.com/yourusername/devopslab"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-with-icon">
            <ExternalLink />
            View on GitHub
          </a>

          <button className="btn btn-secondary btn-with-icon">
            <Code />
            Configuration
          </button>

          <button className="btn btn-secondary btn-with-icon">
            <BarChart3 />
            Monitoring
          </button>
        </div>
      </section>

      {/* Docker Compose Details */}
      <section className="card section-card">
        <h3 className="section-title">Docker Compose Setup</h3>
        <p className="section-description">
          The project includes a complete Docker Compose configuration for easy
          local development.
        </p>

        <div className="docker-compose-code">
          <div className="code-line"># docker-compose.yml</div>
          <div className="code-line">version: '3.8'</div>
          <br />
          <div className="code-line">services:</div>
          <div className="code-line code-indent-1">postgres:</div>
          <div className="code-line code-indent-2">
            image: postgres:15-alpine
          </div>
          <div className="code-line code-indent-2">environment:</div>
          <div className="code-line code-indent-3">POSTGRES_DB: devopslab</div>
          <div className="code-line code-indent-3">
            POSTGRES_PASSWORD: password
          </div>
          <br />
          <div className="code-line code-indent-1">backend:</div>
          <div className="code-line code-indent-2">build: ./backend</div>
          <div className="code-line code-indent-2">ports:</div>
          <div className="code-line code-indent-3">- "3001:3001"</div>
          <br />
          <div className="code-line code-indent-1">frontend:</div>
          <div className="code-line code-indent-2">build: ./frontend</div>
          <div className="code-line code-indent-2">ports:</div>
          <div className="code-line code-indent-3">- "3000:3000"</div>
        </div>
      </section>

      {/* Quick Commands */}
      <section className="card section-card">
        <h3 className="section-title">Quick Commands</h3>
        <div className="quick-commands-grid">
          <div className="command-card">
            <h4 className="command-title">Start Services</h4>
            <div className="command-text">docker-compose up -d</div>
          </div>

          <div className="command-card">
            <h4 className="command-title">View Logs</h4>
            <div className="command-text">docker-compose logs -f</div>
          </div>

          <div className="command-card">
            <h4 className="command-title">Stop Services</h4>
            <div className="command-text">docker-compose down</div>
          </div>

          <div className="command-card">
            <h4 className="command-title">Rebuild Images</h4>
            <div className="command-text">docker-compose build --no-cache</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DockerDeployment;
