import React from "react";
import { Server, ExternalLink, Code, BarChart3 } from "lucide-react";
import CopyCommandBox from "../shared/CopyCommandBox";

const KubernetesDeployment: React.FC = () => {
  const predeployCommands = [
    "kubectl apply -f deployments/k8s/namespace.yaml",
    "kubectl create configmap postgres-init-script --from-file=init.sql=./db/init.sql -n devopslab",
  ];
  const imageLoadCommands = [
    "minikube start",
    "minikube image load devopslab-frontend",
    "minikube image load devopslab-jenkins",
    "minikube image load devopslab-backend",
    "minikube image load postgres:15-alpine",
    "minikube ssh -- docker images",
  ];
  const deployCommands = [
    "kubectl apply -f deployments/k8s/backend/ -f deployments/k8s/database/ -f deployments/k8s/frontend/",
    "kubectl get all -n devopslab",
    "kubectl delete all --all -n devopslab",
    "kubectl port-forward svc/frontend-service 3000:80 -n devopslab",
    "kubectl port-forward svc/backend-service 3001:80 -n devopslab",
    "kubectl logs -f deployment/frontend -n devopslab",
    "kubectl logs -f deployment/backend -n devopslab",
  ];
  return (
    <div>
      {/* Kubernetes Deployment Section */}
      <section className="card">
        <h2
          style={{
            fontSize: "28px",
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}>
          <Server />
          Kubernetes Deployment (Vanilla)
        </h2>
        <p
          style={{
            fontSize: "16px",
            color: "var(--color-text)",
            opacity: 0.8,
            marginBottom: "32px",
          }}>
          Kubernetes provides robust container orchestration with automatic
          scaling, load balancing, and self-healing capabilities.
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
              Load Images (Minikube)
            </h3>
            <div>
              {imageLoadCommands.map((cmd) => (
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
              }}>
              <Code />
              Deploy to Kubernetes
            </h3>
            <div>
              {deployCommands.map((cmd) => (
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
                ✓ Auto-scaling
              </li>
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "12px",
                  color: "var(--color-text)",
                }}>
                ✓ Load balancing
              </li>
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "12px",
                  color: "var(--color-text)",
                }}>
                ✓ Self-healing
              </li>
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "12px",
                  color: "var(--color-text)",
                }}>
                ✓ Rolling updates
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Configuration Files Section */}
      <section className="card" style={{ marginTop: "24px" }}>
        <h3 style={{ fontSize: "20px", marginBottom: "16px" }}>
          Configuration Files
        </h3>
        <p
          style={{
            fontSize: "14px",
            color: "var(--color-text)",
            opacity: 0.8,
            marginBottom: "24px",
          }}>
          View the actual configuration files used for Kubernetes deployment.
        </p>

        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <a
            href="https://github.com/yourusername/devopslab"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
            style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <ExternalLink />
            View on GitHub
          </a>

          <button
            className="btn btn-secondary"
            style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Code />
            Configuration
          </button>

          <button
            className="btn btn-secondary"
            style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <BarChart3 />
            Monitoring
          </button>
        </div>
      </section>

      {/* Kubernetes Manifests */}
      <section className="card" style={{ marginTop: "24px" }}>
        <h3 style={{ fontSize: "20px", marginBottom: "16px" }}>
          Kubernetes Manifests
        </h3>
        <p
          style={{
            fontSize: "14px",
            color: "var(--color-text)",
            opacity: 0.8,
            marginBottom: "16px",
          }}>
          The project includes complete Kubernetes manifests for production
          deployment.
        </p>

        <div
          style={{
            background: "rgba(0,0,0,0.3)",
            padding: "16px",
            borderRadius: "8px",
            fontFamily: "monospace",
            fontSize: "12px",
            overflowX: "auto",
          }}>
          <div style={{ color: "#fbbf24" }}># deployment.yaml</div>
          <div style={{ color: "#fbbf24" }}>apiVersion: apps/v1</div>
          <div style={{ color: "#fbbf24" }}>kind: Deployment</div>
          <div style={{ color: "#fbbf24" }}>metadata:</div>
          <div style={{ color: "#fbbf24", marginLeft: "16px" }}>
            name: devopslab-frontend
          </div>
          <div style={{ color: "#fbbf24" }}>spec:</div>
          <div style={{ color: "#fbbf24", marginLeft: "16px" }}>
            replicas: 3
          </div>
          <div style={{ color: "#fbbf24", marginLeft: "16px" }}>selector:</div>
          <div style={{ color: "#fbbf24", marginLeft: "32px" }}>
            matchLabels:
          </div>
          <div style={{ color: "#fbbf24", marginLeft: "48px" }}>
            app: devopslab-frontend
          </div>
          <br />
          <div style={{ color: "#fbbf24" }}>---</div>
          <br />
          <div style={{ color: "#fbbf24" }}># service.yaml</div>
          <div style={{ color: "#fbbf24" }}>apiVersion: v1</div>
          <div style={{ color: "#fbbf24" }}>kind: Service</div>
          <div style={{ color: "#fbbf24" }}>metadata:</div>
          <div style={{ color: "#fbbf24", marginLeft: "16px" }}>
            name: frontend-service
          </div>
          <div style={{ color: "#fbbf24" }}>spec:</div>
          <div style={{ color: "#fbbf24", marginLeft: "16px" }}>
            type: LoadBalancer
          </div>
          <div style={{ color: "#fbbf24", marginLeft: "16px" }}>ports:</div>
          <div style={{ color: "#fbbf24", marginLeft: "32px" }}>- port: 80</div>
          <div style={{ color: "#fbbf24", marginLeft: "32px" }}>
            targetPort: 3000
          </div>
        </div>
      </section>

      {/* Quick Commands */}
      <section className="card" style={{ marginTop: "24px" }}>
        <h3 style={{ fontSize: "20px", marginBottom: "16px" }}>
          Quick Commands
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "16px",
          }}>
          <div
            style={{
              background: "rgba(0,0,0,0.3)",
              padding: "16px",
              borderRadius: "8px",
            }}>
            <h4
              style={{
                fontSize: "14px",
                marginBottom: "8px",
                color: "#fbbf24",
              }}>
              Deploy Application
            </h4>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: "12px",
                color: "#22c55e",
              }}>
              kubectl apply -f k8s/
            </div>
          </div>

          <div
            style={{
              background: "rgba(0,0,0,0.3)",
              padding: "16px",
              borderRadius: "8px",
            }}>
            <h4
              style={{
                fontSize: "14px",
                marginBottom: "8px",
                color: "#fbbf24",
              }}>
              Check Status
            </h4>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: "12px",
                color: "#22c55e",
              }}>
              kubectl get pods,svc
            </div>
          </div>

          <div
            style={{
              background: "rgba(0,0,0,0.3)",
              padding: "16px",
              borderRadius: "8px",
            }}>
            <h4
              style={{
                fontSize: "14px",
                marginBottom: "8px",
                color: "#fbbf24",
              }}>
              View Logs
            </h4>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: "12px",
                color: "#22c55e",
              }}>
              kubectl logs -f deployment/frontend
            </div>
          </div>

          <div
            style={{
              background: "rgba(0,0,0,0.3)",
              padding: "16px",
              borderRadius: "8px",
            }}>
            <h4
              style={{
                fontSize: "14px",
                marginBottom: "8px",
                color: "#fbbf24",
              }}>
              Port Forward
            </h4>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: "12px",
                color: "#22c55e",
              }}>
              kubectl port-forward svc/frontend 3000:80
            </div>
          </div>
        </div>
      </section>

      {/* Environment Setup */}
      <section className="card" style={{ marginTop: "24px" }}>
        <h3 style={{ fontSize: "20px", marginBottom: "16px" }}>
          Environment Setup
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "16px",
          }}>
          <div
            style={{
              background: "rgba(0,0,0,0.3)",
              padding: "16px",
              borderRadius: "8px",
            }}>
            <h4
              style={{
                fontSize: "14px",
                marginBottom: "8px",
                color: "#fbbf24",
              }}>
              Minikube
            </h4>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: "12px",
                color: "#22c55e",
              }}>
              minikube start
              <br />
              minikube dashboard
            </div>
          </div>

          <div
            style={{
              background: "rgba(0,0,0,0.3)",
              padding: "16px",
              borderRadius: "8px",
            }}>
            <h4
              style={{
                fontSize: "14px",
                marginBottom: "8px",
                color: "#fbbf24",
              }}>
              Kind
            </h4>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: "12px",
                color: "#22c55e",
              }}>
              kind create cluster
              <br />
              kind load docker-image devopslab
            </div>
          </div>

          <div
            style={{
              background: "rgba(0,0,0,0.3)",
              padding: "16px",
              borderRadius: "8px",
            }}>
            <h4
              style={{
                fontSize: "14px",
                marginBottom: "8px",
                color: "#fbbf24",
              }}>
              Docker Desktop
            </h4>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: "12px",
                color: "#22c55e",
              }}>
              Enable Kubernetes
              <br />
              kubectl config use-context docker-desktop
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KubernetesDeployment;
