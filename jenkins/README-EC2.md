**0. Connect to your ec2:**
```sh
ssh -i cosme-demo-ssh.pem ubuntu@ec2-54-93-162-158.eu-central-1.compute.amazonaws.com # Change 'ec2-54...' with your DNS
```

**1. Add Dockerfile with the values of `EC2.Dockerfile`**

**2. Steps for rebuild**
```sh
# Stop current Jenkins
docker rm -f jenkins && docker rmi -f devopslab-jenkins && docker volume rm -f jenkins_home
docker image prune -af

docker build --build-arg DOCKER_GID=$(getent group docker | cut -d: -f3) -t devopslab-jenkins .

# Run Jenkins with host network
docker run -d \
  --name jenkins \
  --network host \
  -e JENKINS_OPTS=--httpPort=8080 \
  --restart=on-failure \
  -v jenkins_home:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  devopslab-jenkins

docker logs jenkins # To obtain the password
```

**3. Add backend and frontend in jenkins**
```sh
# Clone repo
git clone https://github.com/cosmevalera/devopslab
cd devopslab
git checkout dev
git status # Check branch dev


# Copy the repo inside of the jenkins execution. And copy the frontend and the backend folders, inside of '/var/jenkins_home/workspace/DockerPipeline':
docker cp ./frontend jenkins:/var/jenkins_home/workspace/DockerPipeline
docker cp ./backend  jenkins:/var/jenkins_home/workspace/DockerPipeline

# If you want to enter
docker exec -it jenkins sh
cd /var/jenkins_home/workspace/DockerPipeline
```
