const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const compression = require('compression')
const rateLimit = require('express-rate-limit')
const axios = require('axios')
require('dotenv').config()

// Initialize Express app
const app = express()
const port = process.env.PORT || 3001

// Jenkins configuration
const JENKINS_HOST = process.env.JENKINS_HOST || 'http://localhost:8080'
const JENKINS_USER = process.env.JENKINS_USER || 'admin'
const JENKINS_TOKEN = process.env.JENKINS_TOKEN || ''

// Pipeline job names
const PIPELINE_JOBS = [
  'MasterPipeline',
  'DockerPipeline', 
  'KubernetesPipeline',
  'KustomizePipeline',
  'HelmPipeline'
]

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

// Helper function to get Jenkins API URL
const getJenkinsApiUrl = (jobName, endpoint = 'lastBuild/api/json') => {
  return `${JENKINS_HOST}/job/${jobName}/${endpoint}`
}

// Helper function to fetch pipeline status from Jenkins
const fetchPipelineStatus = async (jobName) => {
  try {
    // Create Basic Auth header if credentials are provided
    const authHeaders = {}
    if (JENKINS_USER && JENKINS_TOKEN) {
      // Try with API token first (username:token)
      const auth = Buffer.from(`${JENKINS_USER}:${JENKINS_TOKEN}`).toString('base64')
      authHeaders['Authorization'] = `Basic ${auth}`
    }
    
    const response = await axios.get(getJenkinsApiUrl(jobName), {
      timeout: 5000,
      headers: {
        'Accept': 'application/json',
        ...authHeaders
      }
    })
    
    const buildData = response.data
    
    // Determine status based on Jenkins build data
    let status = 'unknown'
    let statusText = 'Unknown'
    
    if (buildData.building) {
      status = 'running'
      statusText = 'Running'
    } else if (buildData.result === 'SUCCESS') {
      status = 'success'
      statusText = 'Success'
    } else if (buildData.result === 'FAILURE') {
      status = 'failure'
      statusText = 'Failed'
    } else if (buildData.result === 'ABORTED') {
      status = 'aborted'
      statusText = 'Aborted'
    } else if (buildData.result === 'UNSTABLE') {
      status = 'unstable'
      statusText = 'Unstable'
    } else if (buildData.result === null && !buildData.building) {
      status = 'pending'
      statusText = 'Pending'
    }
    
    return {
      name: jobName,
      status,
      statusText,
      building: buildData.building || false,
      result: buildData.result,
      timestamp: buildData.timestamp,
      duration: buildData.duration,
      url: buildData.url,
      consoleUrl: buildData.url ? `${buildData.url}console` : null,
      jobUrl: `${JENKINS_HOST}/job/${jobName}/`,
      lastBuildNumber: buildData.number,
      estimatedDuration: buildData.estimatedDuration,
      description: buildData.description || ''
    }
  } catch (error) {
    console.error(`Error fetching status for ${jobName}:`, error.message)
    
    // Provide more detailed error information for debugging
    let errorDescription = error.message
    let errorType = 'unknown'
    
    if (error.response) {
      const status = error.response.status
      errorDescription = `HTTP ${status}: ${error.response.statusText}`
      
      if (status === 403) {
        errorDescription = 'Authentication required. Please check JENKINS_USER and JENKINS_TOKEN environment variables.'
        errorType = 'auth_required'
      } else if (status === 401) {
        errorDescription = 'Invalid credentials. Please check your Jenkins username and token.'
        errorType = 'auth_invalid'
      } else if (status === 404) {
        errorDescription = 'Pipeline has never been executed. Run it for the first time in Jenkins.'
        errorType = 'not_found'
      } else if (status === 500) {
        errorDescription = 'Jenkins server error. Please check Jenkins logs.'
        errorType = 'server_error'
      }
    } else if (error.code === 'ECONNREFUSED') {
      errorDescription = 'Cannot connect to Jenkins. Please check if Jenkins is running on port 8080.'
      errorType = 'connection_failed'
    } else if (error.code === 'ENOTFOUND') {
      errorDescription = 'Jenkins host not found. Please check JENKINS_HOST configuration.'
      errorType = 'host_not_found'
    } else if (error.code === 'ETIMEDOUT') {
      errorDescription = 'Connection to Jenkins timed out. Please check if Jenkins is accessible.'
      errorType = 'timeout'
    }
    
    // Return error status
    return {
      name: jobName,
      status: 'error',
      statusText: 'Error',
      building: false,
      result: null,
      timestamp: null,
      duration: null,
      url: null,
      consoleUrl: null,
      jobUrl: `${JENKINS_HOST}/job/${jobName}/`,
      lastBuildNumber: null,
      estimatedDuration: null,
      description: errorDescription,
      error: true,
      errorType: errorType
    }
  }
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    service: 'devopslab-backend',
    jenkins: {
      host: JENKINS_HOST,
      connected: true
    }
  })
})

