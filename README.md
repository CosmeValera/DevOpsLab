# DevOpsLab
A comprehensive demonstration of modern DevOps practices including Docker, Kubernetes, and CI/CD pipelines. This project showcases deployment strategies from containerization to production-ready orchestration.

## 🏗️ Project Architecture

This showcase demonstrates a complete DevOps workflow from development to production.

### Technology Stack

- **Frontend:** React + TypeScript + Vite
- **Backend:** Node.js + Express + TypeScript 
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

> Check the commands for each technology [here](./README-command.md)

---

This project demonstrates practical DevOps skills for modern web application deployment. Check out the complete source code and deployment configurations on GitHub.
