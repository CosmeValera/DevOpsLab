import { useState } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { 
  Package, 
  Server, 
  Settings, 
  GitBranch
} from 'lucide-react'
import Overview from './components/Overview'
import DockerDeployment from './components/DockerDeployment'
import KubernetesDeployment from './components/KubernetesDeployment'
import KustomizeDeployment from './components/KustomizeDeployment'
import HelmDeployment from './components/HelmDeployment'
import JenkinsPipeline from './components/JenkinsPipeline'
import Dashboard from './components/Dashboard'

const technologies = [
  {
    name: 'Docker',
    icon: <Package />,
    description: 'Containerization and local development',
    color: '#2496ED'
  },
  {
    name: 'Kubernetes',
    icon: <Server />,
    description: 'Container orchestration and scaling',
    color: '#326CE5'
  },
  {
    name: 'Kustomize',
    icon: <Settings />,
    description: 'Configuration management without templates',
    color: '#326CE5'
  },
  {
    name: 'Helm',
    icon: <Package />,
    description: 'Kubernetes package manager',
    color: '#0F1689'
  },
  {
    name: 'Jenkins',
    icon: <GitBranch />,
    description: 'CI/CD pipeline automation',
    color: '#D33833'
  }
]

function App() {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState(() => {
    const path = location.pathname
    if (path === '/') return 'overview'
    return path.slice(1)
  })

  const navItems = [
    { id: 'overview', label: 'Overview', path: '/' },
    { id: 'docker', label: 'Docker', path: '/docker' },
    { id: 'kubernetes', label: 'Kubernetes', path: '/kubernetes' },
    { id: 'kustomize', label: 'Kustomize', path: '/kustomize' },
    { id: 'helm', label: 'Helm', path: '/helm' },
    { id: 'jenkins', label: 'Jenkins', path: '/jenkins' }
  ]

  return (
    <div className="app">
      {/* Header */}
      <header className="nav">
        <div className="nav-container">
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>
              DevOpsLab - DevOps Portfolio Showcase
            </h1>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', marginTop: '4px' }}>
              A comprehensive demonstration of modern DevOps practices
            </p>
          </div>
          
          {/* Technology tabs */}
          <div className="nav-tabs">
            {technologies.map((tech) => (
              <div
                key={tech.name}
                className="nav-tab"
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  fontSize: '12px'
                }}
              >
                <span style={{ color: tech.color }}>{tech.icon}</span>
                {tech.name}
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Main Navigation */}
      <nav className="nav" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="nav-container">
          <div className="nav-tabs">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`nav-tab ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container">
        <Routes>
          <Route path="/" element={<Overview technologies={technologies} />} />
          <Route path="/docker" element={<DockerDeployment />} />
          <Route path="/kubernetes" element={<KubernetesDeployment />} />
          <Route path="/kustomize" element={<KustomizeDeployment />} />
          <Route path="/helm" element={<HelmDeployment />} />
          <Route path="/jenkins" element={<JenkinsPipeline />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer style={{ 
        textAlign: 'center', 
        padding: '32px 24px', 
        color: 'rgba(255,255,255,0.7)',
        fontSize: '14px',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        marginTop: 'auto'
      }}>
        <p>
          This project demonstrates practical DevOps skills for modern web application deployment. 
          Check out the complete source code and deployment configurations on GitHub.
        </p>
      </footer>
    </div>
  )
}

export default App
