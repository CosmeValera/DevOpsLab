pipeline {
    agent any
    
    environment {
        DOCKER_REGISTRY = 'your-registry.com'
        IMAGE_TAG = "${env.BUILD_NUMBER}"
        FRONTEND_IMAGE = "${DOCKER_REGISTRY}/devopslab-frontend:${IMAGE_TAG}"
        BACKEND_IMAGE = "${DOCKER_REGISTRY}/devopslab-backend:${IMAGE_TAG}"
        LATEST_TAG = 'latest'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            parallel {
                stage('Frontend Dependencies') {
                    steps {
                        dir('frontend') {
                            sh 'npm ci'
                        }
                    }
                }
                stage('Backend Dependencies') {
                    steps {
                        dir('backend') {
                            sh 'npm ci'
                        }
                    }
                }
            }
        }
        
        stage('Lint Code') {
            parallel {
                stage('Frontend Lint') {
                    steps {
                        dir('frontend') {
                            sh 'npm run lint'
                        }
                    }
                }
                stage('Backend Lint') {
                    steps {
                        dir('backend') {
                            sh 'npm run lint'
                        }
                    }
                }
            }
        }
        
        stage('Run Tests') {
            parallel {
                stage('Frontend Tests') {
                    steps {
                        dir('frontend') {
                            sh 'npm run test -- --coverage --watchAll=false'
                        }
                    }
                    post {
                        always {
                            publishHTML([
                                allowMissing: false,
                                alwaysLinkToLastBuild: true,
                                keepAll: true,
                                reportDir: 'frontend/coverage',
                                reportFiles: 'index.html',
                                reportName: 'Frontend Coverage Report'
                            ])
                        }
                    }
                }
                stage('Backend Tests') {
                    steps {
                        dir('backend') {
                            sh 'npm run test -- --coverage --watchAll=false'
                        }
                    }
                    post {
                        always {
                            publishHTML([
                                allowMissing: false,
                                alwaysLinkToLastBuild: true,
                                keepAll: true,
                                reportDir: 'backend/coverage',
                                reportFiles: 'index.html',
                                reportName: 'Backend Coverage Report'
                            ])
                        }
                    }
                }
            }
        }
        
        stage('Build Docker Images') {
            parallel {
                stage('Build Frontend Image') {
                    steps {
                        dir('frontend') {
                            sh "docker build -t ${FRONTEND_IMAGE} -t ${DOCKER_REGISTRY}/devopslab-frontend:${LATEST_TAG} ."
                        }
                    }
                }
                stage('Build Backend Image') {
                    steps {
                        dir('backend') {
                            sh "docker build -t ${BACKEND_IMAGE} -t ${DOCKER_REGISTRY}/devopslab-backend:${LATEST_TAG} ."
                        }
                    }
                }
            }
        }
        
        stage('Push Images') {
            steps {
                script {
                    docker.withRegistry("https://${DOCKER_REGISTRY}", 'docker-credentials') {
                        sh "docker push ${FRONTEND_IMAGE}"
                        sh "docker push ${BACKEND_IMAGE}"
                        sh "docker push ${DOCKER_REGISTRY}/devopslab-frontend:${LATEST_TAG}"
                        sh "docker push ${DOCKER_REGISTRY}/devopslab-backend:${LATEST_TAG}"
                    }
                }
            }
        }
        
        stage('Deploy to Development') {
            when {
                branch 'develop'
            }
            steps {
                echo 'Deploying to development environment...'
                sh 'kubectl apply -k deployments/kustomize/overlays/dev'
                sh 'kubectl rollout status deployment/frontend -n devopslab-dev'
                sh 'kubectl rollout status deployment/backend -n devopslab-dev'
            }
        }
        
        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                echo 'Deploying to production environment...'
                sh 'kubectl apply -k deployments/kustomize/overlays/prod'
                sh 'kubectl rollout status deployment/frontend -n devopslab-prod'
                sh 'kubectl rollout status deployment/backend -n devopslab-prod'
            }
        }
        
        stage('Run Integration Tests') {
            when {
                anyOf {
                    branch 'develop'
                    branch 'main'
                }
            }
            steps {
                echo 'Running integration tests...'
                sh 'docker-compose -f docker-compose.test.yml up --abort-on-container-exit'
            }
        }
        
        stage('Cleanup') {
            always {
                echo 'Cleaning up old images...'
                sh '''
                    docker image prune -f
                    docker system prune -f
                '''
            }
        }
    }
    
    post {
        always {
            echo 'Pipeline completed!'
        }
        success {
            echo 'Pipeline succeeded!'
            // Send notification to Slack/Teams
        }
        failure {
            echo 'Pipeline failed!'
            // Send notification to Slack/Teams
        }
        cleanup {
            // Clean workspace
            cleanWs()
        }
    }
}
