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

    // Delete the previous KinD cluster and create a new one
    stage('KinD Setup') {
      steps {
        sh '''
        #!/bin/bash
        set -eu

        # Delete existing cluster if any
        kind delete cluster --name devopslab || true

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

        # Sanity check
        kubectl cluster-info

        # Load local Docker images into Kind
        kind load docker-image devopslab-frontend --name devopslab
        kind load docker-image devopslab-backend --name devopslab
        kind load docker-image postgres:15-alpine --name devopslab
        '''
      }
    }

    stage('Predeploy Setup') {
      steps {
        sh '''
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
}
