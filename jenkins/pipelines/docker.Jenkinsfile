pipeline {
    agent any

    stages {
        stage('Clean Up Old Services') {
            steps {
                sh '''
                # Clean old networks/volumes for this project
                docker-compose down -v --remove-orphans || true
                '''
            }
        }

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
                docker-compose down -v --remove-orphans
                '''
            }
        }
    }
}
