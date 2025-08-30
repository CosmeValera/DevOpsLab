pipeline {
    agent any
    stages {
        stage('Docker') {
            steps {
                build job: 'DockerPipeline'
            }
        }
        stage('Kubernetes') {
            steps {
                build job: 'KubernetesPipeline'
            }
        }
        stage('Helm') {
            steps {
                build job: 'HelmPipeline'
            }
        }
    }
}
