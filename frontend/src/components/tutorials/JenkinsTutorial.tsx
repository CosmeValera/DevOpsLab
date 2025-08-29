import React from "react";
import { Link } from "react-router-dom";

const JenkinsTutorial: React.FC = () => {
  return (
    <div>
      <section className="card">
        <h2 style={{ fontSize: "26px", marginBottom: "8px" }}>
          Jenkins CI/CD Tutorial
        </h2>
        <p className="common-p-small">
          Learn how to set up automated pipelines for continuous integration and
          deployment.
        </p>
        <Link to="/tutorials" className="btn btn-secondary">
          Go back
        </Link>
      </section>

      <section className="card" style={{ marginTop: "16px" }}>
        <h3 className="common-h3-small">What is Jenkins?</h3>
        <p className="common-p-small">
          Jenkins is an open-source automation server that enables developers to
          build, test, and deploy applications automatically. It supports
          continuous integration (CI) and continuous deployment (CD) through
          pipelines.
        </p>
      </section>

      <section className="card" style={{ marginTop: "16px" }}>
        <h3 className="common-h3-small">Key Concepts</h3>
        <ul className="common-ul">
          <li>
            <strong>Pipeline</strong>: A suite of plugins that supports
            implementing CI/CD pipelines as code.
          </li>
          <li>
            <strong>Job</strong>: A runnable task that Jenkins can execute
            (build, test, deploy).
          </li>
          <li>
            <strong>Build</strong>: A single execution of a job with specific
            parameters.
          </li>
          <li>
            <strong>Agent/Node</strong>: A machine that executes Jenkins jobs.
          </li>
          <li>
            <strong>Jenkinsfile</strong>: A text file containing the definition
            of a Jenkins pipeline.
          </li>
        </ul>
      </section>

      <section className="card" style={{ marginTop: "16px" }}>
        <h3 className="common-h3-small">Pipeline Stages</h3>
        <p className="common-p-small-mb12">
          A typical CI/CD pipeline includes these stages:
        </p>
        <ol className="common-ol">
          <li>
            <strong>Checkout</strong>: Pull source code from version control
            (Git)
          </li>
          <li>
            <strong>Build</strong>: Compile code and create artifacts (Docker
            images, JAR files)
          </li>
          <li>
            <strong>Test</strong>: Run automated tests (unit, integration,
            end-to-end)
          </li>
          <li>
            <strong>Deploy</strong>: Deploy to target environments (staging,
            production)
          </li>
          <li>
            <strong>Monitor</strong>: Track application health and performance
          </li>
        </ol>
      </section>

      <section className="card" style={{ marginTop: "16px" }}>
        <h3 className="common-h3-small">Benefits</h3>
        <ul className="common-ul">
          <li>Automated testing catches bugs early</li>
          <li>Faster feedback loop for developers</li>
          <li>Consistent and repeatable deployments</li>
          <li>Reduced manual errors</li>
          <li>Faster time to market</li>
        </ul>
      </section>
    </div>
  );
};

export default JenkinsTutorial;
