import React from 'react'

const DockerTutorial: React.FC = () => {
  return (
    <div>
             <section className="card">
         <h2 style={{ fontSize: '26px', marginBottom: '8px' }}>Docker Fundamentals</h2>
         <p className="common-p-small">
           Docker packages your application and its dependencies into an image. A running instance of an image is a container.
         </p>
       </section>

             <section className="card" style={{ marginTop: '16px' }}>
         <h3 className="common-h3-small">Images vs Containers</h3>
         <p className="common-p-small">
           An image is a read-only template built from a Dockerfile. A container is a lightweight, isolated runtime created from that image. You can create many containers from one image.
         </p>
       </section>

             <section className="card" style={{ marginTop: '16px' }}>
         <h3 className="common-h3-small">Dockerfile Basics</h3>
         <p className="common-p-small">
           A Dockerfile describes how to build an image: base image, files to copy, commands to run and the process to start. Typical instructions: FROM, COPY, RUN, CMD, EXPOSE.
         </p>
       </section>

             <section className="card" style={{ marginTop: '16px' }}>
         <h3 className="common-h3-small">Local Workflow</h3>
         <ul className="common-ul">
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


