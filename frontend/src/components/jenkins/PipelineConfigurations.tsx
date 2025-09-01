import React, { useState } from "react";
import { FileText, Terminal } from "lucide-react";

const PipelineConfigurations: React.FC = () => {
  const [activeTab, setActiveTab] = useState("master");

  const pipelineConfigs = {
    master: {
      name: "Master Pipeline",
      description: "Orchestrates all deployment pipelines in sequence",
      jenkinsfile: `pipeline {
    agent any
    
    stages {
        stage('Docker') {
            steps {
                build job: 'DockerPipeline'
            }
        }
        stage('Kubernetes') {
            steps {
                build job: 'KubernetesPipeline'
            }
        }
        stage('Kustomize') {
            steps {
                build job: 'KustomizePipeline'
            }
        }
        stage('Helm') {
            steps {
                build job: 'HelmPipeline'
            }
        }
    }
}`
    },
    docker: {
      name: "Docker Pipeline",
      description: "Builds and deploys services using Docker containers",
      jenkinsfile: `pipeline {
    agent any

    stages {
        stage('Clean Up Old Services') {
            steps {
                sh '''
                docker rmi -f devopslab-frontend
                docker rm -f frontend-in-jenkins
                docker rmi -f devopslab-backend
                docker rm -f backend-in-jenkins
                '''
            }
        }

        stage('Build Images and Start Services') {
            steps {
                sh '''
                docker build -t devopslab-frontend ./frontend
                docker run -d --name frontend-in-jenkins -p 4000:3000 devopslab-frontend
                docker build -t devopslab-backend ./backend
                docker run -d --name backend-in-jenkins -p 4001:3001 devopslab-backend
                '''
            }
        }

        stage('Check Services') {
            steps {
                sh '''
                docker ps
                '''
            }
        }
    }
}`
    },
    k8s: {
      name: "Kubernetes Pipeline",
      description: "Deploys services to Kubernetes cluster using KinD",
      jenkinsfile: `pipeline {
  agent any

  stages {
    stage('Clean Up Old Services') {
      steps {
        sh '''
        docker rmi -f devopslab-frontend || true
        docker rmi -f devopslab-backend || true
        '''
      }
    }

    stage('Build Images') {
      steps {
        sh '''
        docker build -t devopslab-frontend ./frontend
        docker build -t devopslab-backend ./backend
        '''
      }
    }

    // Check if KinD cluster exists and create if needed
    stage('KinD Setup') {
      steps {
        sh '''
        #!/bin/bash
        set -eu

        # Check if cluster exists
        if kind get clusters | grep -q "devopslab"; then
          ######################################
          ####### CASE 1: CLUSTER EXISTS #######
          ######################################
          echo "Cluster 'devopslab' already exists, skipping creation..."
          
          # Get kubeconfig for existing cluster
          kind get kubeconfig --name devopslab > /var/jenkins_home/.kube/config
          
        else
          ##############################################
          ####### CASE 2: CLUSTER DOES NOT EXIST #######
          ##############################################
          echo "Cluster 'devopslab' does not exist, creating new cluster..."
          
          # Create Kind config YAML
          cat > kind-config.yaml <<EOF
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
  - role: control-plane
EOF

          # Create the cluster
          kind create cluster --name devopslab --config kind-config.yaml

          # Save kubeconfig for Jenkins user
          kind get kubeconfig --name devopslab > /var/jenkins_home/.kube/config

        fi
        
        # Load all Docker images into new Kind cluster
        echo "Loading images into new cluster..."
        kind load docker-image devopslab-frontend --name devopslab
        kind load docker-image devopslab-backend --name devopslab
        kind load docker-image postgres:15-alpine --name devopslab

        # Sanity check
        kubectl cluster-info
        '''
      }
    }

    stage('Predeploy Setup') {
      steps {
        sh '''
        # Delete namespace if it exists (to clean up previous deployments)
        kubectl delete namespace devopslab --ignore-not-found=true
        
        # Wait a moment for cleanup
        sleep 5
        
        # Predeploy commands
        kubectl apply -f deployments/k8s/namespace.yaml
        kubectl create configmap postgres-init-script --from-file=init.sql=./db/init.sql -n devopslab --dry-run=client -o yaml | kubectl apply -f -
        '''
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        sh '''
        kubectl apply -f deployments/k8s/frontend/
        kubectl apply -f deployments/k8s/backend/
        kubectl apply -f deployments/k8s/database/
        '''
      }
    }

    stage('Check Deployment') {
      steps {
        sh 'kubectl get all,configmap -n devopslab'
      }
    }
  }
}`
    },
    kustomize: {
      name: "Kustomize Pipeline",
      description: "Deploys services using Kustomize for environment-specific configurations",
      jenkinsfile: `pipeline {
  agent any

  stages {
    stage('Clean Up Old Services') {
      steps {
        sh '''
        docker rmi -f devopslab-frontend || true
        docker rmi -f devopslab-backend || true
        '''
      }
    }

    stage('Build Images') {
      steps {
        sh '''
        docker build -t devopslab-frontend ./frontend
        docker build -t devopslab-backend ./backend
        '''
      }
    }

    // Check if KinD cluster exists and create if needed
    stage('KinD Setup') {
      steps {
        sh '''
        #!/bin/bash
        set -eu

        # Check if cluster exists
        if kind get clusters | grep -q "devopslab"; then
          ######################################
          ####### CASE 1: CLUSTER EXISTS #######
          ######################################
          echo "Cluster 'devopslab' already exists, skipping creation..."
          
          # Get kubeconfig for existing cluster
          kind get kubeconfig --name devopslab > /var/jenkins_home/.kube/config
          
        else
          ##############################################
          ####### CASE 2: CLUSTER DOES NOT EXIST #######
          ##############################################
          echo "Cluster 'devopslab' does not exist, creating new cluster..."
          
          # Create Kind config YAML
          cat > kind-config.yaml <<EOF
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
  - role: control-plane
EOF

          # Create the cluster
          kind create cluster --name devopslab --config kind-config.yaml

          # Save kubeconfig for Jenkins user
          kind get kubeconfig --name devopslab > /var/jenkins_home/.kube/config

        fi
        
        # Load all Docker images into new Kind cluster
        echo "Loading images into new cluster..."
        kind load docker-image devopslab-frontend --name devopslab
        kind load docker-image devopslab-backend --name devopslab
        kind load docker-image postgres:15-alpine --name devopslab

        # Sanity check
        kubectl cluster-info
        '''
      }
    }

    stage('Predeploy Setup') {
      steps {
        sh '''
        # Delete namespace if it exists (to clean up previous deployments)
        kubectl delete namespace devopslab --ignore-not-found=true
        
        # Wait a moment for cleanup
        sleep 5
        
        # Predeploy commands
        kubectl apply -f deployments/k8s/namespace.yaml
        kubectl create configmap postgres-init-script --from-file=init.sql=./db/init.sql -n devopslab --dry-run=client -o yaml | kubectl apply -f -
        '''
      }
    }

    stage('Deploy with Kustomize') {
      steps {
        sh '''
        kubectl apply -k deployments/kustomize/overlays/dev
        '''
      }
    }

    stage('Check Deployment') {
      steps {
        sh 'kubectl get all,configmap -n devopslab'
      }
    }
  }
}`
    },
    helm: {
      name: "Helm Pipeline",
      description: "Deploys services using Helm charts for Kubernetes",
      jenkinsfile: `pipeline {
  agent any

  stages {
    stage('Clean Up Old Services') {
      steps {
        sh '''
        docker rmi -f devopslab-frontend || true
        docker rmi -f devopslab-backend || true
        '''
      }
    }

    stage('Build Images') {
      steps {
        sh '''
        docker build -t devopslab-frontend ./frontend
        docker build -t devopslab-backend ./backend
        '''
      }
    }

    // Check if KinD cluster exists and create if needed
    stage('KinD Setup') {
      steps {
        sh '''
        #!/bin/bash
        set -eu

        # Check if cluster exists
        if kind get clusters | grep -q "devopslab"; then
          ######################################
          ####### CASE 1: CLUSTER EXISTS #######
          ######################################
          echo "Cluster 'devopslab' already exists, skipping creation..."
          
          # Get kubeconfig for existing cluster
          kind get kubeconfig --name devopslab > /var/jenkins_home/.kube/config
          
        else
          ##############################################
          ####### CASE 2: CLUSTER DOES NOT EXIST #######
          ##############################################
          echo "Cluster 'devopslab' does not exist, creating new cluster..."
          
          # Create Kind config YAML
          cat > kind-config.yaml <<EOF
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
  - role: control-plane
EOF

          # Create the cluster
          kind create cluster --name devopslab --config kind-config.yaml

          # Save kubeconfig for Jenkins user
          kind get kubeconfig --name devopslab > /var/jenkins_home/.kube/config

        fi
        
        # Load all Docker images into new Kind cluster
        echo "Loading images into new cluster..."
        kind load docker-image devopslab-frontend --name devopslab
        kind load docker-image devopslab-backend --name devopslab
        kind load docker-image postgres:15-alpine --name devopslab

        # Sanity check
        kubectl cluster-info
        '''
      }
    }

    stage('Predeploy Setup') {
      steps {
        sh '''
        # Delete namespace if it exists (to clean up previous deployments)
        kubectl delete namespace devopslab --ignore-not-found=true
        
        # Wait a moment for cleanup
        sleep 5
        
        # Predeploy commands
        kubectl apply -f deployments/k8s/namespace.yaml
        kubectl create configmap postgres-init-script --from-file=init.sql=./db/init.sql -n devopslab --dry-run=client -o yaml | kubectl apply -f -
        '''
      }
    }

    stage('Deploy with Helm') {
      steps {
        sh '''
        helm upgrade --install devopslab ./deployments/helm/devopslab -f ./deployments/helm/devopslab/values-dev.yaml
        '''
      }
    }

    stage('Check Deployment') {
      steps {
        sh 'kubectl get all,configmap -n devopslab'
      }
    }
  }
}`
    }
  };

  return (
    <div className="jenkins-section">
      <div className="section-header">
        <h2 className="section-title">
          <FileText size={20} />
          Pipeline Configurations
        </h2>
        <p className="section-description">
          Explore different pipeline configurations for each deployment type
        </p>
      </div>

      <div className="pipeline-configs-card">
        <div className="pipeline-configs-card__header">
          <div className="pipeline-configs-card__icon">
            <Terminal size={24} />
          </div>
          <div className="pipeline-configs-card__title">
            <h3>Pipeline as Code</h3>
            <p>Declarative pipelines for complete automation</p>
          </div>
        </div>

        <div className="pipeline-configs-card__content">
          <div className="pipeline-tabs">
            <div className="pipeline-tabs__header">
              {Object.entries(pipelineConfigs).map(([key, config]) => (
                <button
                  key={key}
                  className={`pipeline-tab ${activeTab === key ? 'pipeline-tab--active' : ''}`}
                  onClick={() => setActiveTab(key)}
                >
                  {config.name}
                </button>
              ))}
            </div>

            <div className="pipeline-tabs__content">
              <div className="pipeline-config">
                <div className="pipeline-config__header">
                  <h4>{pipelineConfigs[activeTab as keyof typeof pipelineConfigs].name}</h4>
                  <p>{pipelineConfigs[activeTab as keyof typeof pipelineConfigs].description}</p>
                </div>
                <div className="pipeline-config__jenkinsfile">
                  <h5>Jenkinsfile:</h5>
                  <pre className="code-block">
                    {pipelineConfigs[activeTab as keyof typeof pipelineConfigs].jenkinsfile}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PipelineConfigurations;
