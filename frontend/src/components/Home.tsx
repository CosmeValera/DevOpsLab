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
    <div>
      {/* Main Navigation Tabs */}
      <div className="main-nav-tabs">
        <button
          className={`main-nav-tab ${
            activeTab === "deployments" ? "active" : ""
          }`}
          onClick={() => handleTabClick("deployments")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="w-4 h-4">
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
          </svg>
          Deployments
        </button>
        <button
          className={`main-nav-tab ${
            activeTab === "tutorials" ? "active" : ""
          }`}
          onClick={() => handleTabClick("tutorials")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="w-4 h-4">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
          Tutorials
        </button>
        <button
          className={`main-nav-tab ${activeTab === "jenkins" ? "active" : ""}`}
          onClick={() => handleTabClick("jenkins")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="w-4 h-4">
            <polygon points="5,3 19,12 5,21" />
          </svg>
          Jenkins
        </button>
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
