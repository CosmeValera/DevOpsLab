import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DeploymentPage from './deployments/DeploymentPage'
import TutorialsPage from './tutorials/TutorialsPage'
import JenkinsPage from './jenkins/JenkinsPage'

interface HomeProps {
  initialTab?: 'deployments' | 'tutorials' | 'jenkins'
}

const Home: React.FC<HomeProps> = ({ initialTab = 'deployments' }) => {
  const [activeTab, setActiveTab] = useState<'deployments' | 'tutorials' | 'jenkins'>(initialTab)
  const navigate = useNavigate()

  useEffect(() => {
    setActiveTab(initialTab)
  }, [initialTab])

  const handleTabClick = (tab: 'deployments' | 'tutorials' | 'jenkins') => {
    setActiveTab(tab)
    navigate(`/${tab}`)
  }

  return (
    <div>
      {/* Main Navigation Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        <button 
          className={`nav-tab ${activeTab === 'deployments' ? 'active' : ''}`}
          onClick={() => handleTabClick('deployments')}
          style={{ 
            flex: 1, 
            padding: '12px 24px', 
            backgroundColor: activeTab === 'deployments' ? '#14B8A6' : 'rgba(255,255,255,0.1)',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          🚀 Deployments
        </button>
        <button 
          className={`nav-tab ${activeTab === 'tutorials' ? 'active' : ''}`}
          onClick={() => handleTabClick('tutorials')}
          style={{ 
            flex: 1, 
            padding: '12px 24px', 
            backgroundColor: activeTab === 'tutorials' ? '#14B8A6' : 'rgba(255,255,255,0.1)',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          📚 Tutorials
        </button>
        <button 
          className={`nav-tab ${activeTab === 'jenkins' ? 'active' : ''}`}
          onClick={() => handleTabClick('jenkins')}
          style={{ 
            flex: 1, 
            padding: '12px 24px', 
            backgroundColor: activeTab === 'jenkins' ? '#14B8A6' : 'rgba(255,255,255,0.1)',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          ⚙️ Jenkins
        </button>
      </div>

      {/* Deployments Content */}
      {activeTab === 'deployments' && <DeploymentPage />}

      {/* Tutorials Content */}
      {activeTab === 'tutorials' && <TutorialsPage />}

      {/* Jenkins Content */}
      {activeTab === 'jenkins' && <JenkinsPage />}
    </div>
  )
}

export default Home