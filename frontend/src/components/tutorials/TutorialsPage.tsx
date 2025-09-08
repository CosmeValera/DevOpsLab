import { Link, useNavigate } from "react-router-dom";
import { BookOpen, Clock, CheckCircle, Users, ArrowRight, Code, Container, Layers, Package, Zap } from "lucide-react";

const tutorialData = [
  {
    id: "docker",
    title: "Docker Fundamentals",
    description: "Master containerization from the ground up",
    longDescription: "Dive deep into Docker's core concepts, from understanding what containers are to building and running your first applications. Learn about images, containers, Dockerfiles, and the complete container lifecycle.",
    levelColor: "error",
    icon: Container,
    topics: [
      "Container fundamentals and isolation",
      "Docker images and registries", 
      "Writing effective Dockerfiles",
      "Container lifecycle management",
      "Multi-stage builds and optimization"
    ],
    path: "/tutorials/docker",
    estimatedReadingTime: "4 minutes",
    prerequisites: "Basic command line knowledge"
  },
  {
    id: "kubernetes",
    title: "Kubernetes Introduction", 
    description: "Orchestrate containers at scale",
    longDescription: "Learn Kubernetes fundamentals through hands-on examples. Understand pods, deployments, services, and how they work together to create resilient, scalable applications.",
    levelColor: "warning",
    icon: Layers,
    topics: [
      "Pods and their lifecycle",
      "Deployments and scaling",
      "Services and networking",
      "ConfigMaps and Secrets",
      "Basic troubleshooting"
    ],
    path: "/tutorials/kubernetes",
    estimatedReadingTime: "4 minutes",
    prerequisites: "Docker"
  },
  {
    id: "kustomize",
    title: "Kustomize Deep Dive",
    description: "Template-free configuration management",
    longDescription: "Discover how Kustomize simplifies Kubernetes configuration management without templates. Learn bases, overlays, patches, and generators for environment-specific deployments.",
    levelColor: "warning",
    icon: Code,
    topics: [
      "Base and overlay architecture",
      "Strategic merge patches",
      "JSON patch operations",
      "ConfigMap and Secret generators",
      "Environment-specific configurations"
    ],
    path: "/tutorials/kustomize",
    estimatedReadingTime: "5 minutes",
    prerequisites: "Kubernetes"
  },
  {
    id: "helm",
    title: "Creating Helm Charts",
    description: "Package and distribute applications",
    longDescription: "Learn Helm's templating system to create reusable application packages. Master chart structure, templates, values, and dependencies for professional Kubernetes deployments.",
    levelColor: "error",
    icon: Package,
    topics: [
      "Chart structure and organization",
      "Template syntax and functions",
      "Values and value overrides",
      "Chart dependencies and repositories",
      "Best practices and security"
    ],
    path: "/tutorials/helm",
    estimatedReadingTime: "6 minutes",
    prerequisites: "Kubernetes"
  },
  {
    id: "jenkins",
    title: "Jenkins CI/CD",
    description: "Automate your development workflow",
    longDescription: "Build robust CI/CD pipelines with Jenkins. Learn pipeline concepts, Jenkinsfiles, stages, and automation strategies to streamline your development process.",
    levelColor: "success", 
    icon: Zap,
    topics: [
      "Pipeline concepts and stages",
      "Declarative vs Scripted pipelines",
      "Jenkinsfile best practices",
      "CI/CD automation strategies",
      "Pipeline troubleshooting"
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