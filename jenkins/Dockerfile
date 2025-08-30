FROM jenkins/jenkins:lts-jdk17

USER root

# Install Docker CLI
RUN apt-get update && \
    apt-get -y install apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release && \
    curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg && \
    echo \
    "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian \
    $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null && \
    apt-get update && \
    apt-get -y install docker-ce-cli

# Install docker-compose v2
RUN curl -SL https://github.com/docker/compose/releases/download/v2.23.3/docker-compose-linux-x86_64 \
    -o /usr/local/bin/docker-compose && \
    chmod +x /usr/local/bin/docker-compose

# Install Minikube
RUN curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 && \
    install minikube-linux-amd64 /usr/local/bin/minikube && \
    rm minikube-linux-amd64

# Install plugins
RUN jenkins-plugin-cli --plugins \
    git \
    workflow-aggregator \
    pipeline-github-lib \
    configuration-as-code

# Install kubectl
RUN curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl" && \
    chmod +x kubectl && \
    mv kubectl /usr/local/bin/

# Install Helm
RUN curl https://get.helm.sh/helm-v3.12.0-linux-amd64.tar.gz | tar xz && \
    mv linux-amd64/helm /usr/local/bin/helm && \
    rm -rf linux-amd64

# Install Kustomize
RUN curl -s "https://raw.githubusercontent.com/kubernetes-sigs/kustomize/master/hack/install_kustomize.sh" | bash && \
    mv kustomize /usr/local/bin/

# Switch back to jenkins user
USER jenkins

# Add predefined pipeline job
COPY init_pipeline.groovy /usr/share/jenkins/ref/init.groovy.d/init_pipeline.groovy
