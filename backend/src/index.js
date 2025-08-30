const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const compression = require('compression')
const rateLimit = require('express-rate-limit')
require('dotenv').config()

// Initialize Express app
const app = express()
const port = process.env.PORT || 3001

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
})

// Middleware
app.use(helmet()) // Security headers
app.use(cors()) // Enable CORS
app.use(compression()) // Compress responses
app.use(morgan('combined')) // Logging
app.use(limiter) // Rate limiting
app.use(express.json()) // Parse JSON bodies
app.use(express.urlencoded({ extended: true })) // Parse URL-encoded bodies

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    service: 'devopslab-backend'
  })
})

// Metrics endpoint
app.get('/metrics', (req, res) => {
  res.status(200).json({
    service: 'devopslab-backend',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    memory: process.memoryUsage(),
    uptime: process.uptime()
  })
})

// API Routes
app.get('/api', (req, res) => {
  res.json({
    message: 'DevOpsLab Backend API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/health',
      metrics: '/metrics',
      api: '/api'
    }
  })
})

// Mock data endpoints for demonstration
app.get('/api/users', (req, res) => {
  res.json({
    success: true,
    data: [
      { id: 1, username: 'admin', email: 'admin@devopslab.com', created_at: new Date().toISOString() },
      { id: 2, username: 'user1', email: 'user1@devopslab.com', created_at: new Date().toISOString() }
    ],
    count: 2
  })
})

app.get('/api/projects', (req, res) => {
  res.json({
    success: true,
    data: [
      { id: 1, name: 'DevOpsLab Frontend', status: 'active', created_at: new Date().toISOString() },
      { id: 2, name: 'DevOpsLab Backend', status: 'active', created_at: new Date().toISOString() }
    ],
    count: 2
  })
})

app.get('/api/deployments', (req, res) => {
  res.json({
    success: true,
    data: [
      { 
        id: 1, 
        project_id: 1, 
        project_name: 'DevOpsLab Frontend',
        environment: 'production', 
        version: '1.0.0', 
        status: 'completed',
        created_at: new Date().toISOString() 
      },
      { 
        id: 2, 
        project_id: 2, 
        project_name: 'DevOpsLab Backend',
        environment: 'staging', 
        version: '1.0.0', 
        status: 'pending',
        created_at: new Date().toISOString() 
      }
    ],
    count: 2
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  })
})

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err)
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  })
})

// Start server
app.listen(port, () => {
  console.log(`🚀 DevOpsLab Backend API running on port ${port}`)
  console.log(`📊 Health check: http://localhost:${port}/health`)
  console.log(`📈 Metrics: http://localhost:${port}/metrics`)
  console.log(`🔗 API docs: http://localhost:${port}/api`)
})

module.exports = app
