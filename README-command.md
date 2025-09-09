
## 🐳 Docker Deployment

### Prerequisites
- Docker
- Docker Compose

### Quick Start with Docker Compose

```bash
# Clone the repository
git clone https://github.com/CosmeValera/devopslab
cd devopslab

# Start all services
docker-compose up -d

## You should be able to access:
##
## Frontend: localhost:3000
## Backend:  localhost:3001
## Jenkins:  localhost:8080

# Stop services
docker-compose down

# Check service status
docker-compose ps

# View logs
docker-compose logs -f
```

### Docker Commands

```bash
# Build images
docker build -t devopslab-frontend ./frontend
docker build -t devopslab-backend ./backend
docker build --build-arg DOCKER_GID=$(getent group docker | cut -d: -f3) -t devopslab-jenkins ./jenkins

# Run containers
docker run -d --name backend -p 3001:3001 devopslab-backend
docker run -d --name frontend -p 3000:3000 devopslab-frontend
docker run -d --name jenkins --network host -e JENKINS_OPTS=--httpPort=8080 --restart=on-failure -v jenkins_home:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock devopslab-jenkins

# Delete images
docker rmi -f devopslab-frontend devopslab-backend devopslab-jenkins
docker image prune -f
```

## ☸️ Kubernetes Deployment

### Prerequisites
- kubectl
- Kubernetes cluster (minikube, kind, or cloud provider)

### Start Minikube and Load images
```bash
# Load images 
docker build -t devopslab-frontend ./frontend
docker build -t devopslab-backend ./backend

# Start minikube (if using local cluster)
minikube start

# Load the images inside Minikube
minikube image load devopslab-frontend
minikube image load devopslab-backend

minikube ssh -- docker images # Check
```

### Predeploy command

```bash
# Create namespace.yaml
kubectl apply -f deployments/k8s/namespace.yaml
```

### Deploy to Kubernetes

```bash
# Apply all Kubernetes manifests
kubectl apply -f deployments/k8s/backend/ -f deployments/k8s/frontend/

# Check deployment status
kubectl get all -n devopslab

# Delete deployment
kubectl delete all --all -n devopslab

# Access the application
kubectl port-forward svc/frontend-service 3000:80 -n devopslab
kubectl port-forward svc/backend-service 3001:80 -n devopslab

# View logs
kubectl logs -f deployment/frontend -n devopslab
kubectl logs -f deployment/backend -n devopslab
```

## 🔧 Kustomize Deployment

### Prerequisites
- kubectl
- Kustomize (optional, kubectl has built-in support)

### First steps

> Remember to start Miniikube and load the images into Minikube in case you haven't yet (you can find how in the `☸️ Kubernetes Deployment (Vanilla)` section).


### Predeploy command

```bash
# Create namespace.yaml
kubectl apply -f deployments/k8s/namespace.yaml
```

### Deploy with Kustomize

```bash
# Deploy to development environment
kubectl apply -k deployments/kustomize/overlays/dev

# Deploy to production environment
kubectl apply -k deployments/kustomize/overlays/prod

# Build manifests without applying
kubectl kustomize deployments/kustomize/overlays/dev

# Delete deployment
kubectl delete -k deployments/kustomize/overlays/dev
kubectl delete -k deployments/kustomize/overlays/prod

# Check k8s manifests
kubectl get all,configmap -n devopslab

# Access the application
kubectl port-forward svc/frontend-service 3000:80 -n devopslab
kubectl port-forward svc/backend-service 3001:80 -n devopslab

```

## 🎯 Helm Deployment

### Prerequisites
- Helm 3.x
- Kubernetes cluster

### First steps

> Remember to start Miniikube and load the images into Minikube in case you haven't yet (you can find how in the `☸️ Kubernetes Deployment (Vanilla)` section).

### Predeploy command

```bash
# Create namespace.yaml
kubectl apply -f deployments/k8s/namespace.yaml
```

### Deploy with Helm

```bash
# Install the application
helm install devopslab ./deployments/helm/devopslab -f ./deployments/helm/devopslab/values-dev.yaml
helm install devopslab ./deployments/helm/devopslab -f ./deployments/helm/devopslab/values-prod.yaml

# Upgrade deployment
helm upgrade devopslab ./deployments/helm/devopslab -f ./deployments/helm/devopslab/values-prod.yaml

# Uninstall
helm uninstall devopslab

# Check deployment status
helm list
kubectl get all -n devopslab

# Check k8s manifests
kubectl get all,configmap -n devopslab
```

### Custom Values

```bash
# Use a values file
helm install devopslab ./deployments/helm/devopslab -f custom-values.yaml

# Or install with custom values
helm install devopslab ./deployments/helm/devopslab \
  --set replicaCount=3
```

### Access the application
**Method 1: Access with minikube tunnel**
```bash
# Enable the ingress addon and start the tunnel
minikube addons enable ingress
minikube tunnel

# Note: Keep this terminal running throughout your session
# The tunnel may prompt for your WSL password
# Deploy your application after starting the tunnel

# Once running, you can access:
# - Frontend: http://localhost
# - Backend API: http://localhost/api
```

**Method 2: Use port-forward**
```bash
kubectl port-forward svc/frontend-service 3000:80 -n devopslab
kubectl port-forward svc/backend-service 3001:80 -n devopslab

# Once running, you can access:
# - Frontend: http://localhost:3000
# - Backend API: http://localhost:3001
```

## 🔄 Jenkins CI/CD Pipeline

### Prerequisites
- Docker

### Start Jenkins in Docker

```bash
# Start Build and start Jenkins container
docker build --build-arg DOCKER_GID=$(getent group docker | cut -d: -f3) -t devopslab-jenkins ./jenkins
docker run -d --name jenkins --network host -e JENKINS_OPTS=--httpPort=8080 --restart=on-failure -v jenkins_home:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock devopslab-jenkins

# Get initial admin password
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword

# Create the .env file for the backend, so that the pipeline status page in the frontend can work
echo -e "JENKINS_HOST=http://localhost:8080\nJENKINS_USER=admin\nJENKINS_TOKEN=$(docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword)\nPORT=3001\nNODE_ENV=development" > backend/.env
```

### Setup Jenkins Pipeline

1. Open `http://localhost:8080` in your browser
2. Install suggested plugins
3. Create admin user
4. Create a new Pipeline job
5. Configure the pipeline to use the Jenkinsfile from the repository

### Pipeline Features

The Jenkins pipeline includes:

1. **Build Stage:** Install dependencies and run tests
2. **Test Stage:** Execute unit and integration tests
3. **Build Images Stage:** Build Docker images
4. **Deploy Stage:** Deploy to local Docker environment
5. **Cleanup Stage:** Clean up old images

## 🔗 Documentation Links

- [Docker Documentation](https://docs.docker.com/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Helm Documentation](https://helm.sh/docs/)
- [Kustomize Documentation](https://kustomize.io/)
- [Jenkins Documentation](https://www.jenkins.io/doc/)
