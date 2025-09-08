import React from "react";
import { Layers, Network, Info, AlertTriangle, CheckCircle, Server } from "lucide-react";
import TutorialLayout from "./TutorialLayout";
import CrossReferenceLinks from "../shared/CrossReferenceLinks";

const KubernetesTutorial: React.FC = () => {
  const crossReferenceLinks = [
    {
      title: "Kubernetes Deployment",
      path: "/deployments/kubernetes",
      description: "Learn how to deploy this application to a Kubernetes cluster with step-by-step instructions",
      icon: Server,
      type: 'deployment' as const
    }
  ];

  return (
    <TutorialLayout
      title="Kubernetes Introduction"
      description="Orchestrate containers at scale"
      estimatedReadingTime="4 minutes"
      prerequisites="Docker"
      currentTutorial="kubernetes"
      customNextSteps={
        <CrossReferenceLinks 
          title="Ready to Deploy?"
          links={crossReferenceLinks as any}
        />
      }
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
          Pods are the smallest unit you can deploy in Kubernetes. Think of a Pod as a wrapper around one or more containers 
          that share the same network and storage. Most of the time, you'll have one container per Pod.
        </p>

        <div className="code-example">
          <h4>Simple Pod Example</h4>
          <pre className="code-block">
{`apiVersion: v1
kind: Pod
metadata:
  name: my-app
spec:
  containers:
  - name: my-app
    image: nginx:latest
    ports:
    - containerPort: 80`}
          </pre>
        </div>

        <div className="info-box">
          <Info size={20} />
          <div>
            <h4>Key Point</h4>
            <p>
              While you can create Pods directly, you usually don't. Instead, you use Deployments to manage Pods for you, 
              which provides automatic scaling and self-healing.
            </p>
          </div>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Deployments: Managing Pods</h2>
        
        <p>
          Deployments are the recommended way to manage Pods. They ensure your application runs with the desired number of 
          replicas and automatically replace failed Pods. Think of a Deployment as a manager that keeps your Pods running.
        </p>

        <div className="code-example">
          <h4>Simple Deployment Example</h4>
          <pre className="code-block">
{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-app
        image: nginx:latest
        ports:
        - containerPort: 80`}
          </pre>
        </div>

        <div className="info-box">
          <Info size={20} />
          <div>
            <h4>What Deployments Do</h4>
            <p>
              Deployments automatically create and manage Pods. If a Pod fails, Kubernetes creates a new one. 
              If you want more replicas, Kubernetes creates them. It's like having an automatic system administrator.
            </p>
          </div>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Services: Making Pods Accessible</h2>
        
        <p>
          Services provide a stable way to access your Pods. Since Pods can be created and destroyed, their IP addresses 
          change. Services give you a stable IP address and DNS name to access your application.
        </p>

        <div className="code-example">
          <h4>Simple Service Example</h4>
          <pre className="code-block">
{`apiVersion: v1
kind: Service
metadata:
  name: my-app-service
spec:
  selector:
    app: my-app
  ports:
  - port: 80
    targetPort: 80
  type: ClusterIP`}
          </pre>
        </div>

        <div className="info-box">
          <Info size={20} />
          <div>
            <h4>How Services Work</h4>
            <p>
              Services act like a load balancer in front of your Pods. When you access the service, Kubernetes automatically 
              routes traffic to one of your healthy Pods. If a Pod fails, the service stops sending traffic to it.
            </p>
          </div>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Essential kubectl Commands</h2>
        
        <p>
          kubectl is the command-line tool for interacting with Kubernetes. Here are the most important commands you'll use:
        </p>
        
        <div className="commands-grid">
          <div className="command-card">
            <h4>Basic Commands</h4>
            <div className="command-list">
              <div className="command-item">
                <code>kubectl get pods</code>
                <span>List all pods</span>
              </div>
              <div className="command-item">
                <code>kubectl get deployments</code>
                <span>List all deployments</span>
              </div>
              <div className="command-item">
                <code>kubectl get services</code>
                <span>List all services</span>
              </div>
              <div className="command-item">
                <code>kubectl apply -f file.yaml</code>
                <span>Create/update resources</span>
              </div>
            </div>
          </div>
          
          <div className="command-card">
            <h4>Useful Commands</h4>
            <div className="command-list">
              <div className="command-item">
                <code>kubectl describe pod pod-name</code>
                <span>Get detailed pod info</span>
              </div>
              <div className="command-item">
                <code>kubectl logs pod-name</code>
                <span>View pod logs</span>
              </div>
              <div className="command-item">
                <code>kubectl scale deployment my-app --replicas=5</code>
                <span>Scale deployment</span>
              </div>
              <div className="command-item">
                <code>kubectl delete -f file.yaml</code>
                <span>Delete resources</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Key Takeaways</h2>
        
        <div className="best-practices">
          <div className="practice-item practice-item--good">
            <CheckCircle size={20} />
            <div>
              <h4>Pods Run Your Containers</h4>
              <p>Pods are the smallest unit in Kubernetes. They wrap your containers and provide shared networking and storage.</p>
            </div>
          </div>
          
          <div className="practice-item practice-item--good">
            <CheckCircle size={20} />
            <div>
              <h4>Deployments Manage Pods</h4>
              <p>Use Deployments to manage Pods. They provide automatic scaling, self-healing, and rolling updates.</p>
            </div>
          </div>
          
          <div className="practice-item practice-item--good">
            <CheckCircle size={20} />
            <div>
              <h4>Services Provide Access</h4>
              <p>Services give you a stable way to access your Pods. They act like load balancers and provide stable IP addresses.</p>
            </div>
          </div>
          
          <div className="practice-item practice-item--warning">
            <AlertTriangle size={20} />
            <div>
              <h4>Start Simple</h4>
              <p>Begin with basic Pods, Deployments, and Services. Learn advanced features like ConfigMaps and Secrets later.</p>
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
