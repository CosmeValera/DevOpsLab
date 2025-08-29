import React from "react";
import { Package, Settings, Info, AlertTriangle, CheckCircle, FileText, GitBranch, Download } from "lucide-react";
import TutorialLayout from "./TutorialLayout";

const HelmTutorial: React.FC = () => {
  return (
    <TutorialLayout
      title="Creating Helm Charts"
      description="Package and distribute applications"
      level="Advanced"
      duration="60 min"
      estimatedReadingTime="35-40 minutes"
      prerequisites="Kubernetes, YAML, basic templating"
      currentTutorial="helm"
    >
      <div className="tutorial-section">
        <h2>What is Helm?</h2>
        <p>
          Helm is the package manager for Kubernetes. It simplifies the deployment and management of Kubernetes applications 
          by packaging them into charts - a collection of files that describe a related set of Kubernetes resources.
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
          A Helm chart follows a specific directory structure that organizes templates, values, and metadata 
          in a standardized way.
        </p>

        <div className="code-example">
          <h4>Chart Directory Structure</h4>
          <pre className="code-block">
{`myapp/
├── Chart.yaml          # Chart metadata
├── values.yaml         # Default values
├── charts/             # Dependencies
├── templates/          # Template files
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── configmap.yaml
│   ├── _helpers.tpl    # Template helpers
│   └── NOTES.txt       # Usage notes
└── .helmignore         # Files to ignore`}
          </pre>
        </div>

        <div className="info-box">
          <Info size={20} />
          <div>
            <h4>Best Practice</h4>
            <p>
              Use the <code>helm create</code> command to generate a new chart with the proper structure and example files. 
              This ensures you follow Helm best practices from the start.
            </p>
          </div>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Chart.yaml - Metadata</h2>
        
        <p>
          The Chart.yaml file contains metadata about your chart, including name, version, description, and dependencies.
        </p>

        <div className="code-example">
          <h4>Chart.yaml Example</h4>
          <pre className="code-block">
{`apiVersion: v2
name: myapp
description: A Helm chart for MyApp
type: application
version: 0.1.0
appVersion: "1.0.0"
keywords:
  - web
  - application
home: https://github.com/myorg/myapp
sources:
  - https://github.com/myorg/myapp
maintainers:
  - name: Your Name
    email: your.email@example.com
dependencies:
  - name: postgresql
    version: 12.x.x
    repository: https://charts.bitnami.com/bitnami`}
          </pre>
        </div>

        <div className="dockerfile-instructions">
          <h4>Key Fields</h4>
          <div className="instruction-list">
            <div className="instruction-item">
              <code>apiVersion</code>
              <span>Helm API version (v2 for Helm 3)</span>
            </div>
            <div className="instruction-item">
              <code>name</code>
              <span>Chart name (must be lowercase, no spaces)</span>
            </div>
            <div className="instruction-item">
              <code>version</code>
              <span>Chart version (semantic versioning)</span>
            </div>
            <div className="instruction-item">
              <code>appVersion</code>
              <span>Version of the application being deployed</span>
            </div>
            <div className="instruction-item">
              <code>dependencies</code>
              <span>Other charts this chart depends on</span>
            </div>
          </div>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Values.yaml - Configuration</h2>
        
        <p>
          The values.yaml file contains the default configuration values for your chart. These values can be 
          overridden during installation or upgrade.
        </p>

        <div className="code-example">
          <h4>values.yaml Example</h4>
          <pre className="code-block">
{`# Default values for myapp
replicaCount: 1

image:
  repository: nginx
  pullPolicy: IfNotPresent
  tag: ""

imagePullSecrets: []
nameOverride: ""
fullnameOverride: ""

serviceAccount:
  create: true
  annotations: {}
  name: ""

podAnnotations: {}

podSecurityContext: {}

securityContext: {}

service:
  type: ClusterIP
  port: 80

ingress:
  enabled: false
  className: ""
  annotations: {}
  hosts:
    - host: chart-example.local
      paths:
        - path: /
          pathType: ImplementationSpecific
  tls: []

resources:
  limits:
    cpu: 100m
    memory: 128Mi
  requests:
    cpu: 100m
    memory: 128Mi

autoscaling:
  enabled: false
  minReplicas: 1
  maxReplicas: 100
  targetCPUUtilizationPercentage: 80

nodeSelector: {}

tolerations: []

affinity: {}`}
          </pre>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Templates - The Heart of Helm</h2>
        
        <p>
          Templates are Kubernetes manifest files with embedded Go template syntax. They allow you to create 
          dynamic, configurable Kubernetes resources.
        </p>

        <div className="code-example">
          <h4>Deployment Template Example</h4>
          <pre className="code-block">
{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include "myapp.fullname" . }}
  labels:
    {{- include "myapp.labels" . | nindent 4 }}
spec:
  {{- if not .Values.autoscaling.enabled }}
  replicas: {{ .Values.replicaCount }}
  {{- end }}
  selector:
    matchLabels:
      {{- include "myapp.selectorLabels" . | nindent 6 }}
  template:
    metadata:
      labels:
        {{- include "myapp.selectorLabels" . | nindent 8 }}
    spec:
      containers:
        - name: {{ .Chart.Name }}
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag | default .Chart.AppVersion }}"
          imagePullPolicy: {{ .Values.image.pullPolicy }}
          ports:
            - name: http
              containerPort: 80
              protocol: TCP
          resources:
            {{- toYaml .Values.resources | nindent 12 }}`}
          </pre>
        </div>

        <div className="dockerfile-instructions">
          <h4>Template Functions</h4>
          <div className="instruction-list">
            <div className="instruction-item">
              <code>{`{{ .Values.field }}`}</code>
              <span>Access values from values.yaml</span>
            </div>
            <div className="instruction-item">
              <code>{`{{ include "helper" . }}`}</code>
              <span>Include helper templates</span>
            </div>
            <div className="instruction-item">
              <code>{`{{- if condition }}`}</code>
              <span>Conditional blocks</span>
            </div>
            <div className="instruction-item">
              <code>{`{{ toYaml .Values.data }}`}</code>
              <span>Convert to YAML</span>
            </div>
            <div className="instruction-item">
              <code>{`{{ nindent 4 }}`}</code>
              <span>Add indentation</span>
            </div>
          </div>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Helper Templates</h2>
        
        <p>
          Helper templates (_helpers.tpl) contain reusable template functions that can be called from other templates. 
          They help reduce duplication and maintain consistency.
        </p>

        <div className="code-example">
          <h4>_helpers.tpl Example</h4>
          <pre className="code-block">
{`{{/*
Expand the name of the chart.
*/}}
{{- define "myapp.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
*/}}
{{- define "myapp.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "myapp.labels" -}}
helm.sh/chart: {{ include "myapp.chart" . }}
{{ include "myapp.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}`}
          </pre>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Essential Helm Commands</h2>
        
        <div className="commands-grid">
          <div className="command-card">
            <h4>Chart Development</h4>
            <div className="command-list">
              <div className="command-item">
                <code>helm create myapp</code>
                <span>Create new chart</span>
              </div>
              <div className="command-item">
                <code>helm lint myapp</code>
                <span>Validate chart</span>
              </div>
              <div className="command-item">
                <code>helm package myapp</code>
                <span>Package chart</span>
              </div>
              <div className="command-item">
                <code>helm template myapp</code>
                <span>Render templates</span>
              </div>
            </div>
          </div>
          
          <div className="command-card">
            <h4>Chart Installation</h4>
            <div className="command-list">
              <div className="command-item">
                <code>helm install myapp ./myapp</code>
                <span>Install chart</span>
              </div>
              <div className="command-item">
                <code>helm upgrade myapp ./myapp</code>
                <span>Upgrade release</span>
              </div>
              <div className="command-item">
                <code>helm rollback myapp 1</code>
                <span>Rollback release</span>
              </div>
              <div className="command-item">
                <code>helm uninstall myapp</code>
                <span>Uninstall release</span>
              </div>
            </div>
          </div>
          
          <div className="command-card">
            <h4>Repository Management</h4>
            <div className="command-list">
              <div className="command-item">
                <code>helm repo add bitnami</code>
                <span>Add repository</span>
              </div>
              <div className="command-item">
                <code>helm repo update</code>
                <span>Update repositories</span>
              </div>
              <div className="command-item">
                <code>helm search repo</code>
                <span>Search charts</span>
              </div>
              <div className="command-item">
                <code>helm repo list</code>
                <span>List repositories</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Dependencies and Charts</h2>
        
        <p>
          Helm charts can depend on other charts, allowing you to compose complex applications from smaller, 
          reusable components.
        </p>

        <div className="workflow-steps">
          <div className="workflow-step">
            <div className="workflow-step__number">1</div>
            <div className="workflow-step__content">
              <h4>Define Dependencies</h4>
              <p>Add dependencies to your Chart.yaml file with version constraints.</p>
            </div>
          </div>
          
          <div className="workflow-step">
            <div className="workflow-step__number">2</div>
            <div className="workflow-step__content">
              <h4>Update Dependencies</h4>
              <p>Run <code>helm dependency update</code> to download and update dependencies.</p>
            </div>
          </div>
          
          <div className="workflow-step">
            <div className="workflow-step__number">3</div>
            <div className="workflow-step__content">
              <h4>Build Chart</h4>
              <p>Dependencies are included when you package or install the chart.</p>
            </div>
          </div>
        </div>

        <div className="code-example">
          <h4>Dependencies Example</h4>
          <pre className="code-block">
{`dependencies:
  - name: postgresql
    version: 12.x.x
    repository: https://charts.bitnami.com/bitnami
    condition: postgresql.enabled
  - name: redis
    version: 17.x.x
    repository: https://charts.bitnami.com/bitnami
    condition: redis.enabled`}
          </pre>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Best Practices</h2>
        
        <div className="best-practices">
          <div className="practice-item practice-item--good">
            <CheckCircle size={20} />
            <div>
              <h4>Use Semantic Versioning</h4>
              <p>Follow semantic versioning (MAJOR.MINOR.PATCH) for your chart versions to indicate compatibility.</p>
            </div>
          </div>
          
          <div className="practice-item practice-item--good">
            <CheckCircle size={20} />
            <div>
              <h4>Provide Sensible Defaults</h4>
              <p>Set reasonable default values in values.yaml that work for most common use cases.</p>
            </div>
          </div>
          
          <div className="practice-item practice-item--good">
            <CheckCircle size={20} />
            <div>
              <h4>Use Helper Templates</h4>
              <p>Create reusable helper templates to reduce duplication and maintain consistency across your templates.</p>
            </div>
          </div>
          
          <div className="practice-item practice-item--warning">
            <AlertTriangle size={20} />
            <div>
              <h4>Validate Your Charts</h4>
              <p>Always run <code>helm lint</code> and <code>helm template</code> to validate your charts before packaging.</p>
            </div>
          </div>
          
          <div className="practice-item practice-item--warning">
            <AlertTriangle size={20} />
            <div>
              <h4>Document Your Values</h4>
              <p>Add comments to your values.yaml file to explain what each value does and provide usage examples.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Advanced Features</h2>
        
        <div className="concept-grid">
          <div className="concept-card">
            <div className="concept-card__icon">
              <FileText size={24} />
            </div>
            <h3>Hooks</h3>
            <p>
              Pre-install, post-install, pre-upgrade, and post-upgrade hooks allow you to run jobs before or after 
              chart operations.
            </p>
          </div>
          
          <div className="concept-card">
            <div className="concept-card__icon">
              <Download size={24} />
            </div>
            <h3>Chart Repositories</h3>
            <p>
              Publish your charts to repositories like Helm Hub, Artifact Hub, or private repositories for 
              easy distribution and installation.
            </p>
          </div>
          
          <div className="concept-card">
            <div className="concept-card__icon">
              <Settings size={24} />
            </div>
            <h3>Plugins</h3>
            <p>
              Extend Helm functionality with plugins for additional commands, validation, or integration with 
              external tools.
            </p>
          </div>
        </div>
      </div>

      <div className="tutorial-section">
        <h2>Next Steps</h2>
        
        <p>
          You now understand how to create and manage Helm charts! In the next tutorial, we'll explore Jenkins 
          and learn how to automate your CI/CD pipelines.
        </p>
        
        <div className="next-steps">
          <div className="next-step">
            <h4>Practice</h4>
            <p>Create a Helm chart for a simple web application with multiple environments</p>
          </div>
          <div className="next-step">
            <h4>Explore</h4>
            <p>Learn about Helm hooks, plugins, and advanced templating techniques</p>
          </div>
          <div className="next-step">
            <h4>Continue</h4>
            <p>Move on to Jenkins for CI/CD automation</p>
          </div>
        </div>
      </div>
    </TutorialLayout>
  );
};

export default HelmTutorial;