// Metrics endpoint
app.get('/metrics', (req, res) => {
  res.status(200).json({
    service: 'devopslab-backend',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    memory: process.memoryUsage(),
    uptime: process.uptime(),
    jenkins: {
      host: JENKINS_HOST,
      pipelines: PIPELINE_JOBS.length
    }
  })
})

// API Routes
app.get('/api', (req, res) => {
  res.json({
    message: 'DevOpsLab Backend API - Jenkins Pipeline Status Service',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/health',
      metrics: '/metrics',
      pipelines: {
        status: '/api/pipelines/status',
        statusById: '/api/pipelines/:jobName/status'
      }
    },
    jenkins: {
      host: JENKINS_HOST,
      pipelines: PIPELINE_JOBS
    }
  })
})

// Get status of all pipelines
app.get('/api/pipelines/status', async (req, res) => {
  try {
    console.log('Fetching status for all pipelines...')
    
    // Fetch status for all pipelines concurrently
    const pipelinePromises = PIPELINE_JOBS.map(jobName => fetchPipelineStatus(jobName))
    const pipelineStatuses = await Promise.all(pipelinePromises)
    
    const response = {
      success: true,
      timestamp: new Date().toISOString(),
      jenkinsHost: JENKINS_HOST,
      pipelines: pipelineStatuses,
      summary: {
        total: pipelineStatuses.length,
        running: pipelineStatuses.filter(p => p.status === 'running').length,
        success: pipelineStatuses.filter(p => p.status === 'success').length,
        failed: pipelineStatuses.filter(p => p.status === 'failure').length,
        pending: pipelineStatuses.filter(p => p.status === 'pending').length,
        error: pipelineStatuses.filter(p => p.status === 'error').length
      }
    }
    
    res.json(response)
  } catch (error) {
    console.error('Error fetching pipeline statuses:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch pipeline statuses',
      message: error.message,
      timestamp: new Date().toISOString()
    })
  }
})

// Get status of a specific pipeline
app.get('/api/pipelines/:jobName/status', async (req, res) => {
  try {
    const { jobName } = req.params
    
    if (!PIPELINE_JOBS.includes(jobName)) {
      return res.status(404).json({
        success: false,
        error: 'Pipeline not found',
        availablePipelines: PIPELINE_JOBS
      })
    }
    
    console.log(`Fetching status for pipeline: ${jobName}`)
    
    const pipelineStatus = await fetchPipelineStatus(jobName)
    
    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      jenkinsHost: JENKINS_HOST,
      pipeline: pipelineStatus
    })
  } catch (error) {
    console.error(`Error fetching status for ${req.params.jobName}:`, error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch pipeline status',
      message: error.message,
      timestamp: new Date().toISOString()
    })
  }
})

