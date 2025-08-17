import React from 'react'
import { Link } from 'react-router-dom'

const DockerTutorial: React.FC = () => {
  return (
    <div>
      <section className="card">
        <h2 style={{ fontSize: '26px', marginBottom: '8px' }}>Docker Fundamentals</h2>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>
          Docker packages your application and its dependencies into an image. A running instance of an image is a container.
        </p>
      </section>

      <section className="card" style={{ marginTop: '16px' }}>
        <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Images vs Containers</h3>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>
          An image is a read-only template built from a Dockerfile. A container is a lightweight, isolated runtime created from that image. You can create many containers from one image.
        </p>
      </section>

      <section className="card" style={{ marginTop: '16px' }}>
        <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Dockerfile Basics</h3>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>
          A Dockerfile describes how to build an image: base image, files to copy, commands to run and the process to start. Typical instructions: FROM, COPY, RUN, CMD, EXPOSE.
        </p>
      </section>

      <section className="card" style={{ marginTop: '16px' }}>
        <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Local Workflow</h3>
        <ul style={{ margin: 0, paddingLeft: '16px' }}>
          <li>Write a Dockerfile for your app.</li>
          <li>Build the image: docker build -t myapp .</li>
          <li>Run a container: docker run -p 8080:8080 myapp</li>
          <li>Share via a registry like Docker Hub or a private registry.</li>
        </ul>
      </section>
    </div>
  )
}

export default DockerTutorial


