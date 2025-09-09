import React from "react";
import { Info, AlertTriangle, CheckCircle, Folder, FileText, GitBranch, Server } from "lucide-react";
import TutorialLayout from "./TutorialLayout";
import CrossReferenceLinks from "../shared/CrossReferenceLinks";
import VideoResource from "../shared/VideoResource";

const KustomizeTutorial: React.FC = () => {
  const crossReferenceLinks = [
    {
      title: "Kustomize Deployment",
      path: "/deployments/kustomize",
      description: "Deploy this application using Kustomize overlays for environment-specific configurations",
      icon: Server,
      type: 'deployment' as const
    }
  ];

  return (
    <TutorialLayout
      title="Kustomize Basics"
      description="Manage configurations without templates"
      estimatedReadingTime="5 minutes"
      prerequisites="Kubernetes"
      currentTutorial="kustomize"
      customNextSteps={
        <CrossReferenceLinks 
          title="Ready to Deploy?"
          links={crossReferenceLinks as any}
        />
      }
    >
      <div className="tutorial-section">
        <h2>What is Kustomize?</h2>
        <p>
          Kustomize is a native Kubernetes configuration management tool that allows you to customize Kubernetes manifests 
          without templates. It uses a template-free approach where you define a base configuration and then apply 
          environment-specific customizations through overlays.
        </p>
        
        <div className="info-box">
          <Info size={20} />
          <div>
            <h4>Why Kustomize?</h4>
            <p>
              Unlike templating tools like Helm, Kustomize keeps your base manifests clean and readable. It applies 
              customizations declaratively, making it easier to understand what changes are being made for each environment.
            </p>
          </div>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Core Concepts</h2>
        
        <div className="concept-grid">
          <div className="concept-card">
            <div className="concept-card__icon">
              <Folder size={24} />
            </div>
            <h3>Base</h3>
            <p>
              A directory containing the original Kubernetes manifests. This is your source of truth with common 
              configurations that apply to all environments.
            </p>
          </div>
          
          <div className="concept-card">
            <div className="concept-card__icon">
              <GitBranch size={24} />
            </div>
            <h3>Overlay</h3>
            <p>
              A directory that references a base and contains environment-specific customizations. Overlays apply 
              patches, variable substitutions, and other transformations.
            </p>
          </div>
          
          <div className="concept-card">
            <div className="concept-card__icon">
              <FileText size={24} />
            </div>
            <h3>kustomization.yaml</h3>
            <p>
              The configuration file that tells Kustomize what resources to include and what transformations to apply. 
              Every base and overlay directory needs this file.
            </p>
          </div>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Project Structure</h2>
        
        <p>
          Kustomize organizes your files into base configurations and environment-specific overlays. This keeps 
          your common configuration separate from environment differences.
        </p>

        <div className="code-example">
          <h4>Simple Structure</h4>
          <pre className="code-block">
{`myapp/
├── base/
│   ├── kustomization.yaml
│   ├── deployment.yaml
│   └── service.yaml
└── overlays/
    ├── dev/
    │   └── kustomization.yaml
    └── prod/
        └── kustomization.yaml`}
          </pre>
        </div>

        <div className="info-box">
          <Info size={20} />
          <div>
            <h4>Key Idea</h4>
            <p>
              Base contains your common Kubernetes files. Overlays contain environment-specific changes. 
              This way you don't duplicate your entire configuration for each environment.
            </p>
          </div>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Creating a Base Configuration</h2>
        
        <p>
          The base directory contains your standard Kubernetes files. These should work for all environments 
          with minimal changes.
        </p>

        <div className="code-example">
          <h4>Base kustomization.yaml</h4>
          <pre className="code-block">
{`apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

resources:
- deployment.yaml
- service.yaml

commonLabels:
  app: myapp`}
          </pre>
        </div>

        <div className="code-example">
          <h4>Base deployment.yaml</h4>
          <pre className="code-block">
{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  replicas: 1
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
        image: myapp:latest
        ports:
        - containerPort: 8080`}
          </pre>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Creating Overlays</h2>
        
        <p>
          Overlays contain environment-specific changes. They reference the base and apply customizations 
          like different replica counts or image tags.
        </p>

        <div className="code-example">
          <h4>Development Overlay kustomization.yaml</h4>
          <pre className="code-block">
{`apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

resources:
- ../../base

namespace: dev

patches:
- path: replica-patch.yaml
  target:
    kind: Deployment
    name: myapp

images:
- name: myapp
  newTag: dev`}
          </pre>
        </div>

        <div className="info-box">
          <Info size={20} />
          <div>
            <h4>How Overlays Work</h4>
            <p>
              Overlays reference the base configuration and apply changes on top of it. This way you only 
              define what's different for each environment, not the entire configuration.
            </p>
          </div>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Understanding Patches</h2>
        
        <p>
          Patches are small files that modify specific parts of your base configuration. They let you change 
          things like replica counts or resource limits without copying the entire file.
        </p>

        <div className="code-example">
          <h4>Simple Replica Patch</h4>
          <pre className="code-block">
{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  replicas: 3`}
          </pre>
        </div>

        <div className="info-box">
          <Info size={20} />
          <div>
            <h4>How Patches Work</h4>
            <p>
              Patches only contain the fields you want to change. Kustomize merges them with your base configuration 
              to create the final result. This keeps your changes small and focused.
            </p>
          </div>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Essential Kustomize Commands</h2>
        
        <p>
          Kustomize is built into kubectl, so you use kubectl commands to work with Kustomize:
        </p>
        
        <div className="commands-grid">
          <div className="command-card">
            <h4>Basic Commands</h4>
            <div className="command-list">
              <div className="command-item">
                <code>kubectl kustomize overlay/</code>
                <span>Build and preview YAML</span>
              </div>
              <div className="command-item">
                <code>kubectl apply -k overlay/</code>
                <span>Build and apply to cluster</span>
              </div>
              <div className="command-item">
                <code>kubectl diff -k overlay/</code>
                <span>Preview changes before applying</span>
              </div>
              <div className="command-item">
                <code>kubectl delete -k overlay/</code>
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
              <h4>Base Contains Common Configuration</h4>
              <p>Base directories hold your standard Kubernetes files that work across all environments.</p>
            </div>
          </div>
          
          <div className="practice-item practice-item--good">
            <CheckCircle size={20} />
            <div>
              <h4>Overlays Apply Environment Changes</h4>
              <p>Overlays reference the base and apply environment-specific customizations like different replica counts.</p>
            </div>
          </div>
          
          <div className="practice-item practice-item--good">
            <CheckCircle size={20} />
            <div>
              <h4>Patches Modify Specific Fields</h4>
              <p>Patches are small files that change only the parts you need, keeping your configuration clean and focused.</p>
            </div>
          </div>
          
          <div className="practice-item practice-item--warning">
            <AlertTriangle size={20} />
            <div>
              <h4>Start Simple</h4>
              <p>Begin with basic base and overlay structures. Learn advanced features like generators and transformers later.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Video Resource */}
      <VideoResource
        title="Kustomize Tutorial for Beginners"
        url="https://www.youtube.com/watch?v=spCdNeNCuFU"
        description="Master Kustomize with this comprehensive video tutorial covering base configurations, overlays, patches, and environment management."
        thumbnail="https://img.youtube.com/vi/spCdNeNCuFU/hqdefault.jpg"
      />
    </TutorialLayout>
  );
};

export default KustomizeTutorial;
