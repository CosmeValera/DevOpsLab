import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DeploymentPage from "./deployments/DeploymentPage";
import TutorialsPage from "./tutorials/TutorialsPage";
import JenkinsPage from "./jenkins/JenkinsPage";

interface HomeProps {
  initialTab?: "deployments" | "tutorials" | "jenkins";
}

const Home: React.FC<HomeProps> = ({ initialTab = "deployments" }) => {
  const [activeTab, setActiveTab] = useState<
    "deployments" | "tutorials" | "jenkins"
  >(initialTab);
  const navigate = useNavigate();

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const handleTabClick = (tab: "deployments" | "tutorials" | "jenkins") => {
    setActiveTab(tab);
    navigate(`/${tab}`);
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <div className="home__hero">
        <h1 className="home__title">DevOps Lab</h1>
        <p className="home__subtitle">
          Explore different methods to deploy this application, learn through hands-on tutorials, and discover CI/CD automation with industry-standard DevOps tools.
        </p>
      </div>

      {/* Main Navigation Tabs */}
      <div className="main-nav">
        <div className="main-nav__tabs">
          <button
            className={`main-nav__tab ${
              activeTab === "deployments" ? "main-nav__tab--active" : ""
            }`}
            onClick={() => handleTabClick("deployments")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="main-nav__tab__icon">
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
              <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
              <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
              <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
            </svg>
            <span className="main-nav__tab__text">Deployments</span>
          </button>
          <button
            className={`main-nav__tab ${
              activeTab === "tutorials" ? "main-nav__tab--active" : ""
            }`}
            onClick={() => handleTabClick("tutorials")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="main-nav__tab__icon">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
            <span className="main-nav__tab__text">Tutorials</span>
          </button>
          <button
            className={`main-nav__tab ${activeTab === "jenkins" ? "main-nav__tab--active" : ""}`}
            onClick={() => handleTabClick("jenkins")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="main-nav__tab__icon">
              <polygon points="5,3 19,12 5,21" />
            </svg>
            <span className="main-nav__tab__text">Jenkins</span>
          </button>
        </div>
      </div>

      {/* Deployments Content */}
      {activeTab === "deployments" && <DeploymentPage />}

      {/* Tutorials Content */}
      {activeTab === "tutorials" && <TutorialsPage />}

      {/* Jenkins Content */}
      {activeTab === "jenkins" && <JenkinsPage />}
    </div>
  );
};

export default Home;
