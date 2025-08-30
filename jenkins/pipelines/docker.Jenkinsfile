pipeline {
    agent any

    stages {
        stage('Clean Up Old Services') {
            steps {
                sh '''
                # Stop and remove only app-related containers
                docker rm -f devopslab-postgres || true
                docker rm -f devopslab-backend || true
                docker rm -f devopslab-frontend || true

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
