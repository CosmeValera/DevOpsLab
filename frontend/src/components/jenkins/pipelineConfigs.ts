export type Stage = 
  | { name: string; type: "build"; job: string }
  | { name: string; type: "sh"; command: string };

export const pipelineConfigs: Record<string, {
  name: string;
  description: string;
  stages: Stage[];
}> = {
    master: {
      name: "Master Pipeline",
      description: "Orchestrates all deployment types by triggering individual pipelines",
      stages: [
        { name: "Docker", type: "build", job: "DockerPipeline" },
        { name: "Kubernetes", type: "build", job: "KubernetesPipeline" },
        { name: "Kustomize", type: "build", job: "KustomizePipeline" },
        { name: "Helm", type: "build", job: "HelmPipeline" }
      ]
    },
    docker: {
       name: "Docker Pipeline",
       description: "Container-based deployment workflow with cleanup and service management",
       stages: [
         { 
           name: "Clean Up Old Services", 
           type: "sh", 
           command: `
                docker rmi -f devopslab-frontend
                docker rm -f frontend
                docker rmi -f devopslab-backend
                docker rm -f backend
                `
         },
         { 
           name: "Build Images and Start Services", 
           type: "sh", 
           command: `
                docker build -t devopslab-frontend ./frontend
                docker run -d --name frontend -p 3000:3000 devopslab-frontend
                docker build -t devopslab-backend ./backend
                docker run -d --name backend -p 3001:3001 devopslab-backend
                `
         },
         { name: "Check Services", type: "sh", command: `
                docker ps
                ` }
       ]
    },
    kubernetes: {
       name: "Kubernetes Pipeline",
       description: "Native K8s orchestration with KinD cluster setup and deployment",
       stages: [
         { 
           name: "Clean Up Old Services", 
           type: "sh", 
           command: `
                docker rmi -f devopslab-frontend || true
                docker rmi -f devopslab-backend || true
                `
         },
         { 
           name: "Build Images", 
           type: "sh", 
           command: `
                docker build -t devopslab-frontend ./frontend
                docker build -t devopslab-backend ./backend
                `
         },
         { 
           name: "KinD Setup", 
           type: "sh", 
           command: `
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
                `
         },
         { 
           name: "Predeploy Setup", 
           type: "sh", 
           command: `
                # Predeploy commands
                kubectl apply -f deployments/k8s/namespace.yaml
                kubectl create configmap postgres-init-script --from-file=init.sql=./db/init.sql -n devopslab --dry-run=client -o yaml | kubectl apply -f -
                `
         },
         { 
           name: "Deploy to Kubernetes", 
           type: "sh", 
           command: `
                kubectl apply -f deployments/k8s/frontend/
                kubectl apply -f deployments/k8s/backend/
                kubectl apply -f deployments/k8s/database/
                `
         },
         { name: "Check Deployment", type: "sh", command: "kubectl get all,configmap -n devopslab" }
       ]
     }, 
    kustomize: {
      name: "Kustomize Pipeline",
      description: "Kustomize-based deployment workflow with environment-specific configurations",
      stages: [
        { 
          name: "Clean Up Old Services", 
          type: "sh", 
          command: `
                docker rmi -f devopslab-frontend || true
                docker rmi -f devopslab-backend || true
                `
        },
        { 
          name: "Build Images", 
          type: "sh", 
          command: `
                docker build -t devopslab-frontend ./frontend
                docker build -t devopslab-backend ./backend
                `
        },
        { 
          name: "KinD Setup", 
          type: "sh", 
          command: `
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
                `
        },
        { 
          name: "Predeploy Setup", 
          type: "sh", 
          command: `
                # Predeploy commands
                kubectl apply -f deployments/k8s/namespace.yaml
                kubectl create configmap postgres-init-script --from-file=init.sql=./db/init.sql -n devopslab --dry-run=client -o yaml | kubectl apply -f -
                `
        },
        { name: "Deploy with Kustomize", type: "sh", command: "kubectl apply -k deployments/kustomize/overlays/dev" },
        { name: "Check Deployment", type: "sh", command: "kubectl get all,configmap -n devopslab" }
      ]
    },
    helm: {
       name: "Helm Pipeline",
       description: "Chart-based deployment workflow with KinD cluster and Helm charts",
       stages: [
         { 
           name: "Clean Up Old Services", 
           type: "sh", 
           command: `
                docker rmi -f devopslab-frontend || true
                docker rmi -f devopslab-backend || true
                `
         },
         { 
           name: "Build Images", 
           type: "sh", 
           command: `
                docker build -t devopslab-frontend ./frontend
                docker build -t devopslab-backend ./backend
                `
         },
         { 
           name: "KinD Setup", 
           type: "sh", 
           command: `
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
                `
         },
         { 
           name: "Predeploy Setup", 
           type: "sh", 
           command: `
                # Predeploy commands
                kubectl apply -f deployments/k8s/namespace.yaml
                kubectl create configmap postgres-init-script --from-file=init.sql=./db/init.sql -n devopslab --dry-run=client -o yaml | kubectl apply -f -
                `
         },
         { name: "Deploy with Helm", type: "sh", command: "helm install devopslab ./deployments/helm/devopslab -f ./deployments/helm/devopslab/values-dev.yaml" },
         { name: "Check Deployment", type: "sh", command: "kubectl get all,configmap -n devopslab" }
       ]
     }
  };
