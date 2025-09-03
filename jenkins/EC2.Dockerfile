FROM jenkins/jenkins:lts-jdk17

USER root

# Set environment to avoid interactive prompts
ENV DEBIAN_FRONTEND=noninteractive
ENV DEBCONF_NONINTERACTIVE_SEEN=true

# Install essential dependencies (without lsb-release)
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      curl \
      git \
      gnupg \
      ca-certificates \
      conntrack \
      iproute2 \
      socat && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install docker-compose v2
RUN curl -SL "https://github.com/docker/compose/releases/download/v2.23.3/docker-compose-linux-x86_64" \
    -o /usr/local/bin/docker-compose && \
    chmod +x /usr/local/bin/docker-compose

# Install kind (Kubernetes IN Docker)
RUN curl -Lo /usr/local/bin/kind https://kind.sigs.k8s.io/dl/v0.20.0/kind-linux-amd64 && \
    chmod +x /usr/local/bin/kind

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

# Create docker group with the correct GID and add jenkins user
ARG DOCKER_GID
RUN groupadd -g ${DOCKER_GID} docker && \
    usermod -aG docker jenkins

# Switch back to jenkins user
USER jenkins

# Add predefined pipeline job
COPY init_pipeline.groovy /usr/share/jenkins/ref/init.groovy.d/init_pipeline.groovy