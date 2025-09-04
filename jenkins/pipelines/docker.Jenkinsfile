pipeline {
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
        
        stage('Remove Images and Services') {
            steps {
                sh '''
                docker rmi -f devopslab-frontend
                docker rm -f frontend-in-jenkins
                docker rmi -f devopslab-backend
                docker rm -f backend-in-jenkins

                docker image prune -f # Remove tangling images
                '''
            }
        }
    }
}
