## S3
![alt text](./readme-content/aws/s3.png)

Configured with static webpage.
![alt text](./readme-content/aws/s3-static-webpage.png)


With CloudFront. CloudFront is to have HTTPS in my S3.
![alt text](./readme-content/aws/s3-cloudfront.png)

## IAM
I have an user called cosme-cli, with this user I can connect to the EC2 for the jenkins server. And I can push the code. It has permissions policies for the **S3** and for the invalidation (something to avoid cache in **Cloudfront**)

![alt text](./readme-content/aws/iam.png)


## Lambda
Lambda code
![alt text](./readme-content/aws/lambda-code.png)

Lambda monitor screen
![alt text](./readme-content/aws/lambda-monitor.png)

## EC2
![alt text](./readme-content/aws/ec2.png)

I can connect in my WSL with my pem permissions to my EC2:

![alt text](./readme-content/aws/ec2-wsl.png)

Here is where I created the Jenkins and configured it.


This is the page that can be visited by anyone anonymously:
![alt text](./readme-content/aws/ec2-jenkins-anonymous.png)

However, I can register with admin

![alt text](./readme-content/aws/ec2-jenkins-admin-login.png)
![alt text](./readme-content/aws/ec2-jenkins-admin-dashboard.png)

And with admin, I configured the pipelines and I also configured the Matrix-based permissions so that anonymous uses can see the different pipelines and can build them, but not configure them for example.

![alt text](./readme-content/aws/ec2-jenkins-admin-matrix-permissions.png)

I also configured a volume for the EC2, since the initial 8GB of storage were too little. Since in my EC2 I have a jenkins server, where I am hosting, docker, kuberentes, kustomize, helm, and a kind cluster, that are creating images for the backend and the frontend.

![alt text](./readme-content/aws/ec2-volume.png)

## AWS cost and pricing
The cost of these 3 services is around 20 dollars per month. Luckily, right now at 10th September 2025, I'm still under the free plan so I don't have to pay anything since I have up to $200 to use in 6 months. Divided by service, per month:

- S3: ≈$1
- Lambda: ≈$4
- EC2: ≈$15
- Total: ≈$20

![alt text](./readme-content/aws/aws-cost-and-pricing.png)