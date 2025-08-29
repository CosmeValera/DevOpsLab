import React from "react";
import { Code, BarChart3 } from "lucide-react";
import CopyCommandBox from "../shared/CopyCommandBox";

const HelmDeployment: React.FC = () => {
  const predeployCommands = [
    "kubectl apply -f deployments/k8s/namespace.yaml",
    "kubectl create configmap postgres-init-script --from-file=init.sql=./db/init.sql -n devopslab",
  ];
  const helmCommands = [
    "helm install devopslab ./deployments/helm/devopslab -f ./deployments/helm/devopslab/values-dev.yaml",
    "helm install devopslab ./deployments/helm/devopslab -f ./deployments/helm/devopslab/values-prod.yaml",
    "helm upgrade devopslab ./deployments/helm/devopslab -f ./deployments/helm/devopslab/values-prod.yaml",
    "helm uninstall devopslab",
    "helm list",
    "kubectl get all -n devopslab",
    "kubectl get all,configmap -n devopslab",
    "helm install devopslab ./deployments/helm/devopslab -f custom-values.yaml",
    "helm install devopslab ./deployments/helm/devopslab --set replicaCount=3",
    "kubectl port-forward svc/frontend-service 3000:80 -n devopslab",
    "kubectl port-forward svc/backend-service 3001:80 -n devopslab",
  ];
  return (
    <div>
      <section className="card">
        <h2
          style={{
            fontSize: "28px",
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            color: "var(--color-text)",
          }}>
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
            <path d="M16.5 9.4 7.55 4.24" />
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27,6.96 12,12.01 20.73,6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
          Helm Deployment
        </h2>
        <p
          style={{
            fontSize: "16px",
            color: "var(--color-text)",
            opacity: 0.8,
            marginBottom: "32px",
          }}>
          Helm is the Kubernetes package manager that simplifies application
          deployment and management.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
          }}>
          {/* Commands Section */}
          <div>
            <h3
              style={{
                fontSize: "20px",
                marginBottom: "16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "var(--color-text)",
              }}>
              <Code />
              Predeploy Commands
            </h3>
            <div>
              {predeployCommands.map((cmd) => (
                <CopyCommandBox key={cmd} command={cmd} />
              ))}
            </div>
            <h3
              style={{
                fontSize: "20px",
                margin: "32px 0 16px 0",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "var(--color-text)",
              }}>
              <Code />
              Access the Application
            </h3>
            <div>
              <p
                style={{
                  fontSize: "14px",
                  color: "var(--color-text)",
                  opacity: 0.7,
                  marginBottom: "8px",
                }}>
                Forward ports to access the frontend and backend locally:
              </p>
              <CopyCommandBox command="kubectl port-forward svc/frontend-service 3000:80 -n devopslab" />
              <CopyCommandBox command="kubectl port-forward svc/backend-service 3001:80 -n devopslab" />
            </div>
            <h3
              style={{
                fontSize: "20px",
                margin: "32px 0 16px 0",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "var(--color-text)",
              }}>
              <Code />
              Deploy with Helm
            </h3>
            <div>
              {helmCommands.map((cmd) => (
                <CopyCommandBox key={cmd} command={cmd} />
              ))}
            </div>
          </div>
          {/* Key Benefits Section */}
          <div>
            <h3
              style={{
                fontSize: "20px",
                marginBottom: "16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "var(--color-text)",
              }}>
              <BarChart3 />
              Key Benefits
            </h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "12px",
                  color: "var(--color-text)",
                }}>
                ✓ Package management
              </li>
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "12px",
                  color: "var(--color-text)",
                }}>
                ✓ Version control
              </li>
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "12px",
                  color: "var(--color-text)",
                }}>
                ✓ Easy rollbacks
              </li>
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "12px",
                  color: "var(--color-text)",
                }}>
                ✓ Template engine
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HelmDeployment;
