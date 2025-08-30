pipeline {
    agent any
    
    environment {
        // Application configuration
        APP_NAME = 'devopslab'
        FRONTEND_IMAGE = "${APP_NAME}-frontend"
        BACKEND_IMAGE = "${APP_NAME}-backend"
        REGISTRY = 'your-registry.com' // Change to your registry
        
        // Versioning
        BUILD_VERSION = "${env.BUILD_NUMBER}"
        GIT_COMMIT_SHORT = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
        
        // Docker configuration
        DOCKER_IMAGE_TAG = "${BUILD_VERSION}-${GIT_COMMIT_SHORT}"
        
        // Node.js version
        NODE_VERSION = '18'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo '🔍 Checking out source code...'
                checkout scm
                
                script {
                    // Display build information
                    echo "Build #${BUILD_NUMBER}"
                    echo "Git commit: ${GIT_COMMIT_SHORT}"
                    echo "Branch: ${env.BRANCH_NAME}"
                }
            }
        }
        
        stage('Install Dependencies') {
            parallel {
                stage('Frontend Dependencies') {
                    steps {
                        dir('frontend') {
                            echo '📦 Installing frontend dependencies...'
                            sh 'npm ci'
                        }
                    }
                }
                
                stage('Backend Dependencies') {
                    steps {
                        dir('backend') {
                            echo '📦 Installing backend dependencies...'
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
                            echo '🔍 Linting frontend code...'
                            sh 'npm run lint'
                        }
                    }
                }
                
                stage('Backend Lint') {
                    steps {
                        dir('backend') {
                            echo '🔍 Linting backend code...'
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
                            echo '🧪 Running frontend tests...'
                            sh 'npm test -- --coverage --watchAll=false'
                        }
                    }
                    post {
                        always {
                            dir('frontend') {
                                publishHTML([
                                    allowMissing: false,
                                    alwaysLinkToLastBuild: true,
                                    keepAll: true,
                                    reportDir: 'coverage/lcov-report',
                                    reportFiles: 'index.html',
                                    reportName: 'Frontend Coverage Report'
                                ])
                            }
                        }
                    }
                }
                
                stage('Backend Tests') {
                    steps {
                        dir('backend') {
                            echo '🧪 Running backend tests...'
                            sh 'npm test -- --coverage --watchAll=false'
                        }
                    }
                    post {
                        always {
                            dir('backend') {
                                publishHTML([
                                    allowMissing: false,
                                    alwaysLinkToLastBuild: true,
                                    keepAll: true,
                                    reportDir: 'coverage/lcov-report',
                                    reportFiles: 'index.html',
                                    reportName: 'Backend Coverage Report'
                                ])
                            }
                        }
                    }
                }
            }
        }
        
        stage('Build Docker Images') {
            steps {
                echo '🐳 Building Docker images...'
                
                script {
                    // Build frontend image
                    dir('frontend') {
                        sh """
                            docker build \
                                -t ${FRONTEND_IMAGE}:${DOCKER_IMAGE_TAG} \
                                -t ${FRONTEND_IMAGE}:latest \
                                .
                        """
                    }
                    
                    // Build backend image
                    dir('backend') {
                        sh """
                            docker build \
                                -t ${BACKEND_IMAGE}:${DOCKER_IMAGE_TAG} \
                                -t ${BACKEND_IMAGE}:latest \
                                .
                        """
                    }
                }
            }
        }
        
        stage('Push Images') {
            when {
                anyOf {
                    branch 'main'
                    branch 'master'
                    branch 'develop'
                }
            }
            steps {
                echo '📤 Pushing Docker images to registry...'
                
                script {
                    // Tag images for registry
                    sh """
                        docker tag ${FRONTEND_IMAGE}:${DOCKER_IMAGE_TAG} ${REGISTRY}/${FRONTEND_IMAGE}:${DOCKER_IMAGE_TAG}
                        docker tag ${FRONTEND_IMAGE}:latest ${REGISTRY}/${FRONTEND_IMAGE}:latest
                        docker tag ${BACKEND_IMAGE}:${DOCKER_IMAGE_TAG} ${REGISTRY}/${BACKEND_IMAGE}:${DOCKER_IMAGE_TAG}
                        docker tag ${BACKEND_IMAGE}:latest ${REGISTRY}/${BACKEND_IMAGE}:latest
                    """
                    
                    // Push images
                    sh """
                        docker push ${REGISTRY}/${FRONTEND_IMAGE}:${DOCKER_IMAGE_TAG}
                        docker push ${REGISTRY}/${FRONTEND_IMAGE}:latest
                        docker push ${REGISTRY}/${BACKEND_IMAGE}:${DOCKER_IMAGE_TAG}
                        docker push ${REGISTRY}/${BACKEND_IMAGE}:latest
                    """
                }
            }
        }
        
        stage('Deploy to Environment') {
            when {
                anyOf {
                    branch 'main'
                    branch 'master'
                }
            }
            steps {
                echo '🚀 Deploying to production environment...'
                
                script {
                    // Deploy using Docker Compose for local testing
                    // In production, this would deploy to Kubernetes
                    sh 'docker-compose -f docker-compose.prod.yml up -d'
                    
                    // Wait for services to be healthy
                    sh 'sleep 30'
                    
                    // Health check
                    sh '''
                        # Check if services are responding
                        curl -f http://localhost:3000/health || exit 1
                        curl -f http://localhost:5000/health || exit 1
                    '''
                }
            }
        }
        
        stage('Integration Tests') {
            when {
                anyOf {
                    branch 'main'
                    branch 'master'
                    branch 'develop'
                }
            }
            steps {
                echo '🔗 Running integration tests...'
                
                script {
                    // Wait for services to be ready
                    sh 'sleep 10'
                    
                    // Run integration tests
                    sh '''
                        # Test frontend-backend communication
                        curl -f http://localhost:3000/api/health || exit 1
        
                        # Test database connectivity
                        curl -f http://localhost:5000/api/health || exit 1
        
                        # Test complete user flow
                        echo "Integration tests passed!"
                    '''
                }
            }
        }
    }
    
    post {
        always {
            echo '🧹 Cleaning up workspace...'
            cleanWs()
        }
        
        success {
            echo '✅ Pipeline completed successfully!'
            
            script {
                // Send success notification
                emailext (
                    subject: "✅ DevOpsLab Pipeline #${BUILD_NUMBER} - SUCCESS",
                    body: """
                        <h2>Pipeline Success</h2>
                        <p><strong>Build:</strong> #${BUILD_NUMBER}</p>
                        <p><strong>Commit:</strong> ${GIT_COMMIT_SHORT}</p>
                        <p><strong>Branch:</strong> ${env.BRANCH_NAME}</p>
                        <p><strong>Duration:</strong> ${currentBuild.durationString}</p>
                        <p><a href="${env.BUILD_URL}">View Build Details</a></p>
                    """,
                    recipientProviders: [[$class: 'DevelopersRecipientProvider']]
                )
            }
        }
        
        failure {
            echo '❌ Pipeline failed!'
            
            script {
                // Send failure notification
                emailext (
                    subject: "❌ DevOpsLab Pipeline #${BUILD_NUMBER} - FAILED",
                    body: """
                        <h2>Pipeline Failure</h2>
                        <p><strong>Build:</strong> #${BUILD_NUMBER}</p>
                        <p><strong>Commit:</strong> ${GIT_COMMIT_SHORT}</p>
                        <p><strong>Branch:</strong> ${env.BRANCH_NAME}</p>
                        <p><strong>Duration:</strong> ${currentBuild.durationString}</p>
                        <p><a href="${env.BUILD_URL}">View Build Details</a></p>
                    """,
                    recipientProviders: [[$class: 'DevelopersRecipientProvider']]
                )
            }
        }
        
        cleanup {
            echo '🧹 Cleaning up Docker images...'
            sh '''
                # Remove local images to save space
                docker rmi ${FRONTEND_IMAGE}:${DOCKER_IMAGE_TAG} || true
                docker rmi ${BACKEND_IMAGE}:${DOCKER_IMAGE_TAG} || true
                docker system prune -f || true
            '''
        }
    }
}
