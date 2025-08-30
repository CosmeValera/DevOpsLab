pipeline {
    agent any

    stages {
        stage('Clean Up Old Services') {
            steps {
                sh '''
                docker rmi -f devopslab-frontend
                docker rm -f frontend
                docker rmi -f devopslab-backend
                docker rm -f backend
                '''
            }
        }

        stage('Build Images and Start Services') {
            steps {
                sh '''
                docker build -t devopslab-frontend ./frontend
                docker run -d --name frontend -p 3000:3000 devopslab-frontend
                docker build -t devopslab-backend ./backend
                docker run -d --name backend -p 3001:3001 devopslab-backend
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
    }
}
