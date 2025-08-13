import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import { Pool } from 'pg'

// Load environment variables
dotenv.config()

// Initialize Express app
const app = express()
const port = process.env['PORT'] || 3001

// Database connection
const pool = new Pool({
  connectionString: process.env['DATABASE_URL'] || 'postgresql://postgres:password@localhost:5432/devopslab'
})

// Test database connection
pool.query('SELECT NOW()', (err, _res) => {
  if (err) {
    console.error('Database connection failed:', err)
  } else {
    console.log('Database connected successfully')
  }
})

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
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env['NODE_ENV'] || 'development'
  })
})

// Metrics endpoint
app.get('/metrics', (_req, res) => {
  res.status(200).json({
    service: 'devopslab-backend',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    memory: process.memoryUsage(),
    uptime: process.uptime()
  })
})

// API Routes
app.get('/api', (_req, res) => {
  res.json({
    message: 'DevOpsLab Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      metrics: '/metrics',
      users: '/api/users',
      projects: '/api/projects',
      deployments: '/api/deployments',
      metrics_data: '/api/metrics'
    }
  })
})

// Users endpoint
app.get('/api/users', async (_req, res) => {
  try {
    const result = await pool.query('SELECT id, username, email, created_at FROM users ORDER BY created_at DESC')
    res.json({
      success: true,
      data: result.rows,
      count: result.rowCount
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    })
  }
})

// Projects endpoint
app.get('/api/projects', async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects ORDER BY created_at DESC')
    res.json({
      success: true,
      data: result.rows,
      count: result.rowCount
    })
  } catch (error) {
    console.error('Error fetching projects:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    })
  }
})

// Deployments endpoint
app.get('/api/deployments', async (_req, res) => {
  try {
    const result = await pool.query(`
      SELECT d.*, p.name as project_name 
      FROM deployments d 
      JOIN projects p ON d.project_id = p.id 
      ORDER BY d.created_at DESC
    `)
    res.json({
      success: true,
      data: result.rows,
      count: result.rowCount
    })
  } catch (error) {
    console.error('Error fetching deployments:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    })
  }
})

// Metrics data endpoint
app.get('/api/metrics', async (_req, res) => {
  try {
    const result = await pool.query(`
      SELECT service_name, metric_name, metric_value, timestamp 
      FROM metrics 
      ORDER BY timestamp DESC 
      LIMIT 50
    `)
    res.json({
      success: true,
      data: result.rows,
      count: result.rowCount
    })
  } catch (error) {
    console.error('Error fetching metrics:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    })
  }
})

// Add new deployment
app.post('/api/deployments', async (req, res): Promise<void> => {
  try {
    const { project_id, environment, version } = req.body
    
    if (!project_id || !environment || !version) {
      res.status(400).json({
        success: false,
        error: 'Missing required fields: project_id, environment, version'
      })
      return
    }

    const result = await pool.query(
      'INSERT INTO deployments (project_id, environment, version, status) VALUES ($1, $2, $3, $4) RETURNING *',
      [project_id, environment, version, 'pending']
    )

    res.status(201).json({
      success: true,
      data: result.rows[0]
    })
  } catch (error) {
    console.error('Error creating deployment:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    })
  }
})

// Update deployment status
app.patch('/api/deployments/:id', async (req, res): Promise<void> => {
  try {
    const { id } = req.params
    const { status } = req.body

    if (!status) {
      res.status(400).json({
        success: false,
        error: 'Missing required field: status'
      })
      return
    }

    const result = await pool.query(
      'UPDATE deployments SET status = $1, deployed_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [status, id]
    )

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        error: 'Deployment not found'
      })
      return
    }

    res.json({
      success: true,
      data: result.rows[0]
    })
  } catch (error) {
    console.error('Error updating deployment:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    })
  }
})

// 404 handler
app.use('*', (_req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  })
})

// Error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
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

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully')
  pool.end()
  process.exit(0)
})

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully')
  pool.end()
  process.exit(0)
})

export default app
