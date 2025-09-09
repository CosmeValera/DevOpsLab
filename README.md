# 🐳🧪 DevOpsLab
Explore different deployment methods, learn through tutorials, and discover CI/CD automation with industry-standard DevOps tools.

## ⚙ Technology Stack
- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript
- **Containerization**: Docker and Docker Compose
- **Orchestration**: Kubernetes, Kustomize and Helm
- **CI/CD**: Jenkins
- **Cloud Services**:
  - **AWS S3** → Hosting the frontend
  - **AWS Lambda** → Backend API calls
  - **AWS EC2** → Jenkins server

## 🎬 Demo
[Open the AWS S3](https://d3nl9bq5so9qcn.cloudfront.net/) to view the frontend app!

**General Overview:**
*Navigate through the different sections: Introduction, Jenkins pipelines, tutorials, and deployment guides.*

![General Overview](./readme-content/general-overview.gif)


**Interactive Jenkins (AWS S3 + Lambda + EC2):**
*Watch real-time pipeline status updates as Jenkins builds are triggered and monitored through the S3 frontend.*

![Interactive jenkins](./readme-content/interactive-jenkins.gif)

✨ The most rewarding aspect was integrating AWS S3, Lambda, and EC2 so users could build pipelines on Jenkins, while S3 displayed live pipeline status through Lambda calls to the Jenkins server.

## 🚀 Get Started
Experience DevOpsLab in two ways:

### ☁️ Cloud Version:

[Visit the live AWS deployment](https://d3nl9bq5so9qcn.cloudfront.net/). It is fully configured and ready to explore!

**Jenkins:**

![cloud-pipeline-status-working](./readme-content/cloud-pipeline-status-working.png)


### 💻 Local Development

Build and run everything on your machine:
```bash
git clone https://github.com/cosmevalera/devopslab
cd devopslab
docker-compose up -d
```
Visit `http://localhost:3000` to see the frontend running. Introduction, tutorials and deployments will work.

However you will need to start the backend and create the jenkins image for the jenkins section to work.

**Jenkins:**
At first it will tell you that you also need the back running:

![pipeline-status-back-error](./readme-content/pipeline-status-back-error.png)

Once you have the back on port 3001, you will also need the jenkins.

![pipeline-status-jenkins-error](./readme-content/pipeline-status-jenkins-error.png)

Follow the **Jenkins Configuration** section steps and finally if everything went well you should have your pipeline running in local too. As well as your local jenkins deployed, in which you can configure and build your own pipelines! (In the cloud version you cannot edit the pipelines that are currently available. The pipelines that there are currently is all there is)

![pipeline-status-working](./readme-content/pipeline-status-working.png)

![local-jenkins](./readme-content/local-jenkins.png)

> Check the commands to build the whole project with other technologies like Docker, Kubernetes or Helm [here](./README-command.md), or in the deployments section.
