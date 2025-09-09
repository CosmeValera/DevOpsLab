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

Visit `http://localhost:3000` to see the frontend running.

## 📁 Project Structure

```
devopslab/
├── .github/                 # Workflow to upload frontend changes to AWS S3
├── frontend/                # React + TypeScript + Vite app
├── backend/                 # Node.js + Express + TypeScript API
├── deployments/
│   ├── k8s/                 # Raw Kubernetes manifests
│   ├── helm/                # Helm charts
│   └── kustomize/           # Kustomize overlays
├── jenkins/                 # Jenkins pipeline setup locally and EC2
├── lambda/                  # Set up lambda
└── README.md                # This file
```

> Check the commands for each technology [here](./README-command.md)

---

This project demonstrates practical DevOps skills for modern web application deployment. Check out the complete source code and deployment configurations on GitHub.
