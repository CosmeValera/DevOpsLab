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
      ca-certificates && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install Docker CLI for Debian Bookworm (hardcoded version)
RUN curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg && \
    echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian bookworm stable" \
      | tee /etc/apt/sources.list.d/docker.list > /dev/null && \
    apt-get update && \
    apt-get install -y --no-install-recommends docker-ce-cli && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install docker-compose v2
RUN curl -SL "https://github.com/docker/compose/releases/download/v2.23.3/docker-compose-linux-x86_64" \
    -o /usr/local/bin/docker-compose && \
    chmod +x /usr/local/bin/docker-compose

# Create docker group with the correct GID and add jenkins user
ARG DOCKER_GID
RUN groupadd -g ${DOCKER_GID} docker && \
    usermod -aG docker jenkins

# Switch back to jenkins user
USER jenkins

# Add predefined pipeline job
COPY init_pipeline.groovy /usr/share/jenkins/ref/init.groovy.d/init_pipeline.groovy