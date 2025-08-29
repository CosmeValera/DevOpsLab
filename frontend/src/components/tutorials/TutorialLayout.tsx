import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface TutorialLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  estimatedReadingTime: string;
  prerequisites: string;
  currentTutorial: string;
}

const tutorialNavigation = [
  { id: "docker", title: "Docker", path: "/tutorials/docker" },
  { id: "kubernetes", title: "Kubernetes", path: "/tutorials/kubernetes" },
  { id: "kustomize", title: "Kustomize", path: "/tutorials/kustomize" },
  { id: "helm", title: "Helm", path: "/tutorials/helm" },
  { id: "jenkins", title: "Jenkins", path: "/tutorials/jenkins" },
];

const TutorialLayout: React.FC<TutorialLayoutProps> = ({
  children,
  title,
  description,
  estimatedReadingTime,
  prerequisites,
  currentTutorial,
}) => {

  
  const currentIndex = tutorialNavigation.findIndex(t => t.id === currentTutorial);
  const prevTutorial = currentIndex > 0 ? tutorialNavigation[currentIndex - 1] : null;
  const nextTutorial = currentIndex < tutorialNavigation.length - 1 ? tutorialNavigation[currentIndex + 1] : null;

  return (
    <div className="tutorial-layout">
      {/* Tutorial Header */}
      <div className="tutorial-header">
        <div className="tutorial-header__content">
          <div className="tutorial-header__meta">
            <Link to="/tutorials" className="tutorial-header__back">
              <ArrowLeft size={16} />
              Back to Tutorials
            </Link>
          </div>
          
          <h1 className="tutorial-header__title">{title}</h1>
          <p className="tutorial-header__description">{description}</p>
          
          <div className="tutorial-header__info">
            <div className="tutorial-header__info-item">
              <span className="info-label">Reading time:</span>
              <span className="info-value">{estimatedReadingTime}</span>
            </div>
            <div className="tutorial-header__info-item">
              <span className="info-label">Prerequisites:</span>
              <span className="info-value">{prerequisites}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tutorial Navigation */}
      <nav className="tutorial-nav">
        <div className="tutorial-nav__container">
          <div className="tutorial-nav__tabs">
            {tutorialNavigation.map((tutorial) => (
              <Link
                key={tutorial.id}
                to={tutorial.path}
                className={`tutorial-nav__tab ${
                  tutorial.id === currentTutorial ? "tutorial-nav__tab--active" : ""
                }`}>
                {tutorial.title}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Tutorial Content */}
      <div className="tutorial-content">
        <article className="tutorial-article">
          {children}
        </article>
      </div>

      {/* Tutorial Footer Navigation */}
      <div className="tutorial-footer">
        <div className="tutorial-footer__navigation">
          {prevTutorial && (
            <Link to={prevTutorial.path} className="tutorial-footer__nav-link tutorial-footer__nav-link--prev">
              <ArrowLeft size={16} />
              <div>
                <span className="nav-label">Previous</span>
                <span className="nav-title">{prevTutorial.title}</span>
              </div>
            </Link>
          )}
          
          {nextTutorial && (
            <Link to={nextTutorial.path} className="tutorial-footer__nav-link tutorial-footer__nav-link--next">
              <div>
                <span className="nav-label">Next</span>
                <span className="nav-title">{nextTutorial.title}</span>
              </div>
              <ArrowRight size={16} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default TutorialLayout;
