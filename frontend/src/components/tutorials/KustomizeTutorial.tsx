import React from 'react'

const KustomizeTutorial: React.FC = () => {
  return (
    <div>
             <section className="card">
         <h2 style={{ fontSize: '26px', marginBottom: '8px' }}>Kustomize Basics</h2>
         <p className="common-p-small">
           Kustomize lets you keep a single base manifest set and layer environment-specific changes with overlays.
         </p>
       </section>

             <section className="card" style={{ marginTop: '16px' }}>
         <h3 className="common-h3-small">Structure</h3>
         <ul className="common-ul">
           <li>
             <strong>Base</strong>: common manifests (Deployment, Service, ConfigMap) and a kustomization.yaml.
           </li>
           <li>
             <strong>Overlays</strong>: folders such as dev and prod that reference the base and apply patches, variable substitutions, and environment-specific settings.
           </li>
         </ul>
       </section>

             <section className="card" style={{ marginTop: '16px' }}>
         <h3 className="common-h3-small">Typical Workflow</h3>
         <ol className="common-ol">
           <li>Create the base with generic manifests.</li>
           <li>Create overlays with patches (e.g., replicas, resources, image tag).</li>
           <li>Render with kubectl kustomize and apply with kubectl apply -k.</li>
         </ol>
       </section>
    </div>
  )
}

export default KustomizeTutorial


