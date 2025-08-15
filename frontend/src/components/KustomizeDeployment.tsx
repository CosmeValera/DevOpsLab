import React from 'react'
import { Settings, Code, BarChart3 } from 'lucide-react'
import CopyCommandBox from './CopyCommandBox'

const KustomizeDeployment: React.FC = () => {
  const commands = [
    'kubectl apply -k overlays/dev',
    'kubectl apply -k overlays/prod',
    'kubectl kustomize overlays/staging',
  ];
  return (
    <div>
      <section className="card">
        <h2 style={{ fontSize: '28px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Settings />
          Kustomize Deployment
        </h2>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', marginBottom: '32px' }}>
          Kustomize provides configuration management without templates, allowing environment-specific customizations.
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
                ✓ Environment-specific configs
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: '#22c55e' }}>
                ✓ No templating required
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: '#22c55e' }}>
                ✓ Declarative approach
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: '#22c55e' }}>
                ✓ GitOps friendly
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

export default KustomizeDeployment
