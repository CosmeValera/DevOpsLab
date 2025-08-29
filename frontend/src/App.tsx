import { useEffect, useMemo, useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import DockerDeployment from "./components/deployments/DockerDeployment";
import DockerComposeDeployment from "./components/deployments/DockerComposeDeployment";
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
          <div className="header__actions">
            {/* Theme Switcher Button */}
            <button
              className="theme-toggle"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              aria-label="Switch theme">
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} style={{color: "white"}}/>}
            </button>
          </div>
        </div>
      </header>

      {/* Main Navigation */}
      {navItems.length > 0 && (
        <nav className="deployment-nav">
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
          <Route path="/deployments/docker-compose" element={<DockerComposeDeployment />} />
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
