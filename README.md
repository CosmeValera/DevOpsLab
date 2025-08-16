# DevOpsLab - DevOps Portfolio Showcase

A comprehensive demonstration of modern DevOps practices including Docker, Kubernetes, and CI/CD pipelines. This project showcases deployment strategies from containerization to production-ready orchestration.

## 🏗️ Project Architecture

This showcase demonstrates a complete DevOps workflow from development to production.

### Technology Stack

- **Frontend:** React + TypeScript + Vite
- **Backend:** Node.js + Express + TypeScript  
- **Database:** PostgreSQL
- **Containerization:** Docker & Docker Compose
- **Orchestration:** Kubernetes
- **Templating:** Helm
- **Configuration Management:** Kustomize
- **CI/CD:** Jenkins
- **Testing:** Vitest (frontend & backend)
- **Linting:** Standard

## 🚀 Quick Start

Get the project running locally:

```bash
git clone https://github.com/cosmevalera/devopslab
cd devopslab
docker-compose up -d
```

Visit `http://localhost:3000` to see the application running.

> To access the jenkins password execute: `docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword`

## 📁 Project Structure

```
devopslab/
├── frontend/                 # React + TypeScript + Vite app
├── backend/                  # Node.js + Express + TypeScript API
├── db/                       # Database setup scripts & seeds
├── deployments/
│   ├── docker/              # Docker Compose & Dockerfiles
│   ├── k8s/                 # Raw Kubernetes manifests
│   ├── helm/                # Helm charts
│   └── kustomize/           # Kustomize overlays
├── jenkins/                 # Jenkins pipeline setup
└── README.md               # This file
```

## 🐳 Docker Deployment

### Prerequisites
- Docker
- Docker Compose

### Quick Start with Docker Compose

```bash
# Clone the repository
git clone https://github.com/yourusername/devopslab
cd devopslab

# Start all services
docker-compose up -d

# Stop services
docker-compose down

# Check service status
docker-compose ps

# View logs
docker-compose logs -f
```

### Manual Docker Commands

```bash
# Build images
docker build -t devopslab-frontend ./frontend
docker build -t devopslab-backend ./backend

# Run containers
docker run -d --name postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=devopslab postgres:15
docker run -d --name backend --link postgres -p 3001:3001 devopslab-backend
docker run -d --name frontend -p 3000:3000 devopslab-frontend

# Delete images
docker rmi -f devopslab-frontend devopslab-backend devopslab-jenkins postgres:15-alpine
docker image prune -f
```

## ☸️ Kubernetes Deployment (Vanilla)

### Prerequisites
- kubectl
- Kubernetes cluster (minikube, kind, or cloud provider)

### Predeploy commands

```bash
# Create namespace.yaml
kubectl apply -f deployments/k8s/namespace.yaml

# Create the Postgres init ConfigMap for the database
kubectl create configmap postgres-init-script --from-file=init.sql=./db/init.sql -n devopslab
```

### Deploy to Kubernetes

```bash
# Start minikube (if using local cluster)
minikube start

# Load the images inside Minikube
minikube image load devopslab-frontend
minikube image load devopslab-jenkins
minikube image load devopslab-backend
minikube image load postgres:15-alpine

minikube ssh -- docker images # Check

# Apply all Kubernetes manifests
kubectl apply -f deployments/k8s/backend/ -f deployments/k8s/database/ -f deployments/k8s/frontend/

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


### Predeploy commands

```bash
# Create namespace.yaml
kubectl apply -f deployments/k8s/namespace.yaml

# Create the Postgres init ConfigMap for the database
kubectl create configmap postgres-init-script --from-file=init.sql=./db/init.sql -n devopslab
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

### Predeploy commands

```bash
# Create namespace.yaml
kubectl apply -f deployments/k8s/namespace.yaml

# Create the Postgres init ConfigMap for the database
kubectl create configmap postgres-init-script --from-file=init.sql=./db/init.sql -n devopslab
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

# Access the application
kubectl port-forward svc/frontend-service 3000:80 -n devopslab
kubectl port-forward svc/backend-service 3001:80 -n devopslab
```

### Custom Values

```bash
# Use a values file
helm install devopslab ./deployments/helm/devopslab -f custom-values.yaml

# Install with custom values
helm install devopslab ./deployments/helm/devopslab \
  --set replicaCount=3
```

### Environment-Specific Configurations

Each environment has its own overlay with specific configurations:

- **dev:** Single replica, development database
- **staging:** Multiple replicas, staging database
- **prod:** High availability, production database with persistence

## 🔄 Jenkins CI/CD Pipeline

### Prerequisites
- Docker

### Start Jenkins in Docker

```bash
# Start Jenkins container
docker run -d \
  --name jenkins \
  -p 8080:8080 \
  -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  jenkins/jenkins:lts

# Get initial admin password
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
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

### Manual Pipeline Execution

```bash
# Run pipeline locally (if you have Jenkins CLI)
jenkins-cli.jar build devopslab-pipeline

# Or trigger via webhook
curl -X POST http://localhost:8080/job/devopslab-pipeline/build
```

## 🧪 Testing

### Frontend Tests

```bash
cd frontend
npm test
```

### Backend Tests

```bash
cd backend
npm test
```

### Integration Tests

```bash
# Run with Docker Compose
docker-compose -f docker-compose.test.yml up --abort-on-container-exit
```

## 🔧 Development

### Local Development Setup

```bash
# Install dependencies
cd frontend && npm install
cd ../backend && npm install

# Start database
docker run -d --name postgres-dev -e POSTGRES_PASSWORD=password -e POSTGRES_DB=devopslab postgres:15

# Start backend (in backend directory)
npm run dev

# Start frontend (in frontend directory)
npm run dev
```

### Environment Variables

Create `.env` files in frontend and backend directories:

**Backend (.env):**
```
DATABASE_URL=postgresql://postgres:password@localhost:5432/devopslab
PORT=3001
NODE_ENV=development
```

**Frontend (.env):**
```
VITE_API_URL=http://localhost:3001
```

## 📊 Monitoring & Logging

### Application Metrics

- Frontend: Available at `http://localhost:3000/metrics`
- Backend: Available at `http://localhost:3001/metrics`

### Logs

```bash
# Docker Compose logs
docker-compose logs -f

# Kubernetes logs
kubectl logs -f deployment/frontend
kubectl logs -f deployment/backend

# Jenkins logs
docker logs -f jenkins
```

## 🚀 Future Enhancements

### Planned Features

- [ ] **Self-hosted deployment** with Terraform
- [ ] **Custom domain** with SSL certificates
- [ ] **Monitoring stack** (Prometheus + Grafana)
- [ ] **Log aggregation** (ELK stack)
- [ ] **Security scanning** in CI/CD pipeline
- [ ] **Multi-cloud deployment** (AWS, GCP, Azure)
- [ ] **GitOps workflow** with ArgoCD
- [ ] **Service mesh** integration (Istio)

### Production Considerations

- [ ] **High availability** setup
- [ ] **Auto-scaling** policies
- [ ] **Backup and disaster recovery**
- [ ] **Security hardening**
- [ ] **Performance optimization**
- [ ] **Cost optimization**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Docker Documentation](https://docs.docker.com/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Helm Documentation](https://helm.sh/docs/)
- [Kustomize Documentation](https://kustomize.io/)
- [Jenkins Documentation](https://www.jenkins.io/doc/)

---

This project demonstrates practical DevOps skills for modern web application deployment. Check out the complete source code and deployment configurations on GitHub.
