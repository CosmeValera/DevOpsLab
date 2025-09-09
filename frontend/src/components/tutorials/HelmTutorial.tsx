import React from "react";
import { Package, Settings, Info, AlertTriangle, CheckCircle, GitBranch, Server } from "lucide-react";
import TutorialLayout from "./TutorialLayout";
import CrossReferenceLinks from "../shared/CrossReferenceLinks";
import VideoResource from "../shared/VideoResource";

const HelmTutorial: React.FC = () => {
  const crossReferenceLinks = [
    {
      title: "Helm Deployment",
      path: "/deployments/helm",
      description: "Deploy this application using Helm charts with templating and release management",
      icon: Server,
      type: 'deployment' as const
    }
  ];

  return (
    <TutorialLayout
      title="Helm Basics"
      description="Package applications for Kubernetes"
      estimatedReadingTime="5 minutes"
      prerequisites="Kubernetes"
      currentTutorial="helm"
      customNextSteps={
        <CrossReferenceLinks 
          title="Ready to Deploy?"
          links={crossReferenceLinks as any}
        />
      }
    >
      <div className="tutorial-section">
        <h2>What is Helm?</h2>
        <p>
          Helm is the package manager for Kubernetes. It simplifies the deployment and management of Kubernetes applications 
          by packaging them into charts (a collection of files that describe a related set of Kubernetes resources).
        </p>
        
        <div className="info-box">
          <Info size={20} />
          <div>
            <h4>Why Helm?</h4>
            <p>
              Helm makes it easy to install, upgrade, and manage complex Kubernetes applications. It provides templating, 
              versioning, and dependency management, making it the standard way to package and distribute Kubernetes applications.
            </p>
          </div>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Core Concepts</h2>
        
        <div className="concept-grid">
          <div className="concept-card">
            <div className="concept-card__icon">
              <Package size={24} />
            </div>
            <h3>Chart</h3>
            <p>
              A Helm package containing all the resource definitions necessary to run an application, tool, or service 
              inside a Kubernetes cluster.
            </p>
          </div>
          
          <div className="concept-card">
            <div className="concept-card__icon">
              <Settings size={24} />
            </div>
            <h3>Values</h3>
            <p>
              Configuration parameters for a chart. Values can be set during installation or upgrade, allowing you to 
              customize the chart's behavior.
            </p>
          </div>
          
          <div className="concept-card">
            <div className="concept-card__icon">
              <GitBranch size={24} />
            </div>
            <h3>Release</h3>
            <p>
              A running instance of a chart in a Kubernetes cluster. Each release has a unique name and can be 
              upgraded, rolled back, or deleted independently.
            </p>
          </div>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Chart Structure</h2>
        
        <p>
          A Helm chart is a collection of files organized in a specific directory structure. The most important files are:
        </p>

        <div className="code-example">
          <h4>Basic Chart Structure</h4>
          <pre className="code-block">
{`myapp/
├── Chart.yaml          # Chart information
├── values.yaml         # Default configuration
└── templates/          # Kubernetes files
    ├── deployment.yaml
    └── service.yaml`}
          </pre>
        </div>

        <div className="info-box">
          <Info size={20} />
          <div>
            <h4>Simple Start</h4>
            <p>
              Use <code>helm create myapp</code> to generate a new chart with example files. This gives you a working 
              starting point that you can customize.
            </p>
          </div>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Chart.yaml - Basic Information</h2>
        
        <p>
          The Chart.yaml file contains basic information about your chart. You only need a few essential fields to get started.
        </p>

        <div className="code-example">
          <h4>Simple Chart.yaml</h4>
          <pre className="code-block">
{`apiVersion: v2
name: myapp
description: A simple web application
version: 0.1.0
appVersion: "1.0.0"`}
          </pre>
        </div>

        <div className="info-box">
          <Info size={20} />
          <div>
            <h4>Key Fields</h4>
            <p>
              <strong>name:</strong> Your chart name <br/>
              <strong>version:</strong> Chart version <br/>
              <strong>appVersion:</strong> Version of your application
            </p>
          </div>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Values.yaml - Configuration</h2>
        
        <p>
          The values.yaml file contains default configuration values for your chart. These values can be 
          customized when installing or upgrading your application.
        </p>

        <div className="code-example">
          <h4>Simple values.yaml</h4>
          <pre className="code-block">
{`# Default values for myapp
replicaCount: 1

image:
  repository: nginx
  tag: "latest"

service:
  type: ClusterIP
  port: 80

resources:
  limits:
    cpu: 100m
    memory: 128Mi`}
          </pre>
        </div>

        <div className="info-box">
          <Info size={20} />
          <div>
            <h4>How Values Work</h4>
            <p>
              Values are like variables that you can change without modifying your Kubernetes files. 
              You can override them when installing: <code>helm install myapp ./myapp --set replicaCount=3</code>
            </p>
          </div>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Templates - Simple Templating</h2>
        
        <p>
          Templates are Kubernetes files with placeholders that get replaced with values. This allows you to 
          customize your application without changing the files.
        </p>

        <div className="code-example">
          <h4>Simple Deployment Template</h4>
          <pre className="code-block">
{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  replicas: {{ .Values.replicaCount }}
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
        - name: myapp
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
          ports:
            - containerPort: 80`}
          </pre>
        </div>

        <div className="info-box">
          <Info size={20} />
          <div>
            <h4>Template Basics</h4>
            <p>
              <strong>{`{{ .Values.replicaCount }}`}</strong> - Gets the replicaCount from values.yaml<br/>
              <strong>{`{{ .Values.image.repository }}`}</strong> - Gets the image repository<br/>
              <strong>{`{{ .Values.image.tag }}`}</strong> - Gets the image tag
            </p>
          </div>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Essential Helm Commands</h2>
        
        <p>
          Here are the most important Helm commands you'll use to work with charts and releases:
        </p>
        
        <div className="commands-grid">
          <div className="command-card">
            <h4>Basic Commands</h4>
            <div className="command-list">
              <div className="command-item">
                <code>helm create myapp</code>
                <span>Create new chart</span>
              </div>
              <div className="command-item">
                <code>helm install myapp ./myapp</code>
                <span>Install chart</span>
              </div>
              <div className="command-item">
                <code>helm upgrade myapp ./myapp</code>
                <span>Upgrade release</span>
              </div>
              <div className="command-item">
                <code>helm uninstall myapp</code>
                <span>Uninstall release</span>
              </div>
            </div>
          </div>
          
          <div className="command-card">
            <h4>Useful Commands</h4>
            <div className="command-list">
              <div className="command-item">
                <code>helm list</code>
                <span>List all releases</span>
              </div>
              <div className="command-item">
                <code>helm status myapp</code>
                <span>Check release status</span>
              </div>
              <div className="command-item">
                <code>helm template myapp</code>
                <span>Preview generated YAML</span>
              </div>
              <div className="command-item">
                <code>helm lint myapp</code>
                <span>Validate chart</span>
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
              <h4>Charts are Packages</h4>
              <p>Charts are collections of Kubernetes files that define how to deploy an application. They're like installers for Kubernetes.</p>
            </div>
          </div>
          
          <div className="practice-item practice-item--good">
            <CheckCircle size={20} />
            <div>
              <h4>Releases are Running Instances</h4>
              <p>When you install a chart, it becomes a release. You can have multiple releases of the same chart with different configurations.</p>
            </div>
          </div>
          
          <div className="practice-item practice-item--good">
            <CheckCircle size={20} />
            <div>
              <h4>Values are Configuration</h4>
              <p>Values let you customize your application without changing the chart files. They're like settings you can adjust.</p>
            </div>
          </div>
          
          <div className="practice-item practice-item--warning">
            <AlertTriangle size={20} />
            <div>
              <h4>Start Simple</h4>
              <p>Begin with basic charts and simple templating. Learn advanced features like hooks and dependencies later.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Video Resource */}
      <VideoResource
        title="Helm Tutorial for Beginners"
        url="https://www.youtube.com/watch?v=-ykwb1d0DXU"
        description="Learn Helm from scratch with this detailed video tutorial covering charts, releases, values, and templating concepts."
        thumbnail="https://img.youtube.com/vi/-ykwb1d0DXU/hqdefault.jpg"
      />
    </TutorialLayout>
  );
};

export default HelmTutorial;