// Get Jenkins server info
app.get('/api/jenkins/info', async (req, res) => {
  try {
    // Create Basic Auth header if credentials are provided
    const authHeaders = {}
    if (JENKINS_USER && JENKINS_TOKEN) {
      const auth = Buffer.from(`${JENKINS_USER}:${JENKINS_TOKEN}`).toString('base64')
      authHeaders['Authorization'] = `Basic ${auth}`
    }
    
    const response = await axios.get(`${JENKINS_HOST}/api/json`, {
      timeout: 5000,
      headers: {
        'Accept': 'application/json',
        ...authHeaders
      }
    })
    
    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      jenkins: {
        host: JENKINS_HOST,
        version: response.data.version,
        jobs: response.data.jobs?.length || 0,
        mode: response.data.mode,
        nodeDescription: response.data.nodeDescription,
        nodeName: response.data.nodeName,
        numExecutors: response.data.numExecutors,
        description: response.data.description
      },
      authentication: {
        configured: !!(JENKINS_USER && JENKINS_TOKEN),
        user: JENKINS_USER || 'not set'
      }
    })
  } catch (error) {
    console.error('Error fetching Jenkins info:', error)
    
    let errorMessage = error.message
    if (error.response) {
      errorMessage = `HTTP ${error.response.status}: ${error.response.statusText}`
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to fetch Jenkins server info',
      message: errorMessage,
      timestamp: new Date().toISOString(),
      authentication: {
        configured: !!(JENKINS_USER && JENKINS_TOKEN),
        user: JENKINS_USER || 'not set'
      }
    })
  }
})

// Test Jenkins connection endpoint
app.get('/api/jenkins/test', async (req, res) => {
  try {
    // Test without authentication first
    let response
    let authStatus = 'none'
    
    try {
      response = await axios.get(`${JENKINS_HOST}/api/json`, {
        timeout: 5000,
        headers: {
          'Accept': 'application/json'
        }
      })
      authStatus = 'anonymous'
    } catch (error) {
      if (error.response && error.response.status === 403) {
        // Try with authentication
        if (JENKINS_USER && JENKINS_TOKEN) {
          const auth = Buffer.from(`${JENKINS_USER}:${JENKINS_TOKEN}`).toString('base64')
          response = await axios.get(`${JENKINS_HOST}/api/json`, {
            timeout: 5000,
            headers: {
              'Accept': 'application/json',
              'Authorization': `Basic ${auth}`
            }
          })
          authStatus = 'authenticated'
        } else {
          throw new Error('Authentication required but no credentials provided')
        }
      } else {
        throw error
      }
    }
    
    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      connection: {
        host: JENKINS_HOST,
        status: 'connected',
        authentication: authStatus,
        version: response.data.version,
        jobs: response.data.jobs?.length || 0
      },
      configuration: {
        jenkinsUser: JENKINS_USER || 'not set',
        jenkinsToken: JENKINS_TOKEN ? 'configured' : 'not set'
      }
    })
  } catch (error) {
    console.error('Error testing Jenkins connection:', error)
    
    let errorMessage = error.message
    if (error.response) {
      errorMessage = `HTTP ${error.response.status}: ${error.response.statusText}`
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to connect to Jenkins',
      message: errorMessage,
      timestamp: new Date().toISOString(),
      connection: {
        host: JENKINS_HOST,
        status: 'failed'
      },
      configuration: {
        jenkinsUser: JENKINS_USER || 'not set',
        jenkinsToken: JENKINS_TOKEN ? 'configured' : 'not set'
      }
    })
  }
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    availableEndpoints: {
      health: '/health',
      metrics: '/metrics',
      api: '/api',
      pipelines: '/api/pipelines/status',
      jenkinsInfo: '/api/jenkins/info',
      jenkinsTest: '/api/jenkins/test'
    }
  })
})

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err)
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err.message,
    timestamp: new Date().toISOString()
  })
})

// Start server
app.listen(port, () => {
  console.log(`🚀 DevOpsLab Backend API running on port ${port}`)
  console.log(`📊 Health check: http://localhost:${port}/health`)
  console.log(`📈 Metrics: http://localhost:${port}/metrics`)
  console.log(`🔗 API docs: http://localhost:${port}/api`)
  console.log(`🔧 Jenkins integration: ${JENKINS_HOST}`)
  console.log(`📋 Monitoring pipelines: ${PIPELINE_JOBS.join(', ')}`)
})

module.exports = app
