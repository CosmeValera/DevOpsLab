import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

describe('App', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    
    expect(screen.getByText(/DevOpsLab/i)).toBeInTheDocument()
  })

  it('displays the main navigation', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    
    expect(screen.getByText(/Overview/i)).toBeInTheDocument()
    expect(screen.getByText(/Docker/i)).toBeInTheDocument()
    expect(screen.getByText(/Kubernetes/i)).toBeInTheDocument()
  })
})
