import React from "react";
import { Layers, Network, Info, AlertTriangle, CheckCircle, Server, Database, Globe } from "lucide-react";
import TutorialLayout from "./TutorialLayout";

const KubernetesTutorial: React.FC = () => {
  return (
    <TutorialLayout
      title="Kubernetes Introduction"
      description="Orchestrate containers at scale"
      estimatedReadingTime="25-30 minutes"
      prerequisites="Docker basics, YAML syntax"
      currentTutorial="kubernetes"
    >
      <div className="tutorial-section">
        <h2>What is Kubernetes?</h2>
        <p>
          Kubernetes (often abbreviated as K8s) is an open-source container orchestration platform that automates the deployment, 
          scaling, and management of containerized applications. Think of it as the "operating system" for your distributed applications.
        </p>
        
        <div className="info-box">
          <Info size={20} />
          <div>
            <h4>Why Kubernetes?</h4>
            <p>
              When you have multiple containers running across different machines, Kubernetes handles the complexity of 
              networking, load balancing, scaling, and ensuring your applications are always available.
            </p>
          </div>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Core Concepts</h2>
        
        <div className="concept-grid">
          <div className="concept-card">
            <div className="concept-card__icon">
              <Server size={24} />
            </div>
            <h3>Pods</h3>
            <p>
              The smallest deployable unit in Kubernetes. A Pod contains one or more containers that share the same network 
              and storage resources, and are always scheduled together.
            </p>
          </div>
          
          <div className="concept-card">
            <div className="concept-card__icon">
              <Layers size={24} />
            </div>
            <h3>Deployments</h3>
            <p>
              Manage the desired state for Pods and ReplicaSets. Deployments provide declarative updates for Pods and 
              enable rolling updates and rollbacks.
            </p>
          </div>
          
          <div className="concept-card">
            <div className="concept-card__icon">
              <Network size={24} />
            </div>
            <h3>Services</h3>
            <p>
              Define a logical set of Pods and a policy by which to access them. Services provide stable IP addresses 
              and DNS names for Pods, enabling load balancing.
            </p>
          </div>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Understanding Pods</h2>
        
        <p>
          Pods are the fundamental building blocks of Kubernetes applications. Each Pod represents a single instance of a 
          running process in your cluster and can contain one or more containers.
        </p>

        <div className="code-example">
          <h4>Basic Pod Example</h4>
          <pre className="code-block">
{`apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  labels:
    app: nginx
spec:
  containers:
  - name: nginx
    image: nginx:latest
    ports:
    - containerPort: 80
    resources:
      requests:
        memory: "64Mi"
        cpu: "250m"
      limits:
        memory: "128Mi"
        cpu: "500m"`}
          </pre>
        </div>

        <div className="info-box">
          <Info size={20} />
          <div>
            <h4>Pod Lifecycle</h4>
            <p>
              Pods go through several phases: Pending, Running, Succeeded, Failed, Unknown. Understanding these phases 
              helps you troubleshoot issues and monitor your applications.
            </p>
          </div>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Deployments: Managing Pods</h2>
        
        <p>
          While you can create Pods directly, it's better to use Deployments. Deployments provide declarative updates 
          for Pods and ReplicaSets, ensuring your application is always running with the desired number of replicas.
        </p>

        <div className="code-example">
          <h4>Deployment Example</h4>
          <pre className="code-block">
{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.21
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "64Mi"
            cpu: "250m"
          limits:
            memory: "128Mi"
            cpu: "500m"`}
          </pre>
        </div>

        <div className="workflow-steps">
          <div className="workflow-step">
            <div className="workflow-step__number">1</div>
            <div className="workflow-step__content">
              <h4>Create Deployment</h4>
              <p>Define your application with desired replicas and container specifications.</p>
            </div>
          </div>
          
          <div className="workflow-step">
            <div className="workflow-step__number">2</div>
            <div className="workflow-step__content">
              <h4>Kubernetes Creates ReplicaSet</h4>
              <p>Kubernetes automatically creates a ReplicaSet to manage the Pod replicas.</p>
            </div>
          </div>
          
          <div className="workflow-step">
            <div className="workflow-step__number">3</div>
            <div className="workflow-step__content">
              <h4>Pods Are Scheduled</h4>
              <p>Pods are created and scheduled across available nodes in the cluster.</p>
            </div>
          </div>
          
          <div className="workflow-step">
            <div className="workflow-step__number">4</div>
            <div className="workflow-step__content">
              <h4>Health Monitoring</h4>
              <p>Kubernetes continuously monitors Pod health and replaces failed Pods automatically.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Services: Networking and Load Balancing</h2>
        
        <p>
          Services provide stable networking for your Pods. They abstract away the complexity of Pod IP addresses 
          and provide load balancing across multiple Pod instances.
        </p>

        <div className="concept-grid">
          <div className="concept-card">
            <div className="concept-card__icon">
              <Network size={24} />
            </div>
            <h3>ClusterIP</h3>
            <p>
              Default service type. Exposes the service on a cluster-internal IP. Only reachable from within the cluster.
            </p>
          </div>
          
          <div className="concept-card">
            <div className="concept-card__icon">
              <Globe size={24} />
            </div>
            <h3>NodePort</h3>
            <p>
              Exposes the service on each Node's IP at a static port. Accessible from outside the cluster.
            </p>
          </div>
          
          <div className="concept-card">
            <div className="concept-card__icon">
              <Database size={24} />
            </div>
            <h3>LoadBalancer</h3>
            <p>
              Exposes the service externally using a cloud provider's load balancer. Automatically creates NodePort and ClusterIP.
            </p>
          </div>
        </div>

        <div className="code-example">
          <h4>Service Example</h4>
          <pre className="code-block">
{`apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  selector:
    app: nginx
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
  type: LoadBalancer`}
          </pre>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Configuration Management</h2>
        
        <p>
          Kubernetes provides several ways to manage configuration data for your applications, including ConfigMaps 
          and Secrets for non-sensitive and sensitive data respectively.
        </p>

        <div className="commands-grid">
          <div className="command-card">
            <h4>ConfigMaps</h4>
            <div className="command-list">
              <div className="command-item">
                <code>kubectl create configmap</code>
                <span>Create from files or literals</span>
              </div>
              <div className="command-item">
                <code>kubectl get configmaps</code>
                <span>List all ConfigMaps</span>
              </div>
              <div className="command-item">
                <code>kubectl describe configmap</code>
                <span>View ConfigMap details</span>
              </div>
            </div>
          </div>
          
          <div className="command-card">
            <h4>Secrets</h4>
            <div className="command-list">
              <div className="command-item">
                <code>kubectl create secret</code>
                <span>Create from files or literals</span>
              </div>
              <div className="command-item">
                <code>kubectl get secrets</code>
                <span>List all Secrets</span>
              </div>
              <div className="command-item">
                <code>kubectl describe secret</code>
                <span>View Secret details</span>
              </div>
            </div>
          </div>
        </div>

        <div className="code-example">
          <h4>ConfigMap Example</h4>
          <pre className="code-block">
{`apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  database_url: "postgresql://localhost:5432/myapp"
  log_level: "info"
  max_connections: "100"`}
          </pre>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Essential kubectl Commands</h2>
        
        <div className="commands-grid">
          <div className="command-card">
            <h4>Cluster Information</h4>
            <div className="command-list">
              <div className="command-item">
                <code>kubectl cluster-info</code>
                <span>Display cluster info</span>
              </div>
              <div className="command-item">
                <code>kubectl get nodes</code>
                <span>List cluster nodes</span>
              </div>
              <div className="command-item">
                <code>kubectl get namespaces</code>
                <span>List namespaces</span>
              </div>
            </div>
          </div>
          
          <div className="command-card">
            <h4>Resource Management</h4>
            <div className="command-list">
              <div className="command-item">
                <code>kubectl apply -f file.yaml</code>
                <span>Create/update resources</span>
              </div>
              <div className="command-item">
                <code>kubectl get pods</code>
                <span>List all pods</span>
              </div>
              <div className="command-item">
                <code>kubectl describe pod</code>
                <span>Detailed pod info</span>
              </div>
              <div className="command-item">
                <code>kubectl logs pod-name</code>
                <span>View pod logs</span>
              </div>
            </div>
          </div>
          
          <div className="command-card">
            <h4>Scaling and Updates</h4>
            <div className="command-list">
              <div className="command-item">
                <code>kubectl scale deployment</code>
                <span>Scale deployments</span>
              </div>
              <div className="command-item">
                <code>kubectl rollout status</code>
                <span>Check rollout status</span>
              </div>
              <div className="command-item">
                <code>kubectl rollout undo</code>
                <span>Rollback deployment</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Best Practices</h2>
        
        <div className="best-practices">
          <div className="practice-item practice-item--good">
            <CheckCircle size={20} />
            <div>
              <h4>Use Deployments Instead of Pods</h4>
              <p>Deployments provide automatic scaling, rolling updates, and self-healing capabilities.</p>
            </div>
          </div>
          
          <div className="practice-item practice-item--good">
            <CheckCircle size={20} />
            <div>
              <h4>Set Resource Limits</h4>
              <p>Always define resource requests and limits to prevent resource contention and ensure fair scheduling.</p>
            </div>
          </div>
          
          <div className="practice-item practice-item--good">
            <CheckCircle size={20} />
            <div>
              <h4>Use Labels and Selectors</h4>
              <p>Organize your resources with meaningful labels for better management and filtering.</p>
            </div>
          </div>
          
          <div className="practice-item practice-item--warning">
            <AlertTriangle size={20} />
            <div>
              <h4>Don't Store Secrets in ConfigMaps</h4>
              <p>Use Kubernetes Secrets for sensitive data and consider external secret management solutions for production.</p>
            </div>
          </div>
          
          <div className="practice-item practice-item--warning">
            <AlertTriangle size={20} />
            <div>
              <h4>Plan for High Availability</h4>
              <p>Use multiple replicas and spread Pods across different nodes to ensure application availability.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Next Steps</h2>
        
        <p>
          You now understand the fundamentals of Kubernetes! In the next tutorial, we'll explore Kustomize and learn 
          how to manage environment-specific configurations without templates.
        </p>
        
        <div className="next-steps">
          <div className="next-step">
            <h4>Practice</h4>
            <p>Set up a local Kubernetes cluster with Minikube or Docker Desktop</p>
          </div>
          <div className="next-step">
            <h4>Explore</h4>
            <p>Learn about Kubernetes namespaces, volumes, and persistent storage</p>
          </div>
          <div className="next-step">
            <h4>Continue</h4>
            <p>Move on to Kustomize for configuration management</p>
          </div>
        </div>
      </div>
    </TutorialLayout>
  );
};

export default KubernetesTutorial;
