import { useEffect, useMemo, useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { Server, GitBranch, Sun, Moon } from "lucide-react";
import DockerDeployment from "./components/deployments/DockerDeployment";
import KubernetesDeployment from "./components/deployments/KubernetesDeployment";
import KustomizeDeployment from "./components/deployments/KustomizeDeployment";
import HelmDeployment from "./components/deployments/HelmDeployment";
import Dashboard from "./components/deployments/Dashboard";
import Home from "./components/Home";
import HomeWithTab from "./components/HomeWithTab";
import DockerTutorial from "./components/tutorials/DockerTutorial";
import KubernetesTutorial from "./components/tutorials/KubernetesTutorial";
import KustomizeTutorial from "./components/tutorials/KustomizeTutorial";
import HelmTutorial from "./components/tutorials/HelmTutorial";
import JenkinsTutorial from "./components/tutorials/JenkinsTutorial";

const technologies = [
  {
    name: "Docker",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round">
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8z" />
        <path d="m3.3 7 8.7 5 8.7-5" />
        <path d="M12 22V12" />
      </svg>
    ),
    description: "Containerization and local development",
    color: "#2496ED",
  },
  {
    name: "Kubernetes",
    icon: <Server />,
    description: "Container orchestration and scaling",
    color: "#326CE5",
  },
  {
    name: "Jenkins",
    icon: <GitBranch />,
    description: "CI/CD pipeline automation",
    color: "#D33833",
  },
];

function App() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      return window.localStorage.getItem("theme") === "dark" ? "dark" : "light";
    }
    return "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.body.classList.toggle("dark-theme", theme === "dark"); // Keep for legacy support
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const navItems = useMemo(() => {
    const path = location.pathname;
    // No navigation on Home or main section pages (they now redirect to Home)
    if (
      path === "/" ||
      path === "/deployments" ||
      path === "/tutorials" ||
      path === "/jenkins"
    ) {
      return [] as { id: string; label: string; path: string }[];
    }

    // Individual deployment pages navigation
    if (path.startsWith("/deployments/")) {
      return [
        { id: "back", label: "Go back", path: "/deployments" },
        { id: "docker", label: "Docker", path: "/deployments/docker" },
        {
          id: "kubernetes",
          label: "Kubernetes",
          path: "/deployments/kubernetes",
        },
        { id: "kustomize", label: "Kustomize", path: "/deployments/kustomize" },
        { id: "helm", label: "Helm", path: "/deployments/helm" },
      ];
    }

    // Individual tutorial pages navigation
    if (path.startsWith("/tutorials/")) {
      return [{ id: "back", label: "Go back", path: "/tutorials" }];
    }

    return [];
  }, [location.pathname]);

  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith("/deployments/docker")) setActiveTab("docker");
    else if (path.startsWith("/deployments/kubernetes"))
      setActiveTab("kubernetes");
    else if (path.startsWith("/deployments/kustomize"))
      setActiveTab("kustomize");
    else if (path.startsWith("/deployments/helm")) setActiveTab("helm");
    else setActiveTab("back");
  }, [location.pathname]);

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header__container">
          <div className="header__brand">
            <h1>DevOpsLab</h1>
            <p>DevOps Portfolio Showcase</p>
          </div>
          <div className="header__actions">
            {/* Theme Switcher Button */}
            <button
              className="theme-toggle"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              aria-label="Switch theme">
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            {/* Technology tabs */}
            <div className="header__tech-tabs">
              {technologies.map((tech) => (
                <div
                  key={tech.name}
                  className="nav-tab">
                  <span className="nav-tab__icon">{tech.icon}</span>
                  {tech.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Navigation */}
      {navItems.length > 0 && (
        <nav className="header border-t">
          <div className="header__container">
            <div className="nav-tabs">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`nav-tab ${activeTab === item.id ? "nav-tab--active" : ""}`}
                  onClick={() => setActiveTab(item.id)}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className="container">
        <Routes>
          {/* Home with previews */}
          <Route path="/" element={<Home />} />

          {/* Redirect routes to Home with specific tabs */}
          <Route
            path="/deployments"
            element={<HomeWithTab tab="deployments" />}
          />
          <Route path="/tutorials" element={<HomeWithTab tab="tutorials" />} />
          <Route path="/jenkins" element={<HomeWithTab tab="jenkins" />} />

          {/* Individual deployment pages */}
          <Route path="/deployments/docker" element={<DockerDeployment />} />
          <Route
            path="/deployments/kubernetes"
            element={<KubernetesDeployment />}
          />
          <Route
            path="/deployments/kustomize"
            element={<KustomizeDeployment />}
          />
          <Route path="/deployments/helm" element={<HelmDeployment />} />

          {/* Individual tutorial pages */}
          <Route path="/tutorials/docker" element={<DockerTutorial />} />
          <Route
            path="/tutorials/kubernetes"
            element={<KubernetesTutorial />}
          />
          <Route path="/tutorials/kustomize" element={<KustomizeTutorial />} />
          <Route path="/tutorials/helm" element={<HelmTutorial />} />
          <Route path="/tutorials/jenkins" element={<JenkinsTutorial />} />

          {/* Other pages */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer__container">
          <p className="footer__content">
            © 2025{" "}
            <a
              href="https://cosmevalera.github.io/"
              target="_blank"
              rel="noopener noreferrer">
              Cosme Valera Reales
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
