import React from "react";
import { Link } from "react-router-dom";
import CopyCommandBox from "../shared/CopyCommandBox";

const DeploymentPage: React.FC = () => {
  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <h2
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            marginBottom: "8px",
            color: "var(--color-text)",
          }}>
          Deployment Methods
        </h2>
        <p
          style={{
            fontSize: "16px",
            color: "var(--color-text)",
            opacity: 0.8,
          }}>
          Explore different ways to deploy the application
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "24px",
        }}>
        {/* Docker Card */}
        <Link
          to="/deployments/docker"
          className="card"
          style={{
            textDecoration: "none",
            color: "var(--color-text)",
            cursor: "pointer",
          }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "16px",
            }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="w-6 h-6">
              <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8z" />
              <path d="m3.3 7 8.7 5 8.7-5" />
              <path d="M12 22V12" />
            </svg>
            <h3 style={{ fontSize: "20px", margin: 0 }}>Docker</h3>
          </div>
          <p
            style={{
              fontSize: "14px",
              color: "var(--color-text)",
              opacity: 0.8,
              marginBottom: "16px",
            }}>
            Basic containerization with Docker
          </p>

          <div style={{ marginBottom: "16px" }}>
            <h4 style={{ fontSize: "14px", marginBottom: "8px" }}>Commands:</h4>
            <CopyCommandBox command="docker build -t devopslab-frontend ." />
            <CopyCommandBox command="docker run -p 3000:3000 devopslab-frontend" />
          </div>

          <div>
            <h4 style={{ fontSize: "14px", marginBottom: "8px" }}>Features:</h4>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <span
                style={{
                  border: "1px solid var(--accent-blue)",
                  borderRadius: "4px",
                  padding: "4px 8px",
                  fontSize: "12px",
                  backgroundColor: "var(--accent-light)",
                  color: "#111",
                }}>
                Portability
              </span>
              <span
                style={{
                  border: "1px solid var(--accent-blue)",
                  borderRadius: "4px",
                  padding: "4px 8px",
                  fontSize: "12px",
                  backgroundColor: "var(--accent-light)",
                  color: "#111",
                }}>
                Isolation
              </span>
              <span
                style={{
                  border: "1px solid var(--accent-blue)",
                  borderRadius: "4px",
                  padding: "4px 8px",
                  fontSize: "12px",
                  backgroundColor: "var(--accent-light)",
                  color: "#111",
                }}>
                Reproducibility
              </span>
            </div>
          </div>
        </Link>

        {/* Docker Compose Card */}
        <Link
          to="/deployments/docker"
          className="card"
          style={{
            textDecoration: "none",
            color: "var(--color-text)",
            cursor: "pointer",
          }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "16px",
            }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="w-6 h-6">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            <h3 style={{ fontSize: "20px", margin: 0 }}>Docker Compose</h3>
          </div>
          <p
            style={{
              fontSize: "14px",
              color: "var(--color-text)",
              opacity: 0.8,
              marginBottom: "16px",
            }}>
            Multi-container orchestration
          </p>

          <div style={{ marginBottom: "16px" }}>
            <h4 style={{ fontSize: "14px", marginBottom: "8px" }}>Commands:</h4>
            <CopyCommandBox command="docker-compose up -d" />
            <CopyCommandBox command="docker-compose down" />
          </div>

          <div>
            <h4 style={{ fontSize: "14px", marginBottom: "8px" }}>Features:</h4>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <span
                style={{
                  border: "1px solid var(--accent-blue)",
                  borderRadius: "4px",
                  padding: "4px 8px",
                  fontSize: "12px",
                  backgroundColor: "var(--accent-light)",
                  color: "#111",
                }}>
                Multi-service
              </span>
              <span
                style={{
                  border: "1px solid var(--accent-blue)",
                  borderRadius: "4px",
                  padding: "4px 8px",
                  fontSize: "12px",
                  backgroundColor: "var(--accent-light)",
                  color: "#111",
                }}>
                Declarative config
              </span>
              <span
                style={{
                  border: "1px solid var(--accent-blue)",
                  borderRadius: "4px",
                  padding: "4px 8px",
                  fontSize: "12px",
                  backgroundColor: "var(--accent-light)",
                  color: "#111",
                }}>
                Automatic networking
              </span>
            </div>
          </div>
        </Link>

        {/* Kubernetes Card */}
        <Link
          to="/deployments/kubernetes"
          className="card"
          style={{
            textDecoration: "none",
            color: "var(--color-text)",
            cursor: "pointer",
          }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "16px",
            }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="w-6 h-6">
              <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
              <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
              <line x1="6" x2="6.01" y1="6" y2="6" />
              <line x1="6" x2="6.01" y1="18" y2="18" />
            </svg>
            <h3 style={{ fontSize: "20px", margin: 0 }}>Kubernetes</h3>
          </div>
          <p
            style={{
              fontSize: "14px",
              color: "var(--color-text)",
              opacity: 0.8,
              marginBottom: "16px",
            }}>
            Native Kubernetes orchestration
          </p>

          <div style={{ marginBottom: "16px" }}>
            <h4 style={{ fontSize: "14px", marginBottom: "8px" }}>Commands:</h4>
            <CopyCommandBox command="kubectl apply -f deployments/k8s/" />
            <CopyCommandBox command="kubectl get pods" />
            <CopyCommandBox command="kubectl port-forward svc/frontend 3000:3000" />
          </div>

          <div>
            <h4 style={{ fontSize: "14px", marginBottom: "8px" }}>Features:</h4>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <span
                style={{
                  border: "1px solid var(--accent-blue)",
                  borderRadius: "4px",
                  padding: "4px 8px",
                  fontSize: "12px",
                  backgroundColor: "var(--accent-light)",
                  color: "#111",
                }}>
                Scalability
              </span>
              <span
                style={{
                  border: "1px solid var(--accent-blue)",
                  borderRadius: "4px",
                  padding: "4px 8px",
                  fontSize: "12px",
                  backgroundColor: "var(--accent-light)",
                  color: "#111",
                }}>
                High availability
              </span>
              <span
                style={{
                  border: "1px solid var(--accent-blue)",
                  borderRadius: "4px",
                  padding: "4px 8px",
                  fontSize: "12px",
                  backgroundColor: "var(--accent-light)",
                  color: "#111",
                }}>
                Service discovery
              </span>
            </div>
          </div>
        </Link>

        {/* Kustomize Card */}
        <Link
          to="/deployments/kustomize"
          className="card"
          style={{
            textDecoration: "none",
            color: "var(--color-text)",
            cursor: "pointer",
          }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "16px",
            }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="w-6 h-6">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z" />
            </svg>
            <h3 style={{ fontSize: "20px", margin: 0 }}>Kustomize</h3>
          </div>
          <p
            style={{
              fontSize: "14px",
              color: "var(--color-text)",
              opacity: 0.8,
              marginBottom: "16px",
            }}>
            Template-free configuration management
          </p>

          <div style={{ marginBottom: "16px" }}>
            <h4 style={{ fontSize: "14px", marginBottom: "8px" }}>Commands:</h4>
            <CopyCommandBox command="kubectl apply -k deployments/kustomize/overlays/dev" />
            <CopyCommandBox command="kubectl apply -k deployments/kustomize/overlays/prod" />
          </div>

          <div>
            <h4 style={{ fontSize: "14px", marginBottom: "8px" }}>Features:</h4>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <span
                style={{
                  border: "1px solid var(--accent-blue)",
                  borderRadius: "4px",
                  padding: "4px 8px",
                  fontSize: "12px",
                  backgroundColor: "var(--accent-light)",
                  color: "#111",
                }}>
                No templates
              </span>
              <span
                style={{
                  border: "1px solid var(--accent-blue)",
                  borderRadius: "4px",
                  padding: "4px 8px",
                  fontSize: "12px",
                  backgroundColor: "var(--accent-light)",
                  color: "#111",
                }}>
                Environment-specific config
              </span>
              <span
                style={{
                  border: "1px solid var(--accent-blue)",
                  borderRadius: "4px",
                  padding: "4px 8px",
                  fontSize: "12px",
                  backgroundColor: "var(--accent-light)",
                  color: "#111",
                }}>
                Declarative approach
              </span>
            </div>
          </div>
        </Link>

        {/* Helm Card */}
        <Link
          to="/deployments/helm"
          className="card"
          style={{
            textDecoration: "none",
            color: "var(--color-text)",
            cursor: "pointer",
          }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "16px",
            }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="w-6 h-6">
              <path d="M16.5 9.4 7.55 4.24" />
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27,6.96 12,12.01 20.73,6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
            <h3 style={{ fontSize: "20px", margin: 0 }}>Helm</h3>
          </div>
          <p
            style={{
              fontSize: "14px",
              color: "var(--color-text)",
              opacity: 0.8,
              marginBottom: "16px",
            }}>
            Kubernetes package manager
          </p>

          <div style={{ marginBottom: "16px" }}>
            <h4 style={{ fontSize: "14px", marginBottom: "8px" }}>Commands:</h4>
            <CopyCommandBox command="helm install devopslab ./deployments/helm" />
            <CopyCommandBox command="helm upgrade devopslab ./deployments/helm" />
            <CopyCommandBox command="helm uninstall devopslab" />
          </div>

          <div>
            <h4 style={{ fontSize: "14px", marginBottom: "8px" }}>Features:</h4>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <span
                style={{
                  border: "1px solid var(--accent-blue)",
                  borderRadius: "4px",
                  padding: "4px 8px",
                  fontSize: "12px",
                  backgroundColor: "var(--accent-light)",
                  color: "#111",
                }}>
                Release management
              </span>
              <span
                style={{
                  border: "1px solid var(--accent-blue)",
                  borderRadius: "4px",
                  padding: "4px 8px",
                  fontSize: "12px",
                  backgroundColor: "var(--accent-light)",
                  color: "#111",
                }}>
                Advanced templating
              </span>
              <span
                style={{
                  border: "1px solid var(--accent-blue)",
                  borderRadius: "4px",
                  padding: "4px 8px",
                  fontSize: "12px",
                  backgroundColor: "var(--accent-light)",
                  color: "#111",
                }}>
                Easy rollbacks
              </span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default DeploymentPage;
