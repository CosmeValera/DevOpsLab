import React from 'react'
import { Package, Code, BarChart3 } from 'lucide-react'
import CopyCommandBox from '../shared/CopyCommandBox'

const HelmDeployment: React.FC = () => {
  const predeployCommands = [
    'kubectl apply -f deployments/k8s/namespace.yaml',
    'kubectl create configmap postgres-init-script --from-file=init.sql=./db/init.sql -n devopslab',
  ];
  const helmCommands = [
    'helm install devopslab ./deployments/helm/devopslab -f ./deployments/helm/devopslab/values-dev.yaml',
    'helm install devopslab ./deployments/helm/devopslab -f ./deployments/helm/devopslab/values-prod.yaml',
    'helm upgrade devopslab ./deployments/helm/devopslab -f ./deployments/helm/devopslab/values-prod.yaml',
    'helm uninstall devopslab',
    'helm list',
    'kubectl get all -n devopslab',
    'kubectl get all,configmap -n devopslab',
    'helm install devopslab ./deployments/helm/devopslab -f custom-values.yaml',
    'helm install devopslab ./deployments/helm/devopslab --set replicaCount=3',
    'kubectl port-forward svc/frontend-service 3000:80 -n devopslab',
    'kubectl port-forward svc/backend-service 3001:80 -n devopslab',
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
          {/* Commands Section */}
          <div>
            <h3 style={{ fontSize: '20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Code />
              Predeploy Commands
            </h3>
            <div>
              {predeployCommands.map(cmd => (
                <CopyCommandBox key={cmd} command={cmd} />
              ))}
            </div>
            <h3 style={{ fontSize: '20px', margin: '32px 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Code />
              Access the Application
            </h3>
            <div>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>
                Forward ports to access the frontend and backend locally:
              </p>
              <CopyCommandBox command="kubectl port-forward svc/frontend-service 3000:80 -n devopslab" />
              <CopyCommandBox command="kubectl port-forward svc/backend-service 3001:80 -n devopslab" />
            </div>
            <h3 style={{ fontSize: '20px', margin: '32px 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Code />
              Deploy with Helm
            </h3>
            <div>
              {helmCommands.map(cmd => (
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
                ✓ Package management
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'white' }}>
                ✓ Version control
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'white' }}>
                ✓ Easy rollbacks
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'white' }}>
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
