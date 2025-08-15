import React from 'react'
import { Package, Code, BarChart3 } from 'lucide-react'
import CopyCommandBox from './CopyCommandBox'

const HelmDeployment: React.FC = () => {
  const commands = [
    'helm install devopslab ./charts',
    'helm upgrade devopslab ./charts',
    'helm uninstall devopslab',
  ];
  return (
    <div>
      <section className="card">
        <h2 style={{ fontSize: '28px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Package />
          Helm Deployment
        </h2>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', marginBottom: '32px' }}>
          Helm is the Kubernetes package manager that simplifies application deployment and management.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div>
            <h3 style={{ fontSize: '20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Code />
              Commands
            </h3>
            <div>
              {commands.map(cmd => (
                <CopyCommandBox key={cmd} command={cmd} />
              ))}
            </div>
          </div>
          
          <div>
            <h3 style={{ fontSize: '20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BarChart3 />
              Key Benefits
            </h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: '#22c55e' }}>
                ✓ Package management
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: '#22c55e' }}>
                ✓ Version control
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: '#22c55e' }}>
                ✓ Easy rollbacks
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: '#22c55e' }}>
                ✓ Template engine
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HelmDeployment
