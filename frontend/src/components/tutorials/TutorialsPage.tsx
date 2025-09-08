import { Link, useNavigate } from "react-router-dom";
import { BookOpen, Clock, CheckCircle, Users, ArrowRight, Code, Container, Layers, Package, Zap } from "lucide-react";

const tutorialData = [
  {
    id: "docker",
    title: "Docker Fundamentals",
    description: "Learn containerization basics",
    longDescription: "Understand what containers are and how to use Docker to package and run applications. Learn about images, containers, and Dockerfiles.",
    levelColor: "error",
    icon: Container,
    topics: [
      "What are containers and images",
      "Building and running containers", 
      "Writing Dockerfiles",
      "Basic Docker commands"
    ],
    path: "/tutorials/docker",
    estimatedReadingTime: "4 minutes",
    prerequisites: "Basic command line knowledge"
  },
  {
    id: "kubernetes",
    title: "Kubernetes Introduction", 
    description: "Orchestrate containers at scale",
    longDescription: "Learn the basics of Kubernetes: pods, deployments, and services. Understand how to run and manage containerized applications in a cluster.",
    levelColor: "warning",
    icon: Layers,
    topics: [
      "What is Kubernetes and why use it",
      "Pods, Deployments, and Services",
      "Basic kubectl commands",
      "Scaling and managing applications"
    ],
    path: "/tutorials/kubernetes",
    estimatedReadingTime: "4 minutes",
    prerequisites: "Docker"
  },
  {
    id: "kustomize",
    title: "Kustomize Basics",
    description: "Manage configurations without templates",
    longDescription: "Learn how to customize Kubernetes configurations for different environments using Kustomize's simple base and overlay approach.",
    levelColor: "warning",
    icon: Code,
    topics: [
      "Base and overlay concept",
      "Simple patches and customizations",
      "Environment-specific configurations"
    ],
    path: "/tutorials/kustomize",
    estimatedReadingTime: "5 minutes",
    prerequisites: "Kubernetes"
  },
  {
    id: "helm",
    title: "Helm Basics",
    description: "Package applications for Kubernetes",
    longDescription: "Learn the fundamentals of Helm: charts, releases, and values. Understand how to package and deploy applications with simple templating.",
    levelColor: "error",
    icon: Package,
    topics: [
      "What are Helm charts and releases",
      "Basic templating with values",
      "Installing and managing applications"
    ],
    path: "/tutorials/helm",
    estimatedReadingTime: "5 minutes",
    prerequisites: "Kubernetes"
  },
  {
    id: "jenkins",
    title: "Jenkins CI/CD",
    description: "Automate your development workflow",
    longDescription: "Learn the basics of Jenkins: pipelines, jobs, and Jenkinsfiles. Understand how to automate building, testing, and deploying applications.",
    levelColor: "success", 
    icon: Zap,
    topics: [
      "What is CI/CD and why use Jenkins",
      "Creating pipelines and jobs",
      "Writing simple Jenkinsfiles",
      "Basic automation concepts"
    ],
    path: "/tutorials/jenkins",
    estimatedReadingTime: "5 minutes",
    prerequisites: "Git basics"
  }
];

const TutorialsPage = () => {
  const navigate = useNavigate();

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="tutorial">
      <div className="section__header">
        <h2 className="section__title">DevOps Tutorials</h2>
        <p className="section__subtitle">Master modern DevOps practices with hands-on learning</p>
      </div>

      <div className="tutorial__grid">
        {tutorialData.map((tutorial) => {
          const IconComponent = tutorial.icon;
          return (
            <div 
              key={tutorial.id} 
              className="tutorial-card card card--interactive"
              onClick={() => handleCardClick(tutorial.path)}
              style={{ cursor: 'pointer' }}>
              
              <div className="tutorial-card__header">
                <div className="tutorial-card__icon">
                  <IconComponent size={32} />
                </div>
              </div>

              <div className="tutorial-card__content">
                <h3 className="tutorial-card__title">{tutorial.title}</h3>
                <p className="tutorial-card__description">{tutorial.description}</p>
                <p className="tutorial-card__long-description">{tutorial.longDescription}</p>
                
                <div className="tutorial-card__meta-info">
                  <div className="tutorial-card__meta-item">
                    <Clock size={14} />
                    <span>Reading time: {tutorial.estimatedReadingTime}</span>
                  </div>
                  <div className="tutorial-card__meta-item">
                    <Users size={14} />
                    <span>Prerequisites: {tutorial.prerequisites}</span>
                  </div>
                </div>

                <div className="tutorial-card__topics">
                  <h4>What you'll learn:</h4>
                  <ul>
                    {tutorial.topics.map((topic, index) => (
                      <li key={index}>
                        <CheckCircle size={14} />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="tutorial-card__footer">
                <Link 
                  to={tutorial.path}
                  className="btn btn--primary btn--with-icon"
                  style={{ width: "100%" }}
                  onClick={(e) => e.stopPropagation()}>
                  <BookOpen size={16} />
                  Start Learning
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TutorialsPage;