import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, Clock, CheckCircle, Users } from "lucide-react";

const tutorialData = [
  {
    id: "docker",
    title: "Docker Fundamentals",
    description: "Learn the basic concepts of containerization",
    level: "Beginner",
    duration: "30 min",
    levelColor: "error",
    topics: [
      "What is Docker?",
      "Images vs Containers", 
      "Dockerfile",
      "Docker Hub"
    ],
    path: "/tutorials/docker"
  },
  {
    id: "kubernetes",
    title: "Kubernetes Introduction", 
    description: "Fundamental orchestration concepts",
    level: "Intermediate",
    duration: "45 min",
    levelColor: "warning",
    topics: [
      "Pods",
      "Deployments",
      "Services", 
      "ConfigMaps"
    ],
    path: "/tutorials/kubernetes"
  },
  {
    id: "kustomize",
    title: "Kustomize Deep Dive",
    description: "Template-free configuration management",
    level: "Intermediate", 
    duration: "35 min",
    levelColor: "warning",
    topics: [
      "Bases and Overlays",
      "Patches",
      "Generators",
      "Transformers"
    ],
    path: "/tutorials/kustomize"
  },
  {
    id: "helm",
    title: "Creating Helm Charts",
    description: "Package and distribute Kubernetes applications",
    level: "Advanced",
    duration: "60 min", 
    levelColor: "error",
    topics: [
      "Chart Structure",
      "Templates",
      "Values",
      "Dependencies"
    ],
    path: "/tutorials/helm"
  },
  {
    id: "jenkins",
    title: "Jenkins CI/CD",
    description: "Automated pipelines for continuous integration and deployment",
    level: "Intermediate",
    duration: "40 min",
    levelColor: "success", 
    topics: [
      "Pipeline Concepts",
      "Jenkinsfile",
      "CI/CD Stages",
      "Automation Benefits"
    ],
    path: "/tutorials/jenkins"
  }
];

const TutorialsPage: React.FC = () => {
  const navigate = useNavigate();

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="tutorial">
      <div className="tutorial__header">
        <h2>DevOps Tutorials</h2>
        <p>Learn the technologies step by step</p>
      </div>

      <div className="tutorial__grid">
        {tutorialData.map((tutorial) => (
          <div 
            key={tutorial.id} 
            className="tutorial-card card card--interactive"
            onClick={() => handleCardClick(tutorial.path)}
            style={{ cursor: 'pointer' }}>
            <div className="tutorial-card__header">
              <div>
                <h3 className="tutorial-card__title">{tutorial.title}</h3>
                <p className="tutorial-card__description">{tutorial.description}</p>
              </div>
              <div className="flex flex-col gap-1 items-end">
                <span className={`badge badge--${tutorial.levelColor}`}>
                  <Users size={12} />
                  {tutorial.level}
                </span>
                <span className="tutorial-card__duration">
                  <Clock size={12} />
                  {tutorial.duration}
                </span>
              </div>
            </div>

            <div className="tutorial-card__content">
              <h4>Topics covered:</h4>
              <ul>
                {tutorial.topics.map((topic, index) => (
                  <li key={index}>
                    <CheckCircle size={14} />
                    {topic}
                  </li>
                ))}
              </ul>
            </div>

            <div className="tutorial-card__footer">
              <Link 
                to={tutorial.path}
                className="btn btn--primary btn--with-icon"
                style={{ width: "100%" }}
                onClick={(e) => e.stopPropagation()}>
                <BookOpen size={16} />
                Start Tutorial
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorialsPage;