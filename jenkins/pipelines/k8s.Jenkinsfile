pipeline {
    agent any

    stages {
        stage('Predeploy Setup') {
            steps {
                sh '''
                kubectl apply -f deployments/k8s/namespace.yaml
                kubectl create configmap postgres-init-script --from-file=init.sql=./db/init.sql -n devopslab --dry-run=client -o yaml | kubectl apply -f -
                '''
            }
        }
        stage('Minikube Setup') {
            steps {
                sh '''
                minikube start --driver=docker
                minikube image load devopslab-frontend
                minikube image load devopslab-backend
                minikube image load devopslab-jenkins
                minikube image load postgres:15-alpine
                '''
            }
        }
        stage('Build Images') {
            steps {
                sh '''
                docker build -t devopslab-frontend ./frontend
                docker build -t devopslab-backend ./backend
                docker build -t devopslab-jenkins ./jenkins
                '''
            }
        }
        stage('Deploy to K8s') {
            steps {
                sh '''
                kubectl apply -f deployments/k8s/
                '''
            }
        }
        stage('Check Deployment') {
            steps {
                sh 'kubectl get all -n devopslab'
            }
        }
    }
}
