import React from 'react'

const KubernetesTutorial: React.FC = () => {
  return (
    <div>
             <section className="card">
         <h2 style={{ fontSize: '26px', marginBottom: '8px' }}>Kubernetes Introduction</h2>
         <p className="common-p-small">
           Kubernetes runs containers at scale. Start with three core pieces: Pods, Deployments, and Services.
         </p>
       </section>

             <section className="card" style={{ marginTop: '16px' }}>
         <h3 className="common-h3-small">Core Components</h3>
         <ul className="common-ul">
           <li>
             <strong>Pod</strong>: the smallest deployable unit. Usually 1 container; sometimes multiple tightly-coupled containers.
           </li>
           <li>
             <strong>Deployment</strong>: manages a ReplicaSet to keep a desired number of identical Pods running; enables rolling updates and rollbacks.
           </li>
           <li>
             <strong>Service</strong>: stable virtual IP that routes traffic to Pods. Types: ClusterIP, NodePort, LoadBalancer.
           </li>
         </ul>
       </section>

             <section className="card" style={{ marginTop: '16px' }}>
         <h3 className="common-h3-small">Typical Workflow</h3>
         <ol className="common-ol">
           <li>Define a Deployment for your app (image, replicas, ports).</li>
           <li>Expose it with a Service to reach Pods reliably.</li>
           <li>Scale by changing replicas; update by changing the image tag.</li>
         </ol>
       </section>
    </div>
  )
}

export default KubernetesTutorial


