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
  windowMs: 1 * 60 * 1000, // 1 minute window
  max: 300, // limit each IP to 300 requests per minute (5 per second)
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

// Helper function to get Jenkins Workflow API URL
const getJenkinsWorkflowApiUrl = (jobName, endpoint = 'wfapi/runs') => {
  return `${JENKINS_HOST}/job/${jobName}/${endpoint}`
}

// Helper function to fetch pipeline stages from Jenkins Workflow API
const fetchPipelineStages = async (jobName) => {
  try {
    // Create Basic Auth header if credentials are provided
    const authHeaders = {}
    if (JENKINS_USER && JENKINS_TOKEN) {
      const auth = Buffer.from(`${JENKINS_USER}:${JENKINS_TOKEN}`).toString('base64')
      authHeaders['Authorization'] = `Basic ${auth}`
    }
    
    const response = await axios.get(getJenkinsWorkflowApiUrl(jobName), {
      timeout: 5000,
      headers: {
        'Accept': 'application/json',
        ...authHeaders
      }
    })
    
    const runs = response.data
    
    // Get the latest run (first in the array) and previous successful run for timing estimates
    if (runs && runs.length > 0) {
      const latestRun = runs[0]
      
      // Find the last successful run for timing estimates
      let lastSuccessfulRun = null
      for (let i = 1; i < runs.length; i++) {
        if (runs[i].status === 'SUCCESS') {
          lastSuccessfulRun = runs[i]
          break
        }
      }
      
      // Map stage statuses to our internal format
      const mapStageStatus = (jenkinsStatus) => {
        switch (jenkinsStatus) {
          case 'SUCCESS':
            return 'success'
          case 'FAILED':
            return 'failure'
          case 'IN_PROGRESS':
            return 'running'
          case 'PAUSED_PENDING_INPUT':
            return 'paused'
          case 'NOT_EXECUTED':
            return 'pending'
          default:
            return 'unknown'
        }
      }
      
      // Process stages and find current stage
      const stages = latestRun.stages ? latestRun.stages.map(stage => ({
        id: stage.id,
        name: stage.name,
        status: mapStageStatus(stage.status),
        startTimeMillis: stage.startTimeMillis,
        durationMillis: stage.durationMillis,
        isCurrent: stage.status === 'IN_PROGRESS'
      })) : []
      
      // Find the current stage (the one that's IN_PROGRESS or the last one if none are running)
      let currentStageIndex = -1
      if (stages.length > 0) {
        const runningStage = stages.findIndex(stage => stage.status === 'running')
        if (runningStage !== -1) {
          currentStageIndex = runningStage
        } else {
          // If no stage is running, highlight the last completed stage
          currentStageIndex = stages.length - 1
        }
      }
      
      return {
        stages,
        currentStageIndex,
        runId: latestRun.id,
        runName: latestRun.name,
        runStatus: latestRun.status,
        startTimeMillis: latestRun.startTimeMillis,
        endTimeMillis: latestRun.endTimeMillis,
        durationMillis: latestRun.durationMillis,
        // Add timing estimates from previous successful run
        lastSuccessfulRun: lastSuccessfulRun ? {
          durationMillis: lastSuccessfulRun.durationMillis,
          stages: lastSuccessfulRun.stages ? lastSuccessfulRun.stages.map(stage => ({
            name: stage.name,
            durationMillis: stage.durationMillis
          })) : []
        } : null
      }
    }
    
    return null
  } catch (error) {
    console.error(`Error fetching stages for ${jobName}:`, error.message)
    return null
  }
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
    
    // Fetch stage information if pipeline is running
    let stageInfo = null
    if (buildData.building || status === 'running') {
      stageInfo = await fetchPipelineStages(jobName)
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
      description: buildData.description || '',
      stages: stageInfo
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
        // Pipeline has never been executed - this is not an error, just a neutral state
        return {
          name: jobName,
          status: 'never_built',
          statusText: 'Never Built',
          building: false,
          result: null,
          timestamp: null,
          duration: null,
          url: null,
          consoleUrl: null,
          jobUrl: `${JENKINS_HOST}/job/${jobName}/`,
          lastBuildNumber: null,
          estimatedDuration: null,
          description: 'Pipeline has never been executed. Run it for the first time in Jenkins.',
          error: false,
          errorType: null,
          stages: null
        }
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
      errorType: errorType,
      stages: null
    }
  }
}

// Get status of all pipelines -> This will be a AWS lambda function called  getPipelineStatus
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
        error: pipelineStatuses.filter(p => p.status === 'error').length,
        neverBuilt: pipelineStatuses.filter(p => p.status === 'never_built').length
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

// Health check endpoint for Kubernetes probes
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: process.version
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    availableEndpoints: {
      pipelines: '/api/pipelines/status'
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
  console.log(`🔧 Jenkins integration: ${JENKINS_HOST}`)
  console.log(`📋 Monitoring pipelines: ${PIPELINE_JOBS.join(', ')}`)
})

module.exports = app
