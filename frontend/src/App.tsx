import { useEffect, useMemo, useState } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { 
  Package, 
  Server, 
  Settings, 
  GitBranch
} from 'lucide-react'
import Overview from './components/deployments/Overview'
import DockerDeployment from './components/deployments/DockerDeployment'
import KubernetesDeployment from './components/deployments/KubernetesDeployment'
import KustomizeDeployment from './components/deployments/KustomizeDeployment'
import HelmDeployment from './components/deployments/HelmDeployment'
import JenkinsPipeline from './components/jenkins/JenkinsPipeline'
import Dashboard from './components/deployments/Dashboard'
import Home from './components/Home'
import Tutorials from './components/tutorials/Tutorials'
import DockerTutorial from './components/tutorials/DockerTutorial'
import KubernetesTutorial from './components/tutorials/KubernetesTutorial'
import KustomizeTutorial from './components/tutorials/KustomizeTutorial'
import HelmTutorial from './components/tutorials/HelmTutorial'

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
  const [activeTab, setActiveTab] = useState('')

  const navItems = useMemo(() => {
    const path = location.pathname
    // No navigation on Home
    if (path === '/') return [] as { id: string; label: string; path: string }[]

    // Deployments navigation with back and technologies
    if (path.startsWith('/deployments')) {
      return [
        { id: 'back', label: 'Go back', path: '/' },
        { id: 'docker', label: 'Docker', path: '/deployments/docker' },
        { id: 'kubernetes', label: 'Kubernetes', path: '/deployments/kubernetes' },
        { id: 'kustomize', label: 'Kustomize', path: '/deployments/kustomize' },
        { id: 'helm', label: 'Helm', path: '/deployments/helm' },
      ]
    }

    // Tutorials and Jenkins: only back button
    if (path.startsWith('/tutorials') || path.startsWith('/jenkins')) {
      return [
        { id: 'back', label: 'Go back', path: '/' },
      ]
    }

    return []
  }, [location.pathname])

  useEffect(() => {
    const path = location.pathname
    if (path.startsWith('/deployments/docker')) setActiveTab('docker')
    else if (path.startsWith('/deployments/kubernetes')) setActiveTab('kubernetes')
    else if (path.startsWith('/deployments/kustomize')) setActiveTab('kustomize')
    else if (path.startsWith('/deployments/helm')) setActiveTab('helm')
    else setActiveTab('back')
  }, [location.pathname])

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
      {navItems.length > 0 && (
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
      )}

      {/* Main Content */}
      <main className="container">
        <Routes>
          {/* Home with previews */}
          <Route path="/" element={<Home />} />

          {/* Deployments section */}
          <Route path="/deployments" element={<Overview technologies={technologies} />} />
          <Route path="/deployments/docker" element={<DockerDeployment />} />
          <Route path="/deployments/kubernetes" element={<KubernetesDeployment />} />
          <Route path="/deployments/kustomize" element={<KustomizeDeployment />} />
          <Route path="/deployments/helm" element={<HelmDeployment />} />

          {/* Tutorials section */}
          <Route path="/tutorials" element={<Tutorials />} />
          <Route path="/tutorials/docker" element={<DockerTutorial />} />
          <Route path="/tutorials/kubernetes" element={<KubernetesTutorial />} />
          <Route path="/tutorials/kustomize" element={<KustomizeTutorial />} />
          <Route path="/tutorials/helm" element={<HelmTutorial />} />

          {/* Jenkins */}
          <Route path="/jenkins" element={<JenkinsPipeline />} />

          {/* Existing */}
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
