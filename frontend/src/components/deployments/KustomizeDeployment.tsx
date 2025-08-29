import React from "react";
import { Settings, Code, BarChart3 } from "lucide-react";
import CopyCommandBox from "../shared/CopyCommandBox";

const KustomizeDeployment: React.FC = () => {
  const predeployCommands = [
    "kubectl apply -f deployments/k8s/namespace.yaml",
    "kubectl create configmap postgres-init-script --from-file=init.sql=./db/init.sql -n devopslab",
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
          }}>
          <Settings />
          Kustomize Deployment
        </h2>
        <p
          style={{
            fontSize: "16px",
            color: "var(--color-text)",
            opacity: 0.8,
            marginBottom: "32px",
          }}>
          Kustomize provides configuration management without templates,
          allowing environment-specific customizations.
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
              }}>
              <Code />
              Deploy with Kustomize
            </h3>
            <div>
              <CopyCommandBox command="kubectl apply -k deployments/kustomize/overlays/dev" />
              <CopyCommandBox command="kubectl apply -k deployments/kustomize/overlays/prod" />
              <CopyCommandBox command="kubectl kustomize deployments/kustomize/overlays/dev" />
              <CopyCommandBox command="kubectl delete -k deployments/kustomize/overlays/dev" />
              <CopyCommandBox command="kubectl delete -k deployments/kustomize/overlays/prod" />
              <CopyCommandBox command="kubectl get all,configmap -n devopslab" />
            </div>
            <h3
              style={{
                fontSize: "20px",
                margin: "32px 0 16px 0",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}>
              <Code />
              Access the Application
            </h3>
            <div>
              <CopyCommandBox command="kubectl port-forward svc/frontend-service 3000:80 -n devopslab" />
              <CopyCommandBox command="kubectl port-forward svc/backend-service 3001:80 -n devopslab" />
            </div>
          </div>
          {/* Key Features Section */}
          <div>
            <h3
              style={{
                fontSize: "20px",
                marginBottom: "16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}>
              <BarChart3 />
              Key Features
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
                ✓ Environment-specific configs
              </li>
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "12px",
                  color: "var(--color-text)",
                }}>
                ✓ No templating required
              </li>
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "12px",
                  color: "var(--color-text)",
                }}>
                ✓ Declarative approach
              </li>
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "12px",
                  color: "var(--color-text)",
                }}>
                ✓ GitOps friendly
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KustomizeDeployment;
