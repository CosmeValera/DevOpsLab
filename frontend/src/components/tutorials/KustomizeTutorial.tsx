import React from "react";
import { Code, Layers, Settings, Info, AlertTriangle, CheckCircle, Folder, FileText, GitBranch, Server } from "lucide-react";
import TutorialLayout from "./TutorialLayout";
import CrossReferenceLinks from "../shared/CrossReferenceLinks";

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
      title="Kustomize Deep Dive"
      description="Template-free configuration management"
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
          A typical Kustomize project follows a clear directory structure that separates base configurations from 
          environment-specific overlays.
        </p>

        <div className="code-example">
          <h4>Directory Structure</h4>
          <pre className="code-block">
{`myapp/
├── base/
│   ├── kustomization.yaml
│   ├── deployment.yaml
│   ├── service.yaml
│   └── configmap.yaml
├── overlays/
│   ├── dev/
│   │   ├── kustomization.yaml
│   │   └── patches/
│   │       ├── replica-patch.yaml
│   │       └── resource-patch.yaml
│   └── prod/
│       ├── kustomization.yaml
│       └── patches/
│           ├── replica-patch.yaml
│           └── resource-patch.yaml`}
          </pre>
        </div>

        <div className="info-box">
          <Info size={20} />
          <div>
            <h4>Best Practice</h4>
            <p>
              Keep your base manifests as generic as possible. Use overlays to add environment-specific values like 
              replica counts, resource limits, and configuration values.
            </p>
          </div>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Creating a Base Configuration</h2>
        
        <p>
          The base directory contains your original Kubernetes manifests. These should be generic enough to work 
          across all environments with minimal changes.
        </p>

        <div className="code-example">
          <h4>Base kustomization.yaml</h4>
          <pre className="code-block">
{`apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

resources:
- deployment.yaml
- service.yaml
- configmap.yaml

commonLabels:
  app: myapp
  version: v1.0.0

namespace: default`}
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
        - containerPort: 8080
        resources:
          requests:
            memory: "64Mi"
            cpu: "250m"
          limits:
            memory: "128Mi"
            cpu: "500m"`}
          </pre>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Creating Overlays</h2>
        
        <p>
          Overlays contain environment-specific customizations. They reference the base and apply patches, 
          variable substitutions, and other transformations.
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
- path: patches/replica-patch.yaml
  target:
    kind: Deployment
    name: myapp
- path: patches/resource-patch.yaml
  target:
    kind: Deployment
    name: myapp

images:
- name: myapp
  newTag: dev

configMapGenerator:
- name: myapp-config
  literals:
  - ENVIRONMENT=development
  - LOG_LEVEL=debug`}
          </pre>
        </div>

        <div className="workflow-steps">
          <div className="workflow-step">
            <div className="workflow-step__number">1</div>
            <div className="workflow-step__content">
              <h4>Reference Base</h4>
              <p>Point to the base directory using the resources field.</p>
            </div>
          </div>
          
          <div className="workflow-step">
            <div className="workflow-step__number">2</div>
            <div className="workflow-step__content">
              <h4>Apply Patches</h4>
              <p>Use patches to modify specific fields in your resources.</p>
            </div>
          </div>
          
          <div className="workflow-step">
            <div className="workflow-step__number">3</div>
            <div className="workflow-step__content">
              <h4>Generate Resources</h4>
              <p>Use generators to create ConfigMaps and Secrets dynamically.</p>
            </div>
          </div>
          
          <div className="workflow-step">
            <div className="workflow-step__number">4</div>
            <div className="workflow-step__content">
              <h4>Transform Images</h4>
              <p>Override image tags and names for different environments.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Understanding Patches</h2>
        
        <p>
          Patches are the core of Kustomize's customization capabilities. They allow you to modify specific 
          fields in your Kubernetes resources without duplicating the entire manifest.
        </p>

        <div className="commands-grid">
          <div className="command-card">
            <h4>Strategic Merge Patches</h4>
            <div className="command-list">
              <div className="command-item">
                <code>replicas: 3</code>
                <span>Override replica count</span>
              </div>
              <div className="command-item">
                <code>resources.limits.memory: "256Mi"</code>
                <span>Update resource limits</span>
              </div>
              <div className="command-item">
                <code>env[0].value: "prod"</code>
                <span>Modify environment variables</span>
              </div>
            </div>
          </div>
          
          <div className="command-card">
            <h4>JSON Patches</h4>
            <div className="command-list">
              <div className="command-item">
                <code>op: replace</code>
                <span>Replace existing value</span>
              </div>
              <div className="command-item">
                <code>op: add</code>
                <span>Add new field</span>
              </div>
              <div className="command-item">
                <code>op: remove</code>
                <span>Remove field</span>
              </div>
            </div>
          </div>
        </div>

        <div className="code-example">
          <h4>Replica Patch Example</h4>
          <pre className="code-block">
{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  replicas: 3`}
          </pre>
        </div>

        <div className="code-example">
          <h4>Resource Patch Example</h4>
          <pre className="code-block">
{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  template:
    spec:
      containers:
      - name: myapp
        resources:
          requests:
            memory: "128Mi"
            cpu: "500m"
          limits:
            memory: "256Mi"
            cpu: "1000m"`}
          </pre>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Generators and Transformers</h2>
        
        <p>
          Kustomize provides powerful generators and transformers that can create and modify resources 
          automatically based on your configuration.
        </p>

        <div className="concept-grid">
          <div className="concept-card">
            <div className="concept-card__icon">
              <Settings size={24} />
            </div>
            <h3>ConfigMapGenerator</h3>
            <p>
              Automatically generates ConfigMaps from files, literals, or environment files. Useful for 
              managing application configuration across environments.
            </p>
          </div>
          
          <div className="concept-card">
            <div className="concept-card__icon">
              <Layers size={24} />
            </div>
            <h3>SecretGenerator</h3>
            <p>
              Creates Kubernetes Secrets from files, literals, or environment files. Handles base64 encoding 
              automatically for sensitive data.
            </p>
          </div>
          
          <div className="concept-card">
            <div className="concept-card__icon">
              <Code size={24} />
            </div>
            <h3>Transformers</h3>
            <p>
              Modify resources during the build process. Common transformers include commonLabels, 
              commonAnnotations, and namespace.
            </p>
          </div>
        </div>

        <div className="code-example">
          <h4>Generator Example</h4>
          <pre className="code-block">
{`configMapGenerator:
- name: app-config
  literals:
  - DATABASE_URL=postgresql://localhost:5432/myapp
  - REDIS_URL=redis://localhost:6379
  - LOG_LEVEL=info

secretGenerator:
- name: app-secrets
  literals:
  - DB_PASSWORD=secretpassword
  - API_KEY=apikey123

generatorOptions:
  disableNameSuffixHash: false`}
          </pre>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Essential Kustomize Commands</h2>
        
        <div className="commands-grid">
          <div className="command-card">
            <h4>Build and Preview</h4>
            <div className="command-list">
              <div className="command-item">
                <code>kubectl kustomize overlay/</code>
                <span>Build and output YAML</span>
              </div>
              <div className="command-item">
                <code>kubectl apply -k overlay/</code>
                <span>Build and apply</span>
              </div>
              <div className="command-item">
                <code>kubectl diff -k overlay/</code>
                <span>Preview changes</span>
              </div>
            </div>
          </div>
          
          <div className="command-card">
            <h4>Validation</h4>
            <div className="command-list">
              <div className="command-item">
                <code>kubectl kustomize --enable-helm</code>
                <span>Enable Helm integration</span>
              </div>
              <div className="command-item">
                <code>kubectl kustomize --load-restrictor</code>
                <span>Restrict file loading</span>
              </div>
              <div className="command-item">
                <code>kubectl kustomize --enable-alpha-plugins</code>
                <span>Enable experimental features</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Advanced Features</h2>
        
        <div className="best-practices">
          <div className="practice-item practice-item--good">
            <CheckCircle size={20} />
            <div>
              <h4>Component Reuse</h4>
              <p>Use components to share common configurations across multiple overlays and avoid duplication.</p>
            </div>
          </div>
          
          <div className="practice-item practice-item--good">
            <CheckCircle size={20} />
            <div>
              <h4>Helm Integration</h4>
              <p>Kustomize can work with Helm charts, allowing you to customize Helm-generated manifests.</p>
            </div>
          </div>
          
          <div className="practice-item practice-item--good">
            <CheckCircle size={20} />
            <div>
              <h4>Variable Substitution</h4>
              <p>Use variables to reference values across different resources and maintain consistency.</p>
            </div>
          </div>
          
          <div className="practice-item practice-item--warning">
            <AlertTriangle size={20} />
            <div>
              <h4>Complex Patches</h4>
              <p>For complex transformations, consider using JSON patches or creating separate overlay directories.</p>
            </div>
          </div>
        </div>

        <div className="code-example">
          <h4>Component Example</h4>
          <pre className="code-block">
{`apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

resources:
- ../../base

components:
- ../../components/monitoring
- ../../components/logging

patches:
- path: patches/environment-patch.yaml`}
          </pre>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Best Practices</h2>
        
        <div className="best-practices">
          <div className="practice-item practice-item--good">
            <CheckCircle size={20} />
            <div>
              <h4>Keep Bases Generic</h4>
              <p>Make your base manifests as environment-agnostic as possible. Use overlays for environment-specific values.</p>
            </div>
          </div>
          
          <div className="practice-item practice-item--good">
            <CheckCircle size={20} />
            <div>
              <h4>Use Meaningful Names</h4>
              <p>Name your overlays and patches descriptively to make it clear what changes they apply.</p>
            </div>
          </div>
          
          <div className="practice-item practice-item--good">
            <CheckCircle size={20} />
            <div>
              <h4>Leverage Generators</h4>
              <p>Use ConfigMapGenerator and SecretGenerator instead of manually creating these resources.</p>
            </div>
          </div>
          
          <div className="practice-item practice-item--warning">
            <AlertTriangle size={20} />
            <div>
              <h4>Avoid Deep Nesting</h4>
              <p>Don't create deeply nested overlay structures. Keep your hierarchy simple and manageable.</p>
            </div>
          </div>
          
          <div className="practice-item practice-item--warning">
            <AlertTriangle size={20} />
            <div>
              <h4>Test Your Changes</h4>
              <p>Always use <code>kubectl diff</code> to preview changes before applying them to your cluster.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Next Steps</h2>
        
        <p>
          You now understand how to use Kustomize for template-free configuration management! In the next tutorial, 
          we'll explore Helm and learn how to create reusable application packages.
        </p>
        
        <div className="next-steps">
          <div className="next-step">
            <h4>Practice</h4>
            <p>Create a multi-environment setup with base and overlay configurations</p>
          </div>
          <div className="next-step">
            <h4>Explore</h4>
            <p>Learn about Kustomize plugins and advanced customization techniques</p>
          </div>
          <div className="next-step">
            <h4>Continue</h4>
            <p>Move on to Helm for creating reusable application packages</p>
          </div>
        </div>
      </div>
    </TutorialLayout>
  );
};

export default KustomizeTutorial;
