**1. Add Dockerfile with the values of `EC2.Dockerfile`**

**2. Steps for rebuild**
```sh
# Stop current Jenkins
docker rm -f jenkins && docker rmi -f devopslab-jenkins && docker volume rm -f jenkins_home

# Get your Docker GID
DOCKER_GID=$(getent group docker | cut -d: -f3)
echo "Using Docker GID: $DOCKER_GID"

# Build with the updated Dockerfile
docker build --build-arg DOCKER_GID=$DOCKER_GID -t devopslab-jenkins -f Dockerfile .

# Run Jenkins with host network
docker run -d \
  --name jenkins \
  --network host \
  -e JENKINS_OPTS=--httpPort=8080 \
  --restart=on-failure \
  -v jenkins_home:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  devopslab-jenkins
```

**3. Add backend and frontend in jenkins**
```sh
# Clone repo
git clone https://github.com/cosmevalera/devopslab
cd DevOpsLab
git checkout dev
git s # Check branch dev


# Copy the repo inside of the jenkins execution. And copy the frontend and the backend folders, inside of '/var/jenkins_home/workspace/DockerPipeline':
docker cp ./frontend jenkins:/var/jenkins_home/workspace/DockerPipeline
docker cp ./backend  jenkins:/var/jenkins_home/workspace/DockerPipeline
```
