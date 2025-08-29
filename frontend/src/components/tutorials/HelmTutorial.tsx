import React from "react";

const HelmTutorial: React.FC = () => {
  return (
    <div>
      <section className="card">
        <h2 style={{ fontSize: "26px", marginBottom: "8px" }}>
          Helm Introduction
        </h2>
        <p className="common-p-small">
          Helm is a package manager for Kubernetes. Charts define templates and
          default values so you can install, upgrade and rollback releases
          consistently.
        </p>
      </section>

      <section className="card" style={{ marginTop: "16px" }}>
        <h3 className="common-h3-small">Key Concepts</h3>
        <ul className="common-ul">
          <li>
            <strong>Chart</strong>: a package containing templates and a
            Chart.yaml.
          </li>
          <li>
            <strong>Values</strong>: configuration for templates; you can
            override them per environment.
          </li>
          <li>
            <strong>Release</strong>: a running instance of a Chart in a
            cluster; supports upgrade and rollback.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default HelmTutorial;
