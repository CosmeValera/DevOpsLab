pipeline {
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

        fi
        
        # Ensure .kube directory exists
        mkdir -p /var/jenkins_home/.kube
        # Save kubeconfig for Jenkins user
        kind get kubeconfig --name devopslab > /var/jenkins_home/.kube/config
        
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
}
