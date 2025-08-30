pipeline {
    agent any

    stages {
        stage('Build Images and Start Services') {
            steps {
                sh '''
                docker-compose up -d
                '''
            }
        }
        stage('Check Services') {
            steps {
                sh '''
                docker-compose ps
                '''
            }
        }
        stage('Stop Services') {
            steps {
                sh '''
                docker-compose down
                '''
            }
        }
    }
}
