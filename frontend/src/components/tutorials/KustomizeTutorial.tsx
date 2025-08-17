import React from 'react'

const KustomizeTutorial: React.FC = () => {
  return (
    <div>
      <section className="card">
        <h2 style={{ fontSize: '26px', marginBottom: '8px' }}>Kustomize Basics</h2>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>
          Kustomize lets you keep a single base manifest set and layer environment-specific changes with overlays.
        </p>
      </section>

      <section className="card" style={{ marginTop: '16px' }}>
        <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Structure</h3>
        <ul style={{ margin: 0, paddingLeft: '16px' }}>
          <li>
            <strong>Base</strong>: common manifests (Deployment, Service, ConfigMap) and a kustomization.yaml.
          </li>
          <li>
            <strong>Overlays</strong>: folders such as dev and prod that reference the base and apply patches, variable substitutions, and environment-specific settings.
          </li>
        </ul>
      </section>

      <section className="card" style={{ marginTop: '16px' }}>
        <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Typical Workflow</h3>
        <ol style={{ paddingLeft: '16px' }}>
          <li>Create the base with generic manifests.</li>
          <li>Create overlays with patches (e.g., replicas, resources, image tag).</li>
          <li>Render with kubectl kustomize and apply with kubectl apply -k.</li>
        </ol>
      </section>
    </div>
  )
}

export default KustomizeTutorial


